import {Component, OnInit} from "@angular/core";
import {LoginService} from "./service/login.service";
import {LoginResponse} from "./models/login-response.model";
import {LoginRequest} from "./models/login-request.model";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    userInfo: LoginResponse;

    constructor(private loginService: LoginService) {
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
            } else {
                console.log('cannot tell');
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
        }else if (resp.status === 'not_authorized') {
            console.log('not authorized');
        }else {
            console.log('unknown');
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

    loginSuccess(result: LoginResponse) : void {
        this.userInfo = result;
    }

}