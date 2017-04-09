import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../user/loggedInUser";
import {ComponentEventService} from "../../../component-events/component-event.service";
import {User} from "../../../user/user";
import {UserService} from "../../../user/service/user.service";
import {ItemDetail} from "../../../item/models/item-detail.model";



declare const FB:any;

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


    constructor(private componentEventService: ComponentEventService, private userService: UserService) {
        super();
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

    onFacebookLogoutClick() {
        FB.logout((response:any) => {
            this.loggedOut(response);
        });
    }

    loggedOut(response: any): void {
        console.log('myaccount: logged out');
        this.isLoggedIn = false;
        this.user = null;
        this.removeLoggedInUser();
        this.componentEventService.userLoggedOut(true);
    }

    getItemsForUser(userId: number): void {
        this.userService
            .getItemsForUser(userId)
            .subscribe(
                result => this.getItemsForUserSuccess(result),
                error => console.log(error)
            );
    }

    getItemsForUserSuccess(result: ItemDetail[]): void {
        this.items = result;
    }
}