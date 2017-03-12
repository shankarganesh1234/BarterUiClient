import {Component} from "@angular/core";
import {SearchResponse} from "../search/search-response";


@Component({
    moduleId: module.id,
    selector: 'swap-landing',
    templateUrl: `landing.component.html`
})
export class LandingComponent {

    private searchResponse : SearchResponse;

    onNotify(searchResults:SearchResponse):void {
        console.log(searchResults.total);
        this.searchResponse = searchResults;
    }
}

