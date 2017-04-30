import {User} from "../models/user";
export class LoggedInUser {

    constructor() {

    }

    getLoggedInUser(): User {
        if(localStorage.getItem("loggedInUser") === null)
            return null;
        return JSON.parse(localStorage.getItem("loggedInUser"));
    }

    getAccessToken(): string {
        if(localStorage.getItem("accessToken") === null)
            return null;

        return localStorage.getItem("accessToken");
    }

    setUserInfoInLocalStorage(accessToken: string, user: User) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    removeLoggedInUser(): void {
        localStorage.setItem("accessToken", null);
        localStorage.setItem("loggedInUser", null);
        // remove fbio cookie, disrupts the login/logout flow
        this.delete_fbio_cookie();
    }

    delete_fbio_cookie(): void {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++)
        {
            if(cookies[i].split("=")[0].indexOf("fblo_") != -1)
                this.delete_cookie(cookies[i].split("=")[0]);
        }
    }

    delete_cookie(name: string) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}