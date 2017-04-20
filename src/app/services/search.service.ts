import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {SearchResponse} from "../models/search-response";
import {Item} from "../models/item.model";
import {GlobalUrls} from "../utils/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {SearchBar} from "../models/search-bar";

@Injectable()
export class SearchService {

    private headers: Headers;
    private options: RequestOptions;
    private urls: GlobalUrls;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
        this.urls = new GlobalUrls();
    }

    search(searchRequest: SearchBar): Observable<SearchResponse> {
        let body = JSON.stringify(searchRequest);
        return this.http
            .post(this.urls.searchUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    autoComplete(term: string): Observable<Item[]> {
        let body = JSON.stringify({query: term});
        return this.http
            .get(this.urls.autocompleteUrl + term, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}