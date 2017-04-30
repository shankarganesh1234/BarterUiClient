
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InterestService} from "../services/interest.service";
import {Interest} from "../models/interest.model";
import {ChatInfo} from "../models/chat-info";

@Component({
    moduleId: module.id,
    selector: 'swap-chat',
    templateUrl: `chat.component.html`,
    styleUrls:['chat.component.css', 'chat-item.component.css']
})
export class ChatComponent implements OnInit {

    appId: string = 'A462E51A-2201-420F-95DD-83FF72881871';
    sb: any;
    chatChannel: any;
    interest: Interest;
    chats: ChatInfo[] = [];

    constructor(private route: ActivatedRoute,
                private interestService: InterestService) {}

    ngOnInit() {
        let interestId = this.route.snapshot.params['interestId'];
        this.getInterestById(interestId);
    }

    getInterestById(interestId: string) {
        this.interestService
            .getInterestById(interestId)
            .subscribe(
                result => this.getInterestSuccess(result),
                error => console.log(error)
            );
    }

    getInterestSuccess(result: Interest): void {
        this.interest = result;
        this.initChat();
        this.createChannel(this.interest.originalUser.userId, this.interest.interestedUser.userId);
    }

    initChat(): void {
        // init sb
        this.sb = new SendBird({
            appId: this.appId
        });
    }

    createChannel(user1: string, user2: string): void {

        this.sb.connect(user1, (userOneResult:any) => {
            if(userOneResult != null) {
                console.log(userOneResult.userId + " connected");
                this.sb.connect(user2, (userTwoResult:any) => {
                    if(userTwoResult != null) {
                        console.log(userTwoResult.userId + " connected");

                            this.sb.GroupChannel.createChannelWithUserIds([user1, user2], true, name, null, null, null, (result: any) => {
                            if(result != null) {
                                this.chatChannel = result;
                                let uniqueChannelId = result.url;
                                let ChannelHandler = new this.sb.ChannelHandler();

                                ChannelHandler.onMessageReceived = function(channel: any, message: any){
                                    console.log(channel, message);
                                    if(message != null) {
                                        this.chats.push(this.createChatInfo(message._sender.userId, this.interest, message.message));
                                    }
                                }.bind(this);

                                this.sb.addChannelHandler(uniqueChannelId, ChannelHandler);
                                console.log('channel created' + uniqueChannelId);
                            } else {
                                console.log('got null result for create channel');
                            }
                        })
                    }
                });
            }
        });
    }

    sendMessage(messageBody: string): void {
        this.chatChannel.sendUserMessage(messageBody, null, null, (result: any) => {
            console.log(result);
            if(result != null) {
            this.chats.push(this.createChatInfo(result._sender.userId, this.interest, messageBody));
            }
        });
    }

    createChatInfo(userId: string, interest: Interest, message: string) : ChatInfo {
        let chatInfo = new ChatInfo();
        let dt = new Date();
        let utcDate = dt.toUTCString();

        if(userId != null) {
            if(userId == interest.originalUser.userId) {
                chatInfo.userImageUrl = interest.originalUser.imageUrl;
                chatInfo.userName = interest.originalUser.displayName;
                chatInfo.message = message;
                chatInfo.timestamp = utcDate;
            } else {
                chatInfo.userImageUrl = interest.interestedUser.imageUrl;
                chatInfo.userName = interest.interestedUser.displayName;
                chatInfo.message = message;
                chatInfo.timestamp = utcDate;
            }
        }
        return chatInfo;
    }
}