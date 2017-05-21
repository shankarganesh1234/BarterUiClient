import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {ItemDetail} from "../../../models/item-detail.model";
import {ItemService} from "../../../services/item.service";


declare const AOS:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myitems',
    templateUrl: 'my-items.component.html'
})

export class MyItemsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    loggedInUser: LoggedInUser = new LoggedInUser();
    items: ItemDetail[];


    constructor(private componentEventService: ComponentEventService, private userService: UserService, private itemService: ItemService) {
        super();
        AOS.init();
    }
    ngOnInit(): void {
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getItemsForUser(this.user.id);
    }

    getItemsForUser(userId: string): void {
        this.userService
            .getItemsForUser(userId)
            .subscribe(
                result => this.getItemsForUserSuccess(result),
                error => console.log(error)
            );
    }

    deleteItem(itemId: number): void {
        this.itemService
            .deleteItem(itemId)
            .subscribe(
                result => this.getItemsForUser(this.user.id),
                error => console.log(error)
            );
    }
    getItemsForUserSuccess(result: ItemDetail[]): void {
        this.items = result;
    }
    selectItem(item: ItemDetail): void {
        this.componentEventService.passItemObject(item);
    }
    createNewItem(): void {
        this.componentEventService.passItemObject(null);
    }
}