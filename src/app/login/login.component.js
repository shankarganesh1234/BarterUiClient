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
var login_service_1 = require("./service/login.service");
var login_request_model_1 = require("./models/login-request.model");
var LoginComponent = (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
        FB.init({
            appId: '422821098053082',
            cookie: false,
            // the session
            xfbml: true,
            version: 'v2.5' // use graph api version 2.5
        });
    }
    LoginComponent.prototype.onFacebookLoginClick = function () {
        var _this = this;
        FB.login(function (result) {
            if (result.status === 'connected') {
                console.log('connected');
                console.log(result);
                _this.userLogin(result.authResponse.accessToken);
            }
            else {
                console.log('cannot tell');
            }
        }, { scope: 'public_profile,email' });
    };
    LoginComponent.prototype.onFacebookLogoutClick = function () {
    };
    LoginComponent.prototype.statusChangeCallback = function (resp) {
        if (resp.status === 'connected') {
            console.log('inside connected');
        }
        else if (resp.status === 'not_authorized') {
            console.log('not authorized');
        }
        else {
            console.log('unknown');
        }
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if user is logged on on page load
        FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response);
        });
    };
    LoginComponent.prototype.userLogin = function (accessToken) {
        var _this = this;
        var loginRequest = new login_request_model_1.LoginRequest();
        loginRequest.accessToken = accessToken;
        this.loginService
            .userLogin(loginRequest)
            .subscribe(function (result) { return _this.loginSuccess(result); }, function (error) { return console.log(error); });
    };
    LoginComponent.prototype.loginSuccess = function (result) {
        this.userInfo = result;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map