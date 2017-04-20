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
var loggedInUser_1 = require("../../../storage-utils/loggedInUser");
var component_event_service_1 = require("../../../services/component-event.service");
var interest_service_1 = require("../../../services/interest.service");
var MyInterestsComponent = (function (_super) {
    __extends(MyInterestsComponent, _super);
    function MyInterestsComponent(componentEventService, interestService) {
        _super.call(this);
        this.componentEventService = componentEventService;
        this.interestService = interestService;
        this.isLoggedIn = false;
        this.loggedInUser = new loggedInUser_1.LoggedInUser();
    }
    MyInterestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentEventService.userLoggedin$.subscribe(function (result) {
            _this.user = result;
            _this.isLoggedIn = true;
        });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getMyInterests();
    };
    MyInterestsComponent.prototype.getMyInterests = function () {
        var _this = this;
        this.interestService
            .getInterestsForUser(this.user.id)
            .subscribe(function (result) { return _this.getMyInterestsSuccess(result); }, function (error) { return console.log(error); });
    };
    MyInterestsComponent.prototype.deleteInterest = function (interestId) {
        var _this = this;
        this.interestService
            .deleteInterests(interestId)
            .subscribe(function (result) { return _this.getMyInterests(); }, function (error) { return console.log(error); });
    };
    MyInterestsComponent.prototype.getMyInterestsSuccess = function (result) {
        this.myInterests = result.interests;
    };
    MyInterestsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-myinterests',
            templateUrl: 'my-interests.component.html',
            styleUrls: ['my-interests.component.css']
        }), 
        __metadata('design:paramtypes', [component_event_service_1.ComponentEventService, interest_service_1.InterestService])
    ], MyInterestsComponent);
    return MyInterestsComponent;
}(loggedInUser_1.LoggedInUser));
exports.MyInterestsComponent = MyInterestsComponent;
//# sourceMappingURL=my-interests.component.js.map