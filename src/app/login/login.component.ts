import {Component, OnInit} from "@angular/core";
import {LoginService} from "../services/login.service";
import {LoginRequest} from "../models/login-request.model";
import {ComponentEventService} from "../services/component-event.service";
import {User} from "../models/user";
import {LoggedInUser} from "../storage-utils/loggedInUser";
import {FbLongLivedTokenModel} from "../models/fb-longlivedtoken.model";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
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

    /**
     * Invoked when the facebook login button is clicked
     * Calls GRAPH API to authenticate the user
     */
    onFacebookLoginClick() {

        FB.login((result: any) => {
            if (result.status === 'connected') {
                this.userLogin(result.authResponse.accessToken);
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

    /**
     * Status change callback
     */
    statusChangeCallback(resp: any) {
        if (resp.status === 'connected') {

            this.isLoggedIn = true;
            if(this.getLoggedInUser() != null) {
                this.componentEventService.userLoggedIn(this.getLoggedInUser());
            } else {
                this.onFacebookLoginClick();
            }

        }else if (resp.status === 'not_authorized') {
            this.removeLoggedInUser();
            this.isLoggedIn = false;
        }else {
            this.removeLoggedInUser();
            this.isLoggedIn = false;
        }
    };

    ngOnInit() {
        // check if storage-utils is logged on page load
        this.isUserLoggedIn();
        this.componentEventService.userLoggedOut$.subscribe(
            result => {
                if(result == true) {
                    this.isLoggedIn = false;
                }
            });
    }

    /**
     * Call login service to create record in db for the current user
     * @param accessToken
     */
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

    /**
     * Invoked on user login success
     * Once this is invoked, then subsequently the long lived access token is minted
     * @param accessToken
     * @param result
     */
    loginSuccess(accessToken: string, result: User) : void {
        this.getLongLivedToken(result, accessToken);
    }

    /**
     * Get long lived access token from FB by using the short lived token
     * @param user
     * @param accessToken
     */
    getLongLivedToken(user: User, accessToken: string): void {

        let fbLongLivedTokenRequest: FbLongLivedTokenModel = new FbLongLivedTokenModel();
        fbLongLivedTokenRequest.accessToken = accessToken;

        this.loginService
            .getLongLivedToken(fbLongLivedTokenRequest)
            .subscribe(
                result => this.getLongLivedTokenSuccess(user, result),
                error => console.log(error)
            );
    }

    /**
     * Invoked on success of getting the long lived token.
     * User and access token is stored in local storage.
     * Access token is sent in all requests that need authentication
     * @param user
     * @param longLivedToken
     */
    getLongLivedTokenSuccess(user: User, longLivedToken: string): void {
        this.setUserInfoInLocalStorage(longLivedToken, user);
        this.componentEventService.userLoggedIn(user);
        this.isLoggedIn = true;
    }
}
