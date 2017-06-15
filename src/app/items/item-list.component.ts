import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {SearchResponse} from "../models/search-response";
import {SearchBar} from "../models/search-bar";
import {SearchService} from "../services/search.service";
import {ComponentEventService} from "../services/component-event.service";
import {ActivatedRoute, Router} from "@angular/router";

declare const AOS:any;

@Component({
    moduleId: module.id,
    selector: 'swap-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit, OnChanges {

    searchResponse: SearchResponse;

    searchRequest: SearchBar;

    constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService, private componentEventService: ComponentEventService){
        AOS.init();
        route.params.subscribe(val => {
            this.invokeSearchService();
        });

    }

    ngOnInit(): void {
        //this.invokeSearchService();
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    invokeSearchService(): void {
        let searchQuery = this.route.snapshot.params['search'];
        let zip = this.route.snapshot.params['zip'];
        let categoryName = this.route.snapshot.params['categoryName'];
        let distance = this.route.snapshot.params['distance'];
        this.searchRequest = new SearchBar();
        this.searchRequest.zip = zip;
        this.searchRequest.search = searchQuery;
        this.searchRequest.categoryName = categoryName;
        this.searchRequest.distance = distance;

        this.searchService
            .search(this.searchRequest)
            .subscribe(
                result => this.searchResponse = result,
                error => console.log(error)
            );
    }

    /**
     * Invoked when load more button is clicked
     */
    loadMore(): void {
        this.searchRequest.start = this.searchRequest.start + this.searchRequest.limit;
        this.searchService
            .search(this.searchRequest)
            .subscribe(
                result => this.handleLoadMore(result),
                error => console.log(error)
            );
    }

    /**
     * Handle the search response after load more button is clicked
     * @param result
     */
    handleLoadMore(result: SearchResponse): void {
        this.searchResponse.start = result.start;
        this.searchResponse.items.push.apply(this.searchResponse.items, result.items);
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

    routeToItemDetail(itemId: number): void{
        this.router.navigate(['/item', itemId]);
    }
}
