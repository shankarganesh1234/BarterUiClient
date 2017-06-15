import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";



declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myprofile',
    templateUrl: 'my-profile.component.html'
})

export class MyProfileComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private componentEventService: ComponentEventService) {
        super();
    }
    ngOnInit(): void {
        this.user = this.loggedInUser.getLoggedInUser();
    }

    onFacebookLogoutClick() {
        FB.logout((response:any) => {
            this.loggedOut(response);
        });
    }

    loggedOut(response: any): void {
        this.isLoggedIn = false;
        this.user = null;
        this.removeLoggedInUser();
        this.componentEventService.userLoggedOut(true);
    }
}