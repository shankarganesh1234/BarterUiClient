import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ItemService} from "../service/item.service";
import {ItemDetail} from "../models/item-detail.model";


@Component({
    moduleId: module.id,
    selector: 'swap-get-item',
    templateUrl: 'get-item.component.html',
    styleUrls: ['get-item.component.css']
})

export class ItemDetailComponent implements OnInit, OnChanges {

    @Input()
    itemId: number;

    itemDetail: ItemDetail;

    constructor(private itemService: ItemService) {
    }

    ngOnInit(): void {
        //this.getItem(this.itemId);
    }

    ngOnChanges(): void {
        this.getItem(this.itemId);
        this.getItem(this.itemId);
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

}