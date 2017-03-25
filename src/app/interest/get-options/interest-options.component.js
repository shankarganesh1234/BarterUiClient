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
var forms_1 = require("@angular/forms");
var InterestOptionsComponent = (function () {
    function InterestOptionsComponent(itemService, fb) {
        this.itemService = itemService;
        this.fb = fb;
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
        __metadata('design:paramtypes', [item_service_1.ItemService, forms_1.FormBuilder])
    ], InterestOptionsComponent);
    return InterestOptionsComponent;
}());
exports.InterestOptionsComponent = InterestOptionsComponent;
//# sourceMappingURL=interest-options.component.js.map