import {Component} from "@angular/core";
import {SearchResponse} from "../search/search-response";

@Component({
    moduleId: module.id,
    selector: 'swap-landing',
    templateUrl: `landing.component.html`
})
export class LandingComponent {

    private searchResponse : SearchResponse;
    private itemId: number;

    onNotify(searchResults:SearchResponse, itemId: number):void {
        if(typeof searchResults === 'object') {
            this.searchResponse = searchResults;
        } else if(typeof searchResults === 'number') {
            this.itemId = itemId;
        }
    }
}

