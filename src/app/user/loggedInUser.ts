import {User} from "./user";
export class LoggedInUser {

    constructor() {

    }

    getLoggedInUser(): User {
        if(localStorage.getItem("loggedInUser") === null)
            return null;
        return JSON.parse(localStorage.getItem("loggedInUser"));
    }

    setUserInfoInLocalStorage(accessToken: string, user: User) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    removeLoggedInUser(): void {
        localStorage.setItem("accessToken", null);
        localStorage.setItem("loggedInUser", null);
    }
}