import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Item} from "../models/item.model";
import {GlobalUrls} from "../../urls/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ItemDetail} from "../models/item-detail.model";
import {LoggedInUser} from "../../user/loggedInUser";

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
        return this.http.post(this.urls.createItemUrl, body, options)
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

    getItem(itemId: number): Observable<ItemDetail> {
        return this.http.get(this.urls.getItemUrl + itemId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItemsByUser(userId: number): Observable<ItemDetail[]> {
        return this.http.get(this.urls.getItemByUserUrl + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteItem(itemId: number): Observable<void> {
        return this.http.delete(this.urls.userItemDeleteUrl + itemId, this.options)
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