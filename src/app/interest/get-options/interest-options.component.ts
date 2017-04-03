import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ItemService} from "../../item/service/item.service";
import {ItemDetail} from "../../item/models/item-detail.model";
import {InterestService} from "../service/interest.service";
import {CreateInterest} from "../models/create-interest.model";
import {ComponentEventService} from "../../component-events/component-event.service";
import {User} from "../../user/user";
import {LoggedInUser} from "../../user/loggedInUser";
import {Messages} from "../../messages/messages";


@Component({
    moduleId: module.id,
    selector: 'swap-interest-options',
    templateUrl: 'interest-options.component.html',
    styleUrls: ['interest-options.component.css']
})

export class InterestOptionsComponent extends LoggedInUser implements OnInit, OnChanges{

    @Input()
    itemUserId: number;

    @Input()
    originalItemId: number;

    loggedInUserId: number;

    itemDetails: ItemDetail[];
    selectedItems: number[] = [];
    selectedItemTitles: string[] = [];
    createInterestRequest: CreateInterest;
    errorMessage: string;
    messages: Messages;

    constructor(private itemService: ItemService, private interestService: InterestService, private componentEventService: ComponentEventService) {
        super();
        this.messages = new Messages();
    }

    ngOnInit(): void {
        this.errorMessage = null;
        this.invokeGetItemsByUser();
    }

    ngOnChanges(): void {
        this.invokeGetItemsByUser();
    }

    invokeGetItemsByUser(): void {

        let user:User = this.getLoggedInUser();

        if(user === null) {
            this.errorMessage = this.messages.user_not_logged_in;
            return null;
        }

       if(user.id == this.itemUserId) {
           this.errorMessage = this.messages.orig_user_interested_user_equal;
           return null;
       }

        this.errorMessage = null;
        this.loggedInUserId = user.id;
        this.itemService
            .getItemsByUser(this.loggedInUserId)
            .subscribe(
                result => this.getItemsByUserSuccess(result),
                error => console.log(error)
            );
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
        this.createInterestRequest.originalUser = this.itemUserId;
        this.createInterestRequest.interestedUser = this.loggedInUserId;
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

    dismissError(): void {
        this.errorMessage = null;
        this.itemUserId = null;
    }

}