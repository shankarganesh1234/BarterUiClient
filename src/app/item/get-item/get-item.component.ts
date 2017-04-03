import {Component, OnInit, OnChanges, OnDestroy} from "@angular/core";
import {ItemService} from "../service/item.service";
import {ItemDetail} from "../models/item-detail.model";
import {ComponentEventService} from "../../component-events/component-event.service";


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


    constructor(private itemService: ItemService, private componentEventService: ComponentEventService) {
     }

    ngOnInit(): void {
        this.componentEventService.interestCreated$.subscribe(
            result => {
                this.interestCreated = result;
            });
        this.componentEventService.itemId$.subscribe(
            itemId => {
                this.itemId = itemId;
                this.getItem(this.itemId);
            });
    }

    ngOnChanges(): void {
    }

    ngOnDestroy(): void {
        console.log('on destroy called');
    }

    cleanup(): void {
        this.itemDetail = null;
        this.showInterests = false;
        this.showItem = false;
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

    getItemSuccess(result: ItemDetail) : void {
        this.itemDetail = result;
        this.showItem = true;
    }

    passUserId(userId: number) {
        this.userId = userId;
        this.showInterests = true;
    }
}