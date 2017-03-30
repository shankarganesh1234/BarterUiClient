import {Component, Input, OnInit, OnChanges, OnDestroy} from "@angular/core";
import {ItemService} from "../service/item.service";
import {ItemDetail} from "../models/item-detail.model";
import {ComponentEventService} from "../../component-events/component-event.service";
import {Messages} from "../../messages/messages";


declare const FB:any;

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

    interestCreated: boolean;

    errorMessage: string;

    messages: Messages;

    showInterests: boolean = false;


    constructor(private itemService: ItemService, private componentEventService: ComponentEventService) {
        this.messages = new Messages();
    }

    ngOnInit(): void {
        this.componentEventService.interestCreated$.subscribe(
            result => {
                this.interestCreated = result;
            });
    }

    ngOnChanges(): void {
        this.getItem(this.itemId);
    }

    ngOnDestroy(): void {
        console.log('on destroy called');
    }

    cleanup(): void {
        this.itemDetail = null;
        this.showInterests = false;
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
        this.isUserLoggedIn();
    }

    onFacebookLoginClick() {

        FB.login((result: any) => {
            if (result.status === 'connected') {
                console.log('connected');
                console.log(result);
                this.errorMessage = null;
            } else {
                console.log('cannot tell');
                this.errorMessage = this.messages.user_not_logged_in;
            }
        }, { scope: 'public_profile,email' });

    }

    isUserLoggedIn() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
    }

    statusChangeCallback(resp: any) {
        if (resp.status === 'connected') {
            console.log('inside connected');
            this.errorMessage = null;
            this.showInterests = true;
        }else if (resp.status === 'not_authorized') {
            console.log('not authorized');
            this.errorMessage = this.messages.user_not_logged_in;
        }else {
            console.log('unknown');
            this.errorMessage = this.messages.user_not_logged_in;
        }
    };
}