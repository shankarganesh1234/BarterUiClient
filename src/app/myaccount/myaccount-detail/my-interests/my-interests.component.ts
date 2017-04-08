import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../user/loggedInUser";
import {ComponentEventService} from "../../../component-events/component-event.service";
import {User} from "../../../user/user";



declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myinterests',
    templateUrl: 'my-interests.component.html'
})

export class MyInterestsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;

    constructor(private componentEventService: ComponentEventService) {
        super();
    }
    ngOnInit(): void {
        console.log('myaccount: init');
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
        console.log('myaccount: logged out');
        this.isLoggedIn = false;
        this.user = null;
        this.removeLoggedInUser();
        this.componentEventService.userLoggedOut(true);
    }
}