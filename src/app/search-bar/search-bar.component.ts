import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {SearchService} from "../search/search.service";
import {SearchResponse} from "../search/search-response";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {Item} from "../item/models/item.model";
import {SearchBar} from "./search-bar";
import {ComponentEventService} from "../component-events/component-event.service";

@Component({
    moduleId: module.id,
    selector: 'swap-search-bar',
    templateUrl: `search-bar.component.html`,
    styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    observableTitles: Observable<Item[]>;

    private searchQueries = new Subject<string>();

    constructor(private searchService: SearchService, private componentEventService: ComponentEventService) {
    }

    searchBarModel:SearchBar;

    autocomplete(term: string): void {
        this.searchQueries.next(term);
    }

    ngOnInit(): void {
        this.observableTitles = this.searchQueries
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.searchService.autoComplete(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Item[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Item[]>([]);
            });
        let postalCode:string = "";
        if(localStorage.getItem("postal_code") != null) {
            postalCode = localStorage.getItem("postal_code");
        }
        this.searchBarModel = new SearchBar();
        this.searchBarModel.search = "";
        this.searchBarModel.zip = postalCode;
    }


    search(searchBarModel: SearchBar): void {

        localStorage.setItem("postal_code", searchBarModel.zip);
        this.searchService
            .search(searchBarModel)
            .subscribe(
                result => this.success(result),
                error => console.log(error)
            );
    }

    success(result: any): void {
        this.componentEventService.searchBarClicked(result);
     }
}

