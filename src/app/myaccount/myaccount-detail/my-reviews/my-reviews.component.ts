import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";


@Component({
    moduleId: module.id,
    selector: 'swap-myreviews',
    templateUrl: 'my-reviews.component.html'
})

export class MyReviewsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;

    constructor(private componentEventService: ComponentEventService) {
        super();
    }
    ngOnInit(): void {
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
    }
}