import {Component, Input, OnInit, OnChanges, Output} from "@angular/core";
import {ItemService} from "../../item/service/item.service";
import {ItemDetail} from "../../item/models/item-detail.model";
import {InterestService} from "../service/interest.service";
import {CreateInterest} from "../models/create-interest.model";
import {ComponentEventService} from "../../component-events/component-event.service";


@Component({
    moduleId: module.id,
    selector: 'swap-interest-options',
    templateUrl: 'interest-options.component.html',
    styleUrls: ['interest-options.component.css']
})

export class InterestOptionsComponent implements OnInit, OnChanges {

    @Input()
    userId: number;

    @Input()
    originalItemId: number;

    interestedUserId: number = 2;

    itemDetails: ItemDetail[];
    selectedItems: number[] = [];
    selectedItemTitles: string[] = [];
    createInterestRequest: CreateInterest;

    constructor(private itemService: ItemService, private interestService: InterestService, private componentEventService: ComponentEventService) {
    }

    ngOnInit(): void {
        if (this.userId === null)
            return;

        this.itemService
            .getItemsByUser(this.interestedUserId)
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

    createInterest(): void{
        this.createInterestRequest = new CreateInterest();
        this.createInterestRequest.originalUser = this.userId;
        this.createInterestRequest.interestedUser = this.interestedUserId;
        this.createInterestRequest.oneSidedInterestFlag = true;
        this.createInterestRequest.swappableItemIds = this.selectedItems;
        this.createInterestRequest.originalItem = this.originalItemId;

        this.interestService
            .createInterest(this.createInterestRequest)
            .subscribe(
                result => this.interestSuccess(result),
                error => console.log(error)
            );
    }

    interestSuccess(result: boolean) : void {
        console.log("interest creation: " + result);
        this.componentEventService.interestCreated(result);
    }
}