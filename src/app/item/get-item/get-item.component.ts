import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ItemDetail} from "../../models/item-detail.model";
import {ComponentEventService} from "../../services/component-event.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Interests} from "../../models/interests.model";
import {InterestService} from "../../services/interest.service";
import {LoggedInUser} from "../../storage-utils/loggedInUser";
import {NotificationService} from "../../services/notification.service";
import {NotificationModel} from "../../models/notification-model";
import {Interest} from "../../models/interest.model";


declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'swap-get-item',
    templateUrl: './get-item.component.html',
    styleUrls: ['./get-item.component.css']
})

export class ItemDetailComponent implements OnInit, OnChanges, OnDestroy {

    showItem: boolean = false;

    itemId: number;

    itemDetail: ItemDetail;

    userId: number;

    interestCreated: boolean;

    showInterests: boolean = false;

    interestsOrOffers: Interests;

    loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private itemService: ItemService,
                private componentEventService: ComponentEventService,
                private interestService: InterestService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.componentEventService.interestCreated$.subscribe(
            result => {
                this.interestCreated = result;
            });


       let routeItemId = +this.route.snapshot.params['itemId'];
       this.itemId = routeItemId;
       this.getItem(routeItemId);
       this.interestCreated = false;
    }

    ngOnChanges(): void {
        this.interestCreated = false;
    }

    ngOnDestroy(): void {

    }

    cleanup(): void {
        this.itemDetail = null;
        this.showInterests = false;
        this.showItem = false;
        this.interestCreated = false;
        $('#itemDetailModal').modal('hide');
    }

    getItem(itemId: number) {
        this.itemService
            .getItem(itemId)
            .subscribe(
                result => this.getItemSuccess(result),
                error => console.log(error)
            );
    }

    getInterests(itemDetail: ItemDetail) {

        let itemId = "" + this.itemDetail.itemId;
        let userId = this.loggedInUser.getLoggedInUser().id;
        let isOwner: boolean;
        if(this.itemDetail.userId.userId == userId)
            isOwner = true;
        else
            isOwner = false;

        this.interestService
            .getInterests(userId, itemId, isOwner)
            .subscribe(
                result => this.getInterestsSuccess(result),
                error => console.log(error)
            );
    }

    getInterestsSuccess(result: Interests): void {
        this.interestsOrOffers = result;
        this.getUnreadNotifications();
    }

    getItemSuccess(result: ItemDetail): void {
        this.itemDetail = result;
        this.showItem = true;
        this.getInterests(result);
    }

    passUserId(userId: number) {
        this.userId = userId;
        this.showInterests = true;
    }

    /**
     * Get the unread notifications for the current user
     */
    getUnreadNotifications(): void {
        this.notificationService
            .getUnreadNotifications(this.loggedInUser.getLoggedInUser().id)
            .subscribe(
                result => this.getUnreadNotificationsSuccess(result),
                error => console.log(error)
            );
    }

    /**
     * Invoked on successful call of get unread notifications
     * Sets the results into a local variable
     * @param result
     */
    getUnreadNotificationsSuccess(result: NotificationModel[]) : void {

        for(let notification of result) {
            this.interestsOrOffers.interests.map(x => this.setReadStatus(notification, x));
        }
    }

    /**
     *
     * @param notification
     * @param interest
     * @returns {Interest}
     */
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
}
