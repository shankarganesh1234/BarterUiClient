import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ItemDetail} from "../../models/item-detail.model";
import {ComponentEventService} from "../../services/component-event.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Interests} from "../../models/interests.model";
import {InterestService} from "../../services/interest.service";
import {LoggedInUser} from "../../storage-utils/loggedInUser";


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
                private interestService: InterestService) {
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
        console.log('on destroy called');
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
                result => this.interestsOrOffers = result,
                error => console.log(error)
            );
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
}
