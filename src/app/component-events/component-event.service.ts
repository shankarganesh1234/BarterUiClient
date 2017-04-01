import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {SearchResponse} from "../search/search-response";
import {User} from "../user/user";


@Injectable()
export class ComponentEventService {

    // Observable string sources
    private searchBarEvent = new Subject<SearchResponse>();
    private itemIdEvent = new Subject<number>();
    private interestCreationEvent = new Subject<boolean>();
    private userLoggedInEvent = new Subject<User>();


    searchBar$ = this.searchBarEvent.asObservable();
    itemId$ = this.itemIdEvent.asObservable();
    interestCreated$ = this.interestCreationEvent.asObservable();
    userLoggedin$ = this.userLoggedInEvent.asObservable();

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
}