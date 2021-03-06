import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";
import {InterestService} from "../../../services/interest.service";
import {Interest} from "../../../models/interest.model";
import {Interests} from "../../../models/interests.model";


@Component({
    moduleId: module.id,
    selector: 'swap-myoffers',
    templateUrl: 'my-offers.component.html',
    styleUrls: ['my-offers.component.css']
})

export class MyOffersComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    myOffers: Interest[];
    loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private componentEventService: ComponentEventService, private interestService: InterestService) {
        super();
    }
    ngOnInit(): void {
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });
        this.user = this.loggedInUser.getLoggedInUser();
        this.getMyOffers();
    }

    getMyOffers(): void {
        this.interestService
            .getOffersForUser(this.user.id)
            .subscribe(
                result => this.getMyOffersSuccess(result),
                error => console.log(error)
            );
    }

    deleteOffer(interestId: number): void {
        this.interestService
            .deleteInterests(interestId)
            .subscribe(
                result => this.getMyOffers(),
                error => console.log(error)
            );
    }

    getMyOffersSuccess(result: Interests) : void {
        this.myOffers = result.interests;
    }
}