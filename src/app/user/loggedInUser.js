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
    };
    return LoggedInUser;
}());
exports.LoggedInUser = LoggedInUser;
//# sourceMappingURL=loggedInUser.js.map