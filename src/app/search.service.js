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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
// Import RxJs required methods
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Accept': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.searchUrl = "http://localhost:8080/SwapServerSide/search/item";
        this.autocompleteUrl = "http://localhost:8080/SwapServerSide/search/autocomplete/";
    }
    SearchService.prototype.search = function (queryString) {
        console.log(this.searchUrl);
        console.log(JSON.stringify({ query: queryString }));
        var body = JSON.stringify({ query: queryString });
        return this.http
            .post(this.searchUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SearchService.prototype.autoComplete = function (term) {
        console.log(this.searchUrl);
        console.log(JSON.stringify({ query: term }));
        var body = JSON.stringify({ query: term });
        return this.http
            .get(this.autocompleteUrl + term, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SearchService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    SearchService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    SearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map