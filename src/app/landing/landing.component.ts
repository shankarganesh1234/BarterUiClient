import {Component, OnDestroy, OnInit} from "@angular/core";
import {SearchResponse} from "../search/search-response";
import {ComponentEventService} from "../component-events/component-event.service";

@Component({
    moduleId: module.id,
    selector: 'swap-landing',
    templateUrl: `landing.component.html`,
    providers: [ComponentEventService]
})
export class LandingComponent implements OnInit {

    private searchResponse : SearchResponse;

    constructor(private componentEventService: ComponentEventService) {
    }

    ngOnInit(): void {

        this.componentEventService.searchBar$.subscribe(
            searchResults => {
                this.searchResponse = searchResults;
            });
     }
}

