"use strict";
var GlobalUrls = (function () {
    function GlobalUrls() {
        this.serverName = "customServer";
        this.searchUrl = "http://localhost:8080/" + this.serverName + "/search/item";
        this.autocompleteUrl = "http://localhost:8080/" + this.serverName + "/search/autocomplete/";
    }
    return GlobalUrls;
}());
exports.GlobalUrls = GlobalUrls;
//# sourceMappingURL=url-values.js.map