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
require('../js/jquery-3.1.1.min.js');
require('../js/bootstrap.min.js');
require('../js/owl.carousel.min.js');
require('../js/jquery.downCount.js');
require('../js/jquery.sticky.js');
require('../js/pace.min.js');
require('../js/star-rating.min.js');
require('../js/wow.min.js');
require('../js/swiper.min.js');
// Observable class extensions
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var SearchComponent = (function () {
    function SearchComponent(searchService, router) {
        this.searchService = searchService;
        this.router = router;
        this.searchQueries = new Subject_1.Subject();
    }
    SearchComponent.prototype.autocomplete = function (term) {
        this.searchQueries.next(term);
    };
    SearchComponent.prototype.ngOnInit = function () {
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
    SearchComponent.prototype.search = function (searchVal) {
        var _this = this;
        this.searchService
            .search(searchVal)
            .subscribe(function (result) { return _this.success(result); }, function (error) { return console.log(error); });
    };
    SearchComponent.prototype.success = function (result) {
        console.log(result);
        this.searchResponse = result;
        // var link = ['/itemlist'];
        // this.router.navigate(link);
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-search',
            templateUrl: "./search.component.html",
            styleUrls: ['./search.component.css']
        }), 
        __metadata('design:paramtypes', [search_service_1.SearchService, router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
require('../js/main.js');
//# sourceMappingURL=search.component.js.map