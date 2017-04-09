import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../user/loggedInUser";
import {ComponentEventService} from "../../../component-events/component-event.service";
import {User} from "../../../user/user";
import {InterestService} from "../../../interest/service/interest.service";
import {Interest} from "../../../interest/models/interest.model";
import {Interests} from "../../../interest/models/interests.model";



declare const FB:any;

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
        console.log('myaccount: init');
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
}