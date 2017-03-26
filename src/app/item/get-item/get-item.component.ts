import {Component, Input, OnInit, OnChanges, OnDestroy} from "@angular/core";
import {ItemService} from "../service/item.service";
import {ItemDetail} from "../models/item-detail.model";


@Component({
    moduleId: module.id,
    selector: 'swap-get-item',
    templateUrl: 'get-item.component.html',
    styleUrls: ['get-item.component.css']
})

export class ItemDetailComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    itemId: number;

    itemDetail: ItemDetail;

    userId: number;

    constructor(private itemService: ItemService) {
    }

    ngOnInit(): void {
        //this.getItem(this.itemId);
    }

    ngOnChanges(): void {
        this.getItem(this.itemId);
    }

    ngOnDestroy(): void {
        console.log('on destroy called');
    }

    cleanup(): void {
        this.itemDetail = null;
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
    }

    passUserId(userId: number) {
        this.userId = userId;
    }
}