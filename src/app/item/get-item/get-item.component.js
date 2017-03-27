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
var item_service_1 = require("../service/item.service");
var component_event_service_1 = require("../../component-events/component-event.service");
var ItemDetailComponent = (function () {
    function ItemDetailComponent(itemService, componentEventService) {
        this.itemService = itemService;
        this.componentEventService = componentEventService;
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentEventService.interestCreated$.subscribe(function (result) {
            _this.interestCreated = result;
        });
    };
    ItemDetailComponent.prototype.ngOnChanges = function () {
        this.getItem(this.itemId);
    };
    ItemDetailComponent.prototype.ngOnDestroy = function () {
        console.log('on destroy called');
    };
    ItemDetailComponent.prototype.cleanup = function () {
        this.itemDetail = null;
    };
    ItemDetailComponent.prototype.getItem = function (itemId) {
        var _this = this;
        this.itemService
            .getItem(itemId)
            .subscribe(function (result) { return _this.getItemSuccess(result); }, function (error) { return console.log(error); });
    };
    ItemDetailComponent.prototype.getItemSuccess = function (result) {
        this.itemDetail = result;
    };
    ItemDetailComponent.prototype.passUserId = function (userId) {
        this.userId = userId;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ItemDetailComponent.prototype, "itemId", void 0);
    ItemDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-get-item',
            templateUrl: 'get-item.component.html',
            styleUrls: ['get-item.component.css']
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService, component_event_service_1.ComponentEventService])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=get-item.component.js.map