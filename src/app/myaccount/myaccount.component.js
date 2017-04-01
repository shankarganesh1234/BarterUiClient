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
var user_service_1 = require("../user/service/user.service");
var component_event_service_1 = require("../component-events/component-event.service");
var MyAccountComponent = (function () {
    function MyAccountComponent(userService, componentEventService) {
        this.userService = userService;
        this.componentEventService = componentEventService;
        this.isLoggedIn = false;
    }
    MyAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('my account');
        console.log(this.user);
        console.log(this.isLoggedIn);
        this.componentEventService.userLoggedin$.subscribe(function (result) {
            _this.user = result;
            _this.isLoggedIn = true;
        });
    };
    MyAccountComponent.prototype.onFacebookLogoutClick = function () {
        var _this = this;
        FB.logout(function (response) {
            _this.loggedOut(response);
        });
    };
    MyAccountComponent.prototype.loggedOut = function (response) {
        console.log('logged out');
        this.isLoggedIn = false;
        this.user = null;
        this.componentEventService.userLoggedOut(true);
    };
    MyAccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-myaccount',
            templateUrl: 'myaccount.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, component_event_service_1.ComponentEventService])
    ], MyAccountComponent);
    return MyAccountComponent;
}());
exports.MyAccountComponent = MyAccountComponent;
//# sourceMappingURL=myaccount.component.js.map