import {Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, OnDestroy} from "@angular/core";
import {SearchResponse} from "../search/search-response";
import {SearchBar} from "../search-bar/search-bar";
import {SearchService} from "../search/search.service";
import {ComponentEventService} from "../component-events/component-event.service";


@Component({
    moduleId: module.id,
    selector: 'swap-item-list',
    templateUrl: 'item-list.component.html',
    styleUrls: ['item-list.component.css']
})

export class ItemListComponent implements OnInit, OnChanges {

    @Input()
    searchResponse: SearchResponse;

    searchRequest: SearchBar;

    constructor(private searchService: SearchService, private componentEventService: ComponentEventService){
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges) {

    }

    paginatedResults(page: number, limit: number, query: string, zip: string) {

        this.searchRequest = new SearchBar();
        this.searchRequest.zip = zip;
        this.searchRequest.search = query;
        this.searchRequest.limit = limit;
        this.searchRequest.page = page;
        if(page === 1) {
            this.searchRequest.start = 0;
        } else {
            this.searchRequest.start = ((page - 1) * limit) + 1;
        }
        this.searchService
            .search(this.searchRequest)
            .subscribe(
                result => this.success(result),
                error => console.log(error)
            );
    }

    success(result: any): void {
        this.searchResponse = result;
    }

    emitItemId(itemId: number): void{
        this.componentEventService.itemClicked(itemId);
    }
}