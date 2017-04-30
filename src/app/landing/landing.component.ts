import {Component, OnDestroy, OnInit} from "@angular/core";
import {SearchResponse} from "../models/search-response";
import {ComponentEventService} from "../services/component-event.service";

@Component({
    moduleId: module.id,
    selector: 'swap-landing',
    templateUrl: `landing.component.html`,
    styleUrls: ['landing.component.css'],
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

