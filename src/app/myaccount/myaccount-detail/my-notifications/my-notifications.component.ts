import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {NotificationService} from "../../../services/notification.service";
import {Interest} from "../../../models/interest.model";
import {User} from "../../../models/user";
import {InterestService} from "../../../services/interest.service";
import {ComponentEventService} from "../../../services/component-event.service";
import {Interests} from "../../../models/interests.model";
import {NotificationModel} from "../../../models/notification-model";

@Component({
    moduleId: module.id,
    selector: 'swap-mynotifications',
    templateUrl: 'my-notifications.component.html',
    styleUrls: ['my-notifications.component.css']
})

export class MyNotificationsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    myIntsAndOffrs: Interest[];
    unreadNotifications: NotificationModel[];
    loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private componentEventService: ComponentEventService, private interestService: InterestService,private notificationService: NotificationService) {
        super();
    }

    ngOnInit(): void {
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getMyOffers();
        this.initializeWebsocket();
    }

    /**
     * Get the unread notifications for the current user
     */
    getUnreadNotifications(): void {
        this.notificationService
            .getUnreadNotifications(this.user.id)
            .subscribe(
                result => this.getUnreadNotificationsSuccess(result),
                error => console.log(error)
            );
    }

    getMyOffers(): void {
        this.interestService
            .getAllInterestsAndOffersForUser(this.user.id)
            .subscribe(
                result => this.getAllInterestsAndOffersForUser(result),
                error => console.log(error)
            );
    }

    /**
     * Invoked on successful call of get unread notifications
     * Sets the results into a local variable
     * @param result
     */
    getUnreadNotificationsSuccess(result: NotificationModel[]) : void {
        this.unreadNotifications = result;

        for(let notification of this.unreadNotifications) {
            this.myIntsAndOffrs.map(x => this.setReadStatus(notification, x));
        }
    }

    setReadStatus(notification: NotificationModel, interest: Interest) : Interest {
        console.log('checking for interest with id = ' + interest.interestId);
        if(+notification.interestId == interest.interestId) {

            if(notification.status == 'UNREAD') {

                if(notification.type == 'INTEREST') {
                    interest.unreadInterest = true;
                }
                if(notification.type == 'CHAT') {
                    interest.unreadChat = true;
                }
            } else {
                interest.unreadInterest = false;
                interest.unreadChat = false;
            }
        }
        return interest;
    }

    getAllInterestsAndOffersForUser(result: Interests) : void {
        this.myIntsAndOffrs = result.interests;
        this.getUnreadNotifications();
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
                        for(let notification of this.notifications) {
                            this.myIntsAndOffrs.map(x => this.setReadStatus(notification, x));
                        }
                    }
                }
            }.bind(this);
        }
    }
}