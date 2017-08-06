import {Component, OnChanges, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {NotificationService} from "../../../services/notification.service";
import {Interest} from "../../../models/interest.model";
import {User} from "../../../models/user";
import {InterestService} from "../../../services/interest.service";
import {ComponentEventService} from "../../../services/component-event.service";
import {Interests} from "../../../models/interests.model";
import {NotificationModel} from "../../../models/notification-model";
import {ActivatedRoute} from "@angular/router";

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

    constructor(private route: ActivatedRoute, private componentEventService: ComponentEventService, private interestService: InterestService,private notificationService: NotificationService) {
        super();
        route.params.subscribe(val => {
            this.initialize();
        });
    }

    ngOnInit(): void {


    }

    initialize(): void {
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getOffersAndInterests();
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

    getOffersAndInterests(): void {
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

}