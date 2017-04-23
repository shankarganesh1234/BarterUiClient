import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";
import {InterestService} from "../../../services/interest.service";
import {Interest} from "../../../models/interest.model";
import {Interests} from "../../../models/interests.model";



@Component({
    moduleId: module.id,
    selector: 'swap-myinterests',
    templateUrl: 'my-interests.component.html',
    styleUrls: ['my-interests.component.css']
})

export class MyInterestsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    loggedInUser: LoggedInUser = new LoggedInUser();
    myInterests: Interest[];


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
        this.getMyInterests();

    }

    getMyInterests(): void {
        this.interestService
            .getInterestsForUser(this.user.id)
            .subscribe(
                result => this.getMyInterestsSuccess(result),
                error => console.log(error)
            );
    }

    deleteInterest(interestId: number): void {
        this.interestService
            .deleteInterests(interestId)
            .subscribe(
                result => this.getMyInterests(),
                error => console.log(error)
            );
    }

    getMyInterestsSuccess(result: Interests) : void {
        this.myInterests = result.interests;
    }
}