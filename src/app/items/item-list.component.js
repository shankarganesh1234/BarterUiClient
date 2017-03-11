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
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var search_response_1 = require('../search/search-response');
var ItemListComponent = (function () {
    function ItemListComponent(router) {
        this.router = router;
    }
    ;
    ItemListComponent.prototype.ngOnInit = function () {
        console.log("inside item list component");
    };
    ItemListComponent.prototype.ngOnChanges = function (changes) {
        console.log("on changes invoked");
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', search_response_1.SearchResponse)
    ], ItemListComponent.prototype, "searchResponse", void 0);
    ItemListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-item-list',
            templateUrl: 'item-list.component.html',
            styleUrls: ['item-list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=item-list.component.js.map