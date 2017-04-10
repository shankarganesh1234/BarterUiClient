import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../user/loggedInUser";
import {ComponentEventService} from "../../../component-events/component-event.service";
import {User} from "../../../user/user";

@Component({
    moduleId: module.id,
    selector: 'swap-mynotifications',
    templateUrl: 'my-notifications.component.html'
})

export class MyNotificationsComponent extends LoggedInUser implements OnInit {

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
}