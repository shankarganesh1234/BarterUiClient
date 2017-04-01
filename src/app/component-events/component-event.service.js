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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var ComponentEventService = (function () {
    function ComponentEventService() {
        // Observable string sources
        this.searchBarEvent = new Subject_1.Subject();
        this.itemIdEvent = new Subject_1.Subject();
        this.interestCreationEvent = new Subject_1.Subject();
        this.userLoggedInEvent = new Subject_1.Subject();
        this.userLoggedOutEvent = new Subject_1.Subject();
        this.searchBar$ = this.searchBarEvent.asObservable();
        this.itemId$ = this.itemIdEvent.asObservable();
        this.interestCreated$ = this.interestCreationEvent.asObservable();
        this.userLoggedin$ = this.userLoggedInEvent.asObservable();
        this.userLoggedOut$ = this.userLoggedOutEvent.asObservable();
    }
    ComponentEventService.prototype.searchBarClicked = function (searchResponse) {
        this.searchBarEvent.next(searchResponse);
    };
    ComponentEventService.prototype.itemClicked = function (itemId) {
        this.itemIdEvent.next(itemId);
    };
    ComponentEventService.prototype.interestCreated = function (result) {
        this.interestCreationEvent.next(result);
    };
    ComponentEventService.prototype.userLoggedIn = function (result) {
        this.userLoggedInEvent.next(result);
    };
    ComponentEventService.prototype.userLoggedOut = function (result) {
        this.userLoggedOutEvent.next(result);
    };
    ComponentEventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ComponentEventService);
    return ComponentEventService;
}());
exports.ComponentEventService = ComponentEventService;
//# sourceMappingURL=component-event.service.js.map