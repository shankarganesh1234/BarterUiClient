import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Item} from "../item/item.model";
import {GlobalUrls} from "../urls/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class ItemService {

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

    createItem(itemRequest: Item): Observable<Item> {
        console.log(JSON.stringify(itemRequest));
        let body = JSON.stringify(itemRequest);
        return this.http.post(this.urls.createItemUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createImageForItem(itemImageFormData: FormData): Observable<any> {
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.urls.createItemImageUrl, itemImageFormData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItem(itemId: number): Observable<Item> {
        console.log(JSON.stringify(itemId));
        return this.http.get(this.urls.createItemUrl + itemId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log("create item success");
        return body || {};
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}