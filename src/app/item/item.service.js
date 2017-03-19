"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var url_values_1 = require("../urls/url-values");
// Import RxJs required methods
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.urls = new url_values_1.GlobalUrls();
    }
    ItemService.prototype.createItem = function (itemRequest) {
        console.log(JSON.stringify(itemRequest));
        var body = JSON.stringify(itemRequest);
        return this.http.post(this.urls.createItemUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ItemService.prototype.createImageForItem = function (itemImageFormData) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'multipart/form-data');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.urls.createItemImageUrl, itemImageFormData, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ItemService.prototype.getItem = function (itemId) {
        console.log(JSON.stringify(itemId));
        return this.http.get(this.urls.createItemUrl + itemId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ItemService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("create item success");
        return body || {};
    };
    ItemService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    ItemService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map