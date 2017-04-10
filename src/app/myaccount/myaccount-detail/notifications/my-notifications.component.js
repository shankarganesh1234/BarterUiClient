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
var MyNotificationsComponent = (function (_super) {
    __extends(MyNotificationsComponent, _super);
    function MyNotificationsComponent(componentEventService) {
        _super.call(this);
        this.componentEventService = componentEventService;
        this.isLoggedIn = false;
    }
    MyNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(function (result) {
            _this.user = result;
            _this.isLoggedIn = true;
        });
    };
    MyNotificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-mynotifications',
            templateUrl: 'my-notifications.component.html'
        }), 
        __metadata('design:paramtypes', [component_event_service_1.ComponentEventService])
    ], MyNotificationsComponent);
    return MyNotificationsComponent;
}(loggedInUser_1.LoggedInUser));
exports.MyNotificationsComponent = MyNotificationsComponent;
//# sourceMappingURL=my-notifications.component.js.map