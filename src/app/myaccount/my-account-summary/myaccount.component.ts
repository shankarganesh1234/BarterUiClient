import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {LoggedInUser} from "../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../services/component-event.service";
import {NotificationService} from "../../services/notification.service";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.css']
})

export class MyAccountComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    isGlobalNotifications:boolean = false;

    constructor(private componentEventService: ComponentEventService, private notificationService: NotificationService) {
        super();
    }
    ngOnInit(): void {
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });

        // websocket notification section
        let connection:WebSocket = this.notificationService.getWebSocket();
        this.notificationService.initWebSocket(connection);
        this.notificationService.connection.onmessage = function(e) {
            if(e != null && e.data != null && e.data != '') {
                console.log(e.data);
                this.isGlobalNotifications = true;
            }
        }.bind(this);
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
