"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var interest_service_1 = require("../services/interest.service");
var chat_info_1 = require("../models/chat-info");
var ChatComponent = (function () {
    function ChatComponent(route, interestService) {
        this.route = route;
        this.interestService = interestService;
        this.appId = 'A462E51A-2201-420F-95DD-83FF72881871';
        this.chats = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        var interestId = this.route.snapshot.params['interestId'];
        this.getInterestById(interestId);
    };
    ChatComponent.prototype.getInterestById = function (interestId) {
        var _this = this;
        this.interestService
            .getInterestById(interestId)
            .subscribe(function (result) { return _this.getInterestSuccess(result); }, function (error) { return console.log(error); });
    };
    ChatComponent.prototype.getInterestSuccess = function (result) {
        this.interest = result;
        this.initChat();
        this.createChannel(this.interest.originalUser.userId, this.interest.interestedUser.userId);
    };
    ChatComponent.prototype.initChat = function () {
        // init sb
        this.sb = new SendBird({
            appId: this.appId
        });
    };
    ChatComponent.prototype.createChannel = function (user1, user2) {
        var _this = this;
        this.sb.connect(user1, function (userOneResult) {
            if (userOneResult != null) {
                console.log(userOneResult.userId + " connected");
                _this.sb.connect(user2, function (userTwoResult) {
                    if (userTwoResult != null) {
                        console.log(userTwoResult.userId + " connected");
                        _this.sb.GroupChannel.createChannelWithUserIds([user1, user2], true, name, null, null, null, function (result) {
                            if (result != null) {
                                _this.chatChannel = result;
                                var uniqueChannelId = result.url;
                                var ChannelHandler = new _this.sb.ChannelHandler();
                                ChannelHandler.onMessageReceived = function (channel, message) {
                                    console.log(channel, message);
                                    if (message != null) {
                                        this.chats.push(this.createChatInfo(message._sender.userId, this.interest, message.message));
                                    }
                                }.bind(_this);
                                _this.sb.addChannelHandler(uniqueChannelId, ChannelHandler);
                                console.log('channel created' + uniqueChannelId);
                            }
                            else {
                                console.log('got null result for create channel');
                            }
                        });
                    }
                });
            }
        });
    };
    ChatComponent.prototype.sendMessage = function (messageBody) {
        var _this = this;
        this.chatChannel.sendUserMessage(messageBody, null, null, function (result) {
            console.log(result);
            if (result != null) {
                _this.chats.push(_this.createChatInfo(result._sender.userId, _this.interest, messageBody));
            }
        });
    };
    ChatComponent.prototype.createChatInfo = function (userId, interest, message) {
        var chatInfo = new chat_info_1.ChatInfo();
        var dt = new Date();
        var utcDate = dt.toUTCString();
        if (userId != null) {
            if (userId == interest.originalUser.userId) {
                chatInfo.userImageUrl = interest.originalUser.imageUrl;
                chatInfo.userName = interest.originalUser.displayName;
                chatInfo.message = message;
                chatInfo.timestamp = utcDate;
            }
            else {
                chatInfo.userImageUrl = interest.interestedUser.imageUrl;
                chatInfo.userName = interest.interestedUser.displayName;
                chatInfo.message = message;
                chatInfo.timestamp = utcDate;
            }
        }
        return chatInfo;
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-chat',
            templateUrl: "chat.component.html",
            styleUrls: ['chat.component.css', 'chat-item.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, interest_service_1.InterestService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map