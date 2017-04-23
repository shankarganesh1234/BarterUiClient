import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../storage-utils/loggedInUser";
import {ComponentEventService} from "../../../services/component-event.service";
import {User} from "../../../models/user";
import {InterestService} from "../../../services/interest.service";

@Component({
    moduleId: module.id,
    selector: 'swap-mynotifications',
    templateUrl: 'my-notifications.component.html',
    styleUrls: ['my-notifications.component.css', 'custom.css']
})

export class MyNotificationsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    loggedInUser: LoggedInUser = new LoggedInUser();
    appId: string = 'A462E51A-2201-420F-95DD-83FF72881871';
    sb: any;
    chatChannel: any;

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

        this.initChat();
    }

    createChannel(chatWithUser: string): void {
        let userId = this.loggedInUser.getLoggedInUser().id;

        this.sb.connect(userId, (result:any) => {
            console.log('sb connect : ' + result);
            this.sb.GroupChannel.createChannelWithUserIds([userId, chatWithUser], true, name, null, null, null, (result: any) => {

                this.chatChannel = result;
                let uniqueChannelId = result.url;
                let ChannelHandler = new this.sb.ChannelHandler();
                ChannelHandler.onMessageReceived = function(channel: any, message: any){
                    console.log(channel, message);
                };
                this.sb.addChannelHandler(uniqueChannelId, ChannelHandler);
            });
        });
    }

    sendMessage(messageBody: string): void {
        this.chatChannel.sendUserMessage(messageBody, null, null, (result: any) => {
            console.log('sb message sent Shankar' + result);
        });
    }

    initChat(): void {
        // init sb
        this.sb = new SendBird({
            appId: this.appId
        });
    }
}