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

    //owl carousel 5 Columns
    $(".owl-carousel.column-5").owlCarousel({
        nav: true, // Show next and prev buttons
        navText: false,
        dots: false,
        items: 5,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    //owl carousel 4 Columns
    $(".owl-carousel.column-4").owlCarousel({
        nav: true, // Show next and prev buttons
        navText: false,
        dots: false,
        items: 4,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    //owl carousel 3 Columns
    $(".owl-carousel.column-3").owlCarousel({
        nav: true, // Show next and prev buttons
        navText: false,
        dots: false,
        items: 3,
        margin: 15,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    //owl slider
    $('.slider').owlCarousel({
        animateOut: 'zoomOut',
        nav: true, // Show next and prev buttons
        navText: false,
        dots: true,
        items: 1,
        margin: 0,
        smartSpeed: 450
    });

    //owl product-showcase
    $('.product-showcase').owlCarousel({
        animateOut: 'lightSpeedOut',
        nav: true, // Show next and prev buttons
        navText: false,
        dots: true,
        items: 1,
        margin: 0,
        smartSpeed: 450
    });

    //owl next prev icons
    $(".owl-carousel .owl-next").addClass("fa fa-angle-right");
    $(".owl-carousel .owl-prev").addClass("fa fa-angle-left");

    //CountDown
    $('.countdown').downCount({
        date: '10/21/2017 12:00:00',
        offset: +1
    }, function () {
        //alert('WOOT WOOT, done!');
    });

    //CountDown
    $('.countdown-product').downCount({
        date: '10/21/2017 12:00:00',
        offset: +1
    }, function () {
        //alert('WOOT WOOT, done!');
    });

    // Range Slider
    var rangeSlider = document.querySelector('.ui-range-slider');
    if (typeof rangeSlider !== 'undefined' && rangeSlider !== null) {
        var dataStartMin = parseInt(rangeSlider.parentNode.getAttribute('data-start-min'), 10),
            dataStartMax = parseInt(rangeSlider.parentNode.getAttribute('data-start-max'), 10),
            dataMin = parseInt(rangeSlider.parentNode.getAttribute('data-min'), 10),
            dataMax = parseInt(rangeSlider.parentNode.getAttribute('data-max'), 10),
            dataStep = parseInt(rangeSlider.parentNode.getAttribute('data-step'), 10);
        var valueMin = document.querySelector('.ui-range-value-min span'),
            valueMax = document.querySelector('.ui-range-value-max span'),
            valueMinInput = document.querySelector('.ui-range-value-min input'),
            valueMaxInput = document.querySelector('.ui-range-value-max input');
        noUiSlider.create(rangeSlider, {
            start: [dataStartMin, dataStartMax],
            connect: true,
            step: dataStep,
            range: {
                'min': dataMin,
                'max': dataMax
            }
        });
        rangeSlider.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (handle) {
                valueMax.innerHTML = Math.round(value);
                valueMaxInput.value = Math.round(value);
            } else {
                valueMin.innerHTML = Math.round(value);
                valueMinInput.value = Math.round(value);
            }
        });
    }

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
