import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ItemService} from "../../services/item.service";
import {ItemDetail} from "../../models/item-detail.model";
import {InterestService} from "../../services/interest.service";
import {CreateInterest} from "../../models/create-interest.model";
import {ComponentEventService} from "../../services/component-event.service";
import {User} from "../../models/user";
import {LoggedInUser} from "../../storage-utils/loggedInUser";
import {Messages} from "../../models/error-messages";


@Component({
    moduleId: module.id,
    selector: 'swap-interest-options',
    templateUrl: './interest-options.component.html',
    styleUrls: ['./interest-options.component.css']
})

export class InterestOptionsComponent extends LoggedInUser implements OnInit, OnChanges{

    @Input()
    itemUserId: string;

    @Input()
    originalItemId: number;

    loggedInUserId: string;

    itemDetails: ItemDetail[];
    selectedItems: number[] = [];
    selectedItemTitles: string[] = [];
    createInterestRequest: CreateInterest;
    errorMessage: string;
    messages: Messages;
    showInterests: boolean = false;

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
        this.showInterests = true;
    }

    checkedItems(e: any, itemId: number, title: string): void {
        if(e.target.checked) {
            if(this.selectedItems.length < 1) {
                this.selectedItems.push(itemId);
                this.selectedItemTitles.push(title);
            } else {
                e.target.setChecked(false);
            }
        } else if(!e.target.checked && this.selectedItems.indexOf(itemId) != -1){
            this.selectedItems.splice(this.selectedItems.indexOf(itemId), 1);
            this.selectedItemTitles.splice(this.selectedItemTitles.indexOf(title), 1);
        }
    }

    checkboxState(itemId: number): boolean {

        if(this.selectedItems.length >= 1 && this.selectedItems.indexOf(itemId) == -1) {
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
        if(result === true)
            this.showInterests = false;

        this.componentEventService.interestCreated(result);
    }

    dismissError(): void {
        this.errorMessage = null;
        this.itemUserId = null;
    }

}
