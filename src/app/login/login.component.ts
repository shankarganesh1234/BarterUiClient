import {Component, OnInit} from "@angular/core";
import {LoginService} from "./service/login.service";
import {LoginRequest} from "./models/login-request.model";
import {ComponentEventService} from "../component-events/component-event.service";
import {User} from "../user/user";
import {LoggedInUser} from "../user/loggedInUser";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;

    constructor(private loginService: LoginService, private componentEventService: ComponentEventService) {
        super();
        FB.init({
            appId      : '422821098053082',
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {

        FB.login((result: any) => {
            if (result.status === 'connected') {
                this.userLogin(result.authResponse.accessToken);
                this.isLoggedIn = true;
            } else {
                this.removeLoggedInUser();
                this.isLoggedIn = false;
            }
        }, { scope: 'public_profile,email' });
    }

    isUserLoggedIn() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
    }

    statusChangeCallback(resp: any) {
        if (resp.status === 'connected') {
            this.isLoggedIn = true;
            this.componentEventService.userLoggedIn(this.getLoggedInUser());
        }else if (resp.status === 'not_authorized') {
            this.removeLoggedInUser();
            this.isLoggedIn = false;
        }else {
            this.removeLoggedInUser();
            this.isLoggedIn = false;
        }
    };

    ngOnInit() {
        // check if user is logged on on page load
        this.isUserLoggedIn();
        this.componentEventService.userLoggedOut$.subscribe(
            result => {
                if(result == true) {
                    this.isLoggedIn = false;
                }
            });
    }

    userLogin(accessToken: string) : any {
        let loginRequest : LoginRequest = new LoginRequest();
        loginRequest.accessToken = accessToken;
        this.loginService
            .userLogin(loginRequest)
            .subscribe(
                result => this.loginSuccess(accessToken, result),
                error => console.log(error)
            );
    }

    loginSuccess(accessToken: string, result: User) : void {
        this.setUserInfoInLocalStorage(accessToken, result);
        this.componentEventService.userLoggedIn(result);
    }

}