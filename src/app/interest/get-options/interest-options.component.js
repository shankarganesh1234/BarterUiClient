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
var InterestOptionsComponent = (function () {
    function InterestOptionsComponent(itemService) {
        this.itemService = itemService;
        this.selectedItems = [];
        this.selectedItemTitles = [];
    }
    InterestOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userId === null)
            return;
        this.itemService
            .getItemsByUser(this.userId)
            .subscribe(function (result) { return _this.getItemsByUserSuccess(result); }, function (error) { return console.log(error); });
    };
    InterestOptionsComponent.prototype.ngOnChanges = function () {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InterestOptionsComponent.prototype, "userId", void 0);
    InterestOptionsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-interest-options',
            templateUrl: 'interest-options.component.html',
            styleUrls: ['interest-options.component.css']
        }), 
        __metadata('design:paramtypes', [item_service_1.ItemService])
    ], InterestOptionsComponent);
    return InterestOptionsComponent;
}());
exports.InterestOptionsComponent = InterestOptionsComponent;
//# sourceMappingURL=interest-options.component.js.map