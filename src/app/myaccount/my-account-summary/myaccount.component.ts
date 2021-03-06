import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {LoggedInUser} from "../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../services/component-event.service";
import {NotificationService} from "../../services/notification.service";
import {NotificationModel} from "../../models/notification-model";


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

    // flags for showing global notifications on the my account page
    isUnreadNotification: boolean = false;
    // end of flags

    notifications: NotificationModel[];

    constructor(private componentEventService: ComponentEventService, private notificationService: NotificationService) {
        super();
    }
    ngOnInit(): void {
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                if(result != null) {
                    this.user = result;
                    this.isLoggedIn = true;
                }
            });
        this.initializeWebsocket();
    }

    /**
     * Initialize websocket and start printing notifications if any
     */
    initializeWebsocket(): void {

        // websocket notification section
        let connection: WebSocket = this.notificationService.getWebSocket();

        if (connection != null) {

            this.notificationService.initWebSocket(connection);
            this.notificationService.connection.onmessage = function (e) {
                if (e != null && e.data != null && e.data != '') {
                    this.notifications = JSON.parse(e.data);

                    if(this.notifications != null && this.notifications.length > 0) {
                        this.isUnreadNotification = true;
                    } else {
                        // reset , since all notifications have been read
                        this.isUnreadNotification = false;
                    }
                }
            }.bind(this);
        }
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
