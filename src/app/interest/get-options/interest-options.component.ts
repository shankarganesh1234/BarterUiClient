import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ItemService} from "../../item/service/item.service";
import {ItemDetail} from "../../item/models/item-detail.model";


@Component({
    moduleId: module.id,
    selector: 'swap-interest-options',
    templateUrl: 'interest-options.component.html',
    styleUrls: ['interest-options.component.css']
})

export class InterestOptionsComponent implements OnInit, OnChanges {

    @Input()
    userId: number;

    itemDetails: ItemDetail[];
    selectedItems: number[] = [];
    selectedItemTitles: string[] = [];

    constructor(private itemService: ItemService) {
    }

    ngOnInit(): void {
        if (this.userId === null)
            return;

        this.itemService
            .getItemsByUser(this.userId)
            .subscribe(
                result => this.getItemsByUserSuccess(result),
                error => console.log(error)
            );

    }

    ngOnChanges(): void {

    }

    getItemsByUserSuccess(result: ItemDetail[]): void {
        this.itemDetails = result;
    }

    checkedItems(e: any, itemId: number, title: string): void {
        if(e.target.checked) {
            if(this.selectedItems.length < 3) {
                console.log('added ' + itemId);
                this.selectedItems.push(itemId);
                this.selectedItemTitles.push(title);
            } else {
                e.target.setChecked(false);
                console.log("limit reached");
            }
        } else if(!e.target.checked && this.selectedItems.indexOf(itemId) != -1){
            console.log('removed ' + itemId);
            this.selectedItems.splice(this.selectedItems.indexOf(itemId), 1);
            this.selectedItemTitles.splice(this.selectedItemTitles.indexOf(title), 1);
        }
        console.log('array = ' + this.selectedItems);
    }

    checkboxState(itemId: number): boolean {

        if(this.selectedItems.length >= 3 && this.selectedItems.indexOf(itemId) == -1) {
            return true;
        } else {
            return false;
        }
    }

}