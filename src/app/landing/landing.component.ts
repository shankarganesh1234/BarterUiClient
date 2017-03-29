import {Component, OnDestroy, OnInit} from "@angular/core";
import {SearchResponse} from "../search/search-response";
import {ComponentEventService} from "../component-events/component-event.service";
import {Subscription} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'swap-landing',
    templateUrl: `landing.component.html`,
    providers: [ComponentEventService]
})
export class LandingComponent implements OnInit {

    private searchResponse : SearchResponse;
    private itemId: number;

    constructor(private componentEventService: ComponentEventService) {
    }

    ngOnInit(): void {

        this.componentEventService.searchBar$.subscribe(
            searchResults => {
                this.searchResponse = searchResults;
            });

        this.componentEventService.itemId$.subscribe(
            itemId => {
                this.itemId = itemId;
            });
    }
}

