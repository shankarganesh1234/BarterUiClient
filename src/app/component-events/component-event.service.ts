import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {SearchResponse} from "../search/search-response";


@Injectable()
export class ComponentEventService {

    // Observable string sources
    private searchBarEvent = new Subject<SearchResponse>();
    private itemIdEvent = new Subject<number>();

    searchBar$ = this.searchBarEvent.asObservable();
    itemId$ = this.itemIdEvent.asObservable();

    searchBarClicked(searchResponse: SearchResponse) {
        this.searchBarEvent.next(searchResponse);
    }
    itemClicked(itemId: number) {
        this.itemIdEvent.next(itemId);
    }
}