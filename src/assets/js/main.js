$(document).ready(function () {

    //sticky nav
    $(".navbar").sticky({topSpacing: 0});

    // yamm menu
    $(document).on('click', '.yamm .dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open');
    });

    //tootltip
    $('[data-toggle="tooltip"]').tooltip();

    //Popover
    $('[data-toggle="popover"]').popover();

    //back to top
    $('body').append('<a href="javascript:void(0);" id="back-to-top"><i class="fa fa-angle-up"></i></a>');

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) {
            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }
    });
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

    getPostalCode();
    //wow for animate.css
    new WOW().init();

});

/**
 *
 */
function getPostalCode() {
    var postal_code = getFromLocalStorage("postal_code");
    if(postal_code !== null) {
        console.log("postal code from local storage.");
    } else {
        getPostalCodeFromGoogle();
    }
    return postal_code;
}

/**
 *
 */
function getPostalCodeFromGoogle() {
    console.log("calling gmaps api");
    // zip code logic begin
    window.navigator.geolocation.getCurrentPosition(function(pos){
        var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false";
        $.ajax({
            url : url,
            type : "get",
            async: false,
            success : function(data) {
                var results = data.results[0].address_components;
                for(var i=0; i<results.length; i++) {
                    var type = results[i].types[0];
                    if(type === 'postal_code') {
                        var postal_code = results[i].long_name;
                        saveInLocalStorage("postal_code", postal_code);
                        break;
                    }
                }
            },
            error: function() {
                console.log("error calling gmaps");
            }
        });
    });
}

/**
 * Save the key value pair in local storage
 * @param key
 * @param value
 */
function saveInLocalStorage(key, value) {

    if(isLocalStorageSupported) {
        if(key !== null && value !== null) {
            localStorage.setItem(key, value);
        }
    }
}

/**
 * Check if local storage is supported
 * @returns {boolean}
 */
function isLocalStorageSupported() {
    if (typeof(Storage) === "undefined")
        return false;
    else
        return true;
}

/**
 * Get an item from local storage
 */
function getFromLocalStorage(key) {

    var item = null;
    if(isLocalStorageSupported) {
        if(key !== null) {
            item = localStorage.getItem(key);
        }
    }
    return item;
}
