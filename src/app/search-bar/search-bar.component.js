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
var search_service_1 = require("../services/search.service");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var search_bar_1 = require("../models/search-bar");
var router_1 = require("@angular/router");
var SearchBarComponent = (function () {
    function SearchBarComponent(router, searchService) {
        this.router = router;
        this.searchService = searchService;
        this.searchQueries = new Subject_1.Subject();
    }
    SearchBarComponent.prototype.autocomplete = function (term) {
        this.searchQueries.next(term);
    };
    SearchBarComponent.prototype.ngOnInit = function () {
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
        var postalCode = "";
        if (localStorage.getItem("postal_code") != null) {
            postalCode = localStorage.getItem("postal_code");
        }
        this.searchBarModel = new search_bar_1.SearchBar();
        this.searchBarModel.search = "";
        this.searchBarModel.zip = postalCode;
    };
    SearchBarComponent.prototype.search = function (searchBarModel) {
        localStorage.setItem("postal_code", searchBarModel.zip);
        this.router.navigate(['/search', searchBarModel.search, searchBarModel.zip]);
    };
    SearchBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-search-bar',
            templateUrl: "search-bar.component.html",
            styleUrls: ['search-bar.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, search_service_1.SearchService])
    ], SearchBarComponent);
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
//# sourceMappingURL=search-bar.component.js.map