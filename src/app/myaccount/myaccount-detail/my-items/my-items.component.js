"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var loggedInUser_1 = require("../../../user/loggedInUser");
var component_event_service_1 = require("../../../component-events/component-event.service");
var user_service_1 = require("../../../user/service/user.service");
var item_service_1 = require("../../../item/service/item.service");
var MyItemsComponent = (function (_super) {
    __extends(MyItemsComponent, _super);
    function MyItemsComponent(componentEventService, userService, itemService) {
        _super.call(this);
        this.componentEventService = componentEventService;
        this.userService = userService;
        this.itemService = itemService;
        this.isLoggedIn = false;
        this.loggedInUser = new loggedInUser_1.LoggedInUser();
    }
    MyItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(function (result) {
            _this.user = result;
            _this.isLoggedIn = true;
        });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getItemsForUser(this.user.id);
    };
    MyItemsComponent.prototype.onFacebookLogoutClick = function () {
        var _this = this;
        FB.logout(function (response) {
            _this.loggedOut(response);
        });
    };
    MyItemsComponent.prototype.loggedOut = function (response) {
        console.log('myaccount: logged out');
        this.isLoggedIn = false;
        this.user = null;
        this.removeLoggedInUser();
        this.componentEventService.userLoggedOut(true);
    };
    MyItemsComponent.prototype.getItemsForUser = function (userId) {
        var _this = this;
        this.userService
            .getItemsForUser(userId)
            .subscribe(function (result) { return _this.getItemsForUserSuccess(result); }, function (error) { return console.log(error); });
    };
    MyItemsComponent.prototype.deleteItem = function (itemId) {
        var _this = this;
        this.itemService
            .deleteItem(itemId)
            .subscribe(function (result) { return _this.getItemsForUser(_this.user.id); }, function (error) { return console.log(error); });
    };
    MyItemsComponent.prototype.getItemsForUserSuccess = function (result) {
        this.items = result;
    };
    MyItemsComponent.prototype.selectItem = function (item) {
        this.componentEventService.passItemObject(item);
    };
    MyItemsComponent.prototype.createNewItem = function () {
        this.componentEventService.passItemObject(null);
    };
    MyItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-myitems',
            templateUrl: 'my-items.component.html'
        }), 
        __metadata('design:paramtypes', [component_event_service_1.ComponentEventService, user_service_1.UserService, item_service_1.ItemService])
    ], MyItemsComponent);
    return MyItemsComponent;
}(loggedInUser_1.LoggedInUser));
exports.MyItemsComponent = MyItemsComponent;
//# sourceMappingURL=my-items.component.js.map