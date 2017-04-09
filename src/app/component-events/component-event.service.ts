import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {SearchResponse} from "../search/search-response";
import {User} from "../user/user";
import {ItemDetail} from "../item/models/item-detail.model";


@Injectable()
export class ComponentEventService {

    // Observable string sources
    private searchBarEvent = new Subject<SearchResponse>();
    private itemIdEvent = new Subject<number>();
    private interestCreationEvent = new Subject<boolean>();
    private userLoggedInEvent = new Subject<User>();
    private userLoggedOutEvent = new Subject<boolean>();
    private itemObjectEvent = new Subject<ItemDetail>();


    searchBar$ = this.searchBarEvent.asObservable();
    itemId$ = this.itemIdEvent.asObservable();
    interestCreated$ = this.interestCreationEvent.asObservable();
    userLoggedin$ = this.userLoggedInEvent.asObservable();
    userLoggedOut$ = this.userLoggedOutEvent.asObservable();
    itemObjectEvent$ = this.itemObjectEvent.asObservable();

    passItemObject(itemDetail: ItemDetail) {
        this.itemObjectEvent.next(itemDetail);
    }

    searchBarClicked(searchResponse: SearchResponse) {
        this.searchBarEvent.next(searchResponse);
    }
    itemClicked(itemId: number) {
        this.itemIdEvent.next(itemId);
    }
    interestCreated(result: boolean) {
        this.interestCreationEvent.next(result);
    }
    userLoggedIn(result: User) {
        this.userLoggedInEvent.next(result);
    }
    userLoggedOut(result: boolean) {
        this.userLoggedOutEvent.next(result);
    }

}