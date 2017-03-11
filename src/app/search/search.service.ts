import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SearchResponse } from './search-response';
import { Item } from '../item/item';
// Import RxJs required methods
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {

  private headers: Headers;
  private options: RequestOptions;
  private searchUrl : string;
  private autocompleteUrl : string;

	constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
    this.searchUrl = "http://localhost:8080/SwapServerSide/search/item";
    this.autocompleteUrl = "http://localhost:8080/SwapServerSide/search/autocomplete/";
  }
	
	search(queryString: string): Observable<SearchResponse>  {
    console.log(this.searchUrl);
    console.log(JSON.stringify({query: queryString}));
    let body = JSON.stringify({query: queryString});
    return this.http
        .post(this.searchUrl, body, this.options)
        .map(this.extractData)
        .catch(this.handleError);
 }

 autoComplete(term: string): Observable<Item[]>  {
    console.log(this.searchUrl);
    console.log(JSON.stringify({query: term}));
    let body = JSON.stringify({query: term});
    return this.http
        .get(this.autocompleteUrl + term, this.options)
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