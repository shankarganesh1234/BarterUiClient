import {Component, Input, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";
import {ActivatedRoute} from "@angular/router";


declare const FB:any;

@Component({
    moduleId: module.id,
    selector: 'swap-myaccount-detail',
    templateUrl: './myaccount-detail.component.html',
    styleUrls: ['./myaccount-detail.component.css']
})

export class MyAccountDetailComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;

    componentLoadIndicator: string;
    private sub: any;

    constructor(private componentEventService: ComponentEventService, private route: ActivatedRoute) {
        super();
    }
    ngOnInit(): void {
        console.log('myaccount: init');
        this.componentEventService.userLoggedin$.subscribe(
            result => {
                this.user = result;
                this.isLoggedIn = true;
            });

        this.sub = this.route.params.subscribe(params => {
            this.componentLoadIndicator = params['component']; // (+) converts string 'id' to a number
            console.log(this.componentLoadIndicator);
        });

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

    loadComponent(componentName: string): void {
        this.componentLoadIndicator = componentName;
    }
}