import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {GlobalUrls} from "../../urls/url-values";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../user";
import {ItemDetail} from "../../item/models/item-detail.model";

@Injectable()
export class UserService {

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

    getUserProfile(userId: number): Observable<User> {
        return this.http.get(this.urls.userProfileUrl + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItemsForUser(userId: number): Observable<ItemDetail[]> {
        return this.http.get(this.urls.userItemsUrl + userId, this.options)
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