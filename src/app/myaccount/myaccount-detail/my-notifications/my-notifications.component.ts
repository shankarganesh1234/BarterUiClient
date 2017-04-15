import {Component, OnInit} from "@angular/core";
import {LoggedInUser} from "../../../user/loggedInUser";
import {ComponentEventService} from "../../../component-events/component-event.service";
import {User} from "../../../user/user";

@Component({
    moduleId: module.id,
    selector: 'swap-mynotifications',
    templateUrl: 'my-notifications.component.html'
})

export class MyNotificationsComponent extends LoggedInUser implements OnInit {

    isLoggedIn: boolean = false;
    user: User;
    loggedInUser: LoggedInUser = new LoggedInUser();

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

        this.initChat();
    }

    initChat(): void {
        // init sb
        let sb = new SendBird({
            appId: '766F9D2A-66CF-49C9-B9E7-F837D73E08B3'
        });
        let userId = this.loggedInUser.getLoggedInUser().id;

        // connect user -> sb
        sb.connect(userId, (result:any) => {
            console.log('sb connect : ' + result);
            //create channel
            if(userId == '10211509441763463') {
                  sb.GroupChannel.createChannelWithUserIds(['10155782090995961'], true, name, null, null, null, (result: any) => {
                      console.log('sb create channel : ' + result);

                      let uniqueChannelId = result.url;
                      let ChannelHandler = new sb.ChannelHandler();
                      ChannelHandler.onMessageReceived = function(channel, message){
                          console.log(channel, message);
                      };
                      sb.addChannelHandler(uniqueChannelId, ChannelHandler);
                      // send message
                      let message = 'Hi this is Shankar';
                      result.sendUserMessage(message, null, null, (result: any) => {
                          console.log('sb message sent Shankar' + result);
                      });
                  });
            } else if(userId == '10155782090995961') {
                sb.GroupChannel.createChannelWithUserIds(['10211509441763463'], true, name, null, null, null, (result: any) => {
                    console.log('sb create channel : ' + result);

                    let uniqueChannelId = result.url;
                    let ChannelHandler = new sb.ChannelHandler();
                    ChannelHandler.onMessageReceived = function(channel, message){
                        console.log(channel, message);
                    };
                    sb.addChannelHandler(uniqueChannelId, ChannelHandler);
                    // send message
                    let message = 'Hi this is Manaswini';
                    result.sendUserMessage(message, null, null, (result: any) => {
                        console.log('sb message sent Manaswini' + result);
                    });
                });
            }
        });

        // add Channel Handler


    }
}