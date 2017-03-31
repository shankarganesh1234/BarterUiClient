import {Injectable, OnInit} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Item} from "../models/item.model";
import {GlobalUrls} from "../../urls/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ItemDetail} from "../models/item-detail.model";

declare const FB:any;

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
        this.isUserLoggedIn();
    }

    createItem(itemRequest: Item): Observable<Item> {
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

    // TODO: temporary, remove this. This is getting repeated too many times
    isUserLoggedIn() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response);
        });
    }

    statusChangeCallback(resp: any) {
        if (resp.status === 'connected') {
            console.log('inside connected');
            this.headers.append("Authorization", resp.authResponse.accessToken);
        }else if (resp.status === 'not_authorized') {
            console.log('not authorized');
        }else {
            console.log('unknown');
        }
    };
}