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
var item_service_1 = require("../../item/service/item.service");
var interest_service_1 = require("../service/interest.service");
var create_interest_model_1 = require("../models/create-interest.model");
var component_event_service_1 = require("../../component-events/component-event.service");
var InterestOptionsComponent = (function () {
    function InterestOptionsComponent(itemService, interestService, componentEventService) {
        this.itemService = itemService;
        this.interestService = interestService;
        this.componentEventService = componentEventService;
        this.interestedUserId = 2;
        this.selectedItems = [];
        this.selectedItemTitles = [];
    }
    InterestOptionsComponent.prototype.ngOnInit = function () {
        this.invokeGetItemsByUser();
    };
    InterestOptionsComponent.prototype.ngOnChanges = function () {
        this.invokeGetItemsByUser();
    };
    InterestOptionsComponent.prototype.invokeGetItemsByUser = function () {
        var _this = this;
        if (this.userId === null)
            return;
        this.itemService
            .getItemsByUser(this.interestedUserId)
            .subscribe(function (result) { return _this.getItemsByUserSuccess(result); }, function (error) { return console.log(error); });
    };
    InterestOptionsComponent.prototype.getItemsByUserSuccess = function (result) {
        this.itemDetails = result;
    };
    InterestOptionsComponent.prototype.checkedItems = function (e, itemId, title) {
        if (e.target.checked) {
            if (this.selectedItems.length < 3) {
                console.log('added ' + itemId);
                this.selectedItems.push(itemId);
                this.selectedItemTitles.push(title);
            }
            else {
                e.target.setChecked(false);
                console.log("limit reached");
            }
        }
        else if (!e.target.checked && this.selectedItems.indexOf(itemId) != -1) {
            console.log('removed ' + itemId);
            this.selectedItems.splice(this.selectedItems.indexOf(itemId), 1);
            this.selectedItemTitles.splice(this.selectedItemTitles.indexOf(title), 1);
        }
        console.log('array = ' + this.selectedItems);
    };
    InterestOptionsComponent.prototype.checkboxState = function (itemId) {
        if (this.selectedItems.length >= 3 && this.selectedItems.indexOf(itemId) == -1) {
            return true;
        }
        else {
            return false;
        }
    };
    InterestOptionsComponent.prototype.createInterest = function () {
        var _this = this;
        this.createInterestRequest = new create_interest_model_1.CreateInterest();
        this.createInterestRequest.originalUser = this.userId;
        this.createInterestRequest.interestedUser = this.interestedUserId;
        this.createInterestRequest.oneSidedInterestFlag = true;
        this.createInterestRequest.swappableItemIds = this.selectedItems;
        this.createInterestRequest.originalItem = this.originalItemId;
        this.interestService
            .createInterest(this.createInterestRequest)
            .subscribe(function (result) { return _this.interestSuccess(result); }, function (error) { return console.log(error); });
    };
    InterestOptionsComponent.prototype.interestSuccess = function (result) {
        console.log("interest creation: " + result);
        this.componentEventService.interestCreated(result);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InterestOptionsComponent.prototype, "userId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InterestOptionsComponent.prototype, "originalItemId", void 0);
    InterestOptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-interest-options',
            templateUrl: 'interest-options.component.html',
            styleUrls: ['interest-options.component.css']
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService, interest_service_1.InterestService, component_event_service_1.ComponentEventService])
    ], InterestOptionsComponent);
    return InterestOptionsComponent;
}());
exports.InterestOptionsComponent = InterestOptionsComponent;
//# sourceMappingURL=interest-options.component.js.map