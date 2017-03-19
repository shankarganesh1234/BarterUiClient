"use strict";
var GlobalUrls = (function () {
    function GlobalUrls() {
        this.serverName = "customServer";
        this.searchUrl = "http://localhost:8080/" + this.serverName + "/search/item";
        this.autocompleteUrl = "http://localhost:8080/" + this.serverName + "/search/autocomplete/";
        this.googleZipUrl = "http://maps.googleapis.com/maps/api/geocode/json?";
        this.createItemUrl = "http://localhost:8080/customServer/listing";
        this.createItemImageUrl = "http://localhost:8080/customServer/image/upload";
    }
    return GlobalUrls;
}());
exports.GlobalUrls = GlobalUrls;
//# sourceMappingURL=url-values.js.map