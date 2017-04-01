import {Component, OnInit} from "@angular/core";
import {UserService} from "../user/service/user.service";
import {ComponentEventService} from "../component-events/component-event.service";
import {User} from "../user/user";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myaccount',
    templateUrl: 'myaccount.component.html'
})

export class MyAccountComponent implements OnInit {

    isLoggedIn: boolean = false;
    user: User;

    constructor(private userService: UserService, private componentEventService: ComponentEventService) {

    }
    ngOnInit(): void {
        console.log('my account');
        console.log(this.user);
        console.log(this.isLoggedIn);
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
    }

    onFacebookLogoutClick() {
        FB.logout((response:any) => {
            this.loggedOut(response);
        });
    }

    loggedOut(response: any): void {
        console.log('logged out');
        this.isLoggedIn = false;
        this.user = null;
        this.componentEventService.userLoggedOut(true);
    }
}