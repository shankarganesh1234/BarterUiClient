import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {GlobalUrls} from "../utils/url-values";
import {ChatDetails} from "../models/chat-details";

@Injectable()
export class ChatService {

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

    createChatDetails(chatDetails: ChatDetails): Observable<void> {
        let body = JSON.stringify(chatDetails);
        return this.http.post(this.urls.createChatDetails, body, this.options)
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