import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Item} from "../models/item.model";
import {GlobalUrls} from "../utils/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ItemDetail} from "../models/item-detail.model";
import {LoggedInUser} from "../storage-utils/loggedInUser";
import {environment} from "../../environments/environment";

@Injectable()
export class ItemService {

    private headers: Headers;
    private options: RequestOptions;
    private urls: GlobalUrls;
    private loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private http: Http) {

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
        this.urls = new GlobalUrls();
    }

    createItem(itemRequest: Item): Observable<Item> {
        let headers =  new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.loggedInUser.getAccessToken()
        });
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(itemRequest);
        return this.http.post(environment.createItemUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createImageForItem(itemImageFormData: FormData): Observable<any> {
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.createItemImageUrl, itemImageFormData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItem(itemId: number): Observable<ItemDetail> {
        return this.http.get(environment.getItemUrl + itemId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItemsByUser(userId: string): Observable<ItemDetail[]> {
        return this.http.get(environment.getItemByUserUrl + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteItem(itemId: number): Observable<void> {
        return this.http.delete(environment.userItemDeleteUrl + itemId, this.options)
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