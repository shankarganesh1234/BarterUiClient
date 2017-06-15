
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InterestService} from "../services/interest.service";
import {Interest} from "../models/interest.model";
import {ChatInfo} from "../models/chat-info";
import {ChatService} from "../services/chat.service";
import {ChatHistory} from "../models/chat-history";
import {LoggedInUser} from "../storage-utils/loggedInUser";

declare const $:any;

@Component({
    moduleId: module.id,
    selector: 'swap-chat',
    templateUrl: `./chat.component.html`,
    styleUrls:['./chat.component.css', './chat-item.component.css']
})
export class ChatComponent extends LoggedInUser implements OnInit {

    appId: string = 'A462E51A-2201-420F-95DD-83FF72881871';
    sb: any;
    chatChannel: any;
    interest: Interest;
    chats: ChatInfo[] = [];
    isLoading: boolean = true;

    constructor(private route: ActivatedRoute,
                private interestService: InterestService,
                private chatService: ChatService) {
        super();
    }

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

        let currentUserId = this.getLoggedInUser().id;
        let otherUserId;
        if(currentUserId == this.interest.originalUser.userId)
            otherUserId = this.interest.interestedUser.userId;
        else
            otherUserId = this.interest.originalUser.userId;

        this.createChannel(currentUserId, otherUserId);
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
                          this.sb.GroupChannel.createChannelWithUserIds([user1, user2], true, name, null, null, null, (result: any) => {
                            if(result != null) {
                                this.chatChannel = result;
                                let uniqueChannelId = result.url;
                                let ChannelHandler = new this.sb.ChannelHandler();

                                ChannelHandler.onMessageReceived = function(channel: any, message: any){
                                    if(message != null) {
                                        let chatInfo: ChatInfo = this.createChatInfo(message._sender.userId, this.interest, message.message);
                                        chatInfo.id = this.getRandomString();
                                        this.chats.push(chatInfo);
                                        this.scrollToLatest();
                                    }
                                }.bind(this);

                                this.sb.addChannelHandler(uniqueChannelId, ChannelHandler);
                                console.log('channel created' + uniqueChannelId);
                                this.getChatHistory(uniqueChannelId);
                            } else {
                                console.log('got null result for create channel');
                            }
                        })
            }
        });
    }

    getChatHistory(channelId: string): void {

        this.chatService
            .getChatHistory(channelId)
            .subscribe(
                result => this.getChatHistorySuccess(result),
                error => console.log(error)
            );
    }

    getChatHistorySuccess(chatLogs: ChatHistory[]): void {

        this.isLoading = false;
        if(chatLogs == null || chatLogs.length <= 0)
            return;

        let chatInfo: ChatInfo;
        for(let chatLog of chatLogs) {
            chatInfo = this.createChatInfoFromHistory(chatLog);
            chatInfo.id = this.getRandomString();
            this.chats.push(chatInfo);
        }
        this.scrollToLatest();
    }

    createChatInfoFromHistory(chatLog: ChatHistory) {

        let chatInfo = new ChatInfo();
        if(chatLog.senderId != null) {

            let utcDate = new Date(chatLog.messageTimestamp).toUTCString();
            chatInfo.timestamp = utcDate;
            chatInfo.message = chatLog.message;

            if(chatLog.senderId == this.interest.originalUser.userId) {
                chatInfo.userImageUrl = this.interest.originalUser.imageUrl;
                chatInfo.userName = this.interest.originalUser.displayName;
            } else {
                chatInfo.userImageUrl = this.interest.interestedUser.imageUrl;
                chatInfo.userName = this.interest.interestedUser.displayName;
            }
        }
        return chatInfo;
    }


    sendMessage(messageBody: string): void {
        this.chatChannel.sendUserMessage(messageBody, null, null, (result: any) => {
            if(result != null) {

                let chatInfo: ChatInfo = this.createChatInfo(result._sender.userId, this.interest, messageBody);
                chatInfo.id = this.getRandomString();
                this.chats.push(chatInfo);
                this.scrollToLatest();
                $('#chatMessageInput').val('');
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

    /**
     * Gets a random string and assigns the id
     */
    getRandomString(): string {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    /**
     * Scroll to the last message sent or received
     */
    scrollToLatest(): void {

        setTimeout(function()
        {
            $(".chat-box-messages").animate({ scrollTop: $('.chat-box-messages').prop("scrollHeight")}, 1000);
            $('#chatMessageInput').val('');
        }, 500);
    }
}
