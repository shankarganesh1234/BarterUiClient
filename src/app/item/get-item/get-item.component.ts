import {Component, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ItemDetail} from "../../models/item-detail.model";
import {ComponentEventService} from "../../services/component-event.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'swap-get-item',
    templateUrl: 'get-item.component.html',
    styleUrls: ['get-item.component.css']
})

export class ItemDetailComponent implements OnInit, OnChanges, OnDestroy {

    showItem: boolean = false;

    itemId: number;

    itemDetail: ItemDetail;

    userId: number;

    interestCreated: boolean;

    showInterests: boolean = false;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private itemService: ItemService,
                private componentEventService: ComponentEventService) {
    }

    ngOnInit(): void {
        this.componentEventService.interestCreated$.subscribe(
            result => {
                this.interestCreated = result;
            });


       let routeItemId = +this.route.snapshot.params['itemId'];
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

    getItemSuccess(result: ItemDetail): void {
        this.itemDetail = result;
        this.showItem = true;
    }

    passUserId(userId: number) {
        this.userId = userId;
        this.showInterests = true;
    }
}