"use strict";
var LoggedInUser = (function () {
    function LoggedInUser() {
    }
    LoggedInUser.prototype.getLoggedInUser = function () {
        if (localStorage.getItem("loggedInUser") === null)
            return null;
        return JSON.parse(localStorage.getItem("loggedInUser"));
    };
    LoggedInUser.prototype.getAccessToken = function () {
        if (localStorage.getItem("accessToken") === null)
            return null;
        return localStorage.getItem("accessToken");
    };
    LoggedInUser.prototype.setUserInfoInLocalStorage = function (accessToken, user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    };
    LoggedInUser.prototype.removeLoggedInUser = function () {
        localStorage.setItem("accessToken", null);
        localStorage.setItem("loggedInUser", null);
        // remove fbio cookie, disrupts the login/logout flow
        this.delete_fbio_cookie();
    };
    LoggedInUser.prototype.delete_fbio_cookie = function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].split("=")[0].indexOf("fblo_") != -1)
                this.delete_cookie(cookies[i].split("=")[0]);
        }
    };
    LoggedInUser.prototype.delete_cookie = function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    return LoggedInUser;
}());
exports.LoggedInUser = LoggedInUser;
//# sourceMappingURL=loggedInUser.js.map