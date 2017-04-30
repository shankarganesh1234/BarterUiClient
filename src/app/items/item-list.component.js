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
var search_bar_1 = require("../models/search-bar");
var search_service_1 = require("../services/search.service");
var component_event_service_1 = require("../services/component-event.service");
var router_1 = require("@angular/router");
var ItemListComponent = (function () {
    function ItemListComponent(route, router, searchService, componentEventService) {
        this.route = route;
        this.router = router;
        this.searchService = searchService;
        this.componentEventService = componentEventService;
    }
    ItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var searchQuery = this.route.snapshot.params['search'];
        var zip = this.route.snapshot.params['zip'];
        this.searchRequest = new search_bar_1.SearchBar();
        this.searchRequest.zip = zip;
        this.searchRequest.search = searchQuery;
        this.searchService
            .search(this.searchRequest)
            .subscribe(function (result) { return _this.searchResponse = result; }, function (error) { return console.log(error); });
    };
    ItemListComponent.prototype.ngOnChanges = function (changes) {
    };
    ItemListComponent.prototype.paginatedResults = function (page, limit, query, zip) {
        var _this = this;
        this.searchRequest = new search_bar_1.SearchBar();
        this.searchRequest.zip = zip;
        this.searchRequest.search = query;
        this.searchRequest.limit = limit;
        this.searchRequest.page = page;
        if (page === 1) {
            this.searchRequest.start = 0;
        }
        else {
            this.searchRequest.start = ((page - 1) * limit) + 1;
        }
        this.searchService
            .search(this.searchRequest)
            .subscribe(function (result) { return _this.success(result); }, function (error) { return console.log(error); });
    };
    ItemListComponent.prototype.success = function (result) {
        this.searchResponse = result;
    };
    ItemListComponent.prototype.routeToItemDetail = function (itemId) {
        this.router.navigate(['/item', itemId]);
    };
    ItemListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-item-list',
            templateUrl: 'item-list.component.html',
            styleUrls: ['item-list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, search_service_1.SearchService, component_event_service_1.ComponentEventService])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=item-list.component.js.map