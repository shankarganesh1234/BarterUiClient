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
var search_service_1 = require('./search.service');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
// Observable class extensions
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var HeaderComponent = (function () {
    function HeaderComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.searchQueries = new Subject_1.Subject();
    }
    HeaderComponent.prototype.autocomplete = function (term) {
        this.searchQueries.next(term);
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.observableTitles = this.searchQueries
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.searchService.autoComplete(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    HeaderComponent.prototype.search = function (searchVal) {
        var _this = this;
        this.searchService
            .search(searchVal)
            .subscribe(function (result) { return _this.success(result); }, function (error) { return console.log(error); });
    };
    HeaderComponent.prototype.success = function (result) {
        console.log(result);
        this.searchResponse = result;
        // var link = ['/itemlist'];
        // this.router.navigate(link);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-header',
            templateUrl: "./header.component.html",
            styleUrls: ['./header.component.css']
        }), 
        __metadata('design:paramtypes', [search_service_1.SearchService, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map