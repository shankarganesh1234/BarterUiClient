import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {NotificationService} from "../../../services/notification.service";

@Component({
    moduleId: module.id,
    selector: 'swap-mynotifications',
    templateUrl: 'my-notifications.component.html',
    styleUrls: ['my-notifications.component.css']
})

export class MyNotificationsComponent extends LoggedInUser implements OnInit {

    constructor(private notificationService: NotificationService) {
        super();
    }

    ngOnInit(): void {

    }
}