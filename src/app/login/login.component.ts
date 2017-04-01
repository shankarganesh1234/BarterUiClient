import {Component, OnInit} from "@angular/core";
import {LoginService} from "./service/login.service";
import {LoginResponse} from "./models/login-response.model";
import {LoginRequest} from "./models/login-request.model";
import {ComponentEventService} from "../component-events/component-event.service";
import {User} from "../user/user";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    userInfo: User;
    isLoggedIn: boolean = false;

    constructor(private loginService: LoginService, private componentEventService: ComponentEventService) {
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
                console.log('connected');
                console.log(result);
                this.userLogin(result.authResponse.accessToken);
                this.isLoggedIn = true;
            } else {
                console.log('cannot tell');
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
            console.log('inside connected');
            this.userLogin(resp.authResponse.accessToken);
            this.isLoggedIn = true;
        }else if (resp.status === 'not_authorized') {
            console.log('not authorized');
            this.isLoggedIn = false;
        }else {
            console.log('unknown');
            this.isLoggedIn = false;
        }
    };

    onFacebookLogoutClick() {


    }



    ngOnInit() {
        // check if user is logged on on page load
        this.isUserLoggedIn();
    }

    userLogin(accessToken: string) : any {
        let loginRequest : LoginRequest = new LoginRequest();
        loginRequest.accessToken = accessToken;
        this.loginService
            .userLogin(loginRequest)
            .subscribe(
                result => this.loginSuccess(result),
                error => console.log(error)
            );
    }

    loginSuccess(result: User) : void {
        this.userInfo = result;
        this.componentEventService.userLoggedIn(result);
    }

}