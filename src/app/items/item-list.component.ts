import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Router} from "@angular/router";
import {SearchResponse} from "../search/search-response";


@Component({
    moduleId: module.id,
    selector: 'swap-item-list',
    templateUrl: 'item-list.component.html',
    styleUrls: ['item-list.component.css']
})

export class ItemListComponent implements OnInit, OnChanges {

    @Input()
    searchResponse: SearchResponse;

    constructor(private router: Router) {
    };

    ngOnInit(): void {
        console.log("inside item list component");
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("on changes invoked");
    }
}