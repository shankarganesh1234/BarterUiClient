import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {LoggedInUser} from "../storage-utils/loggedInUser";
import {environment} from "../../environments/environment";
import {Feedback} from "../models/feedback";

@Injectable()
export class FeedbackService {

    private headers: Headers;
    private options: RequestOptions;
    private loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private http: Http) {

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    createFeedback(feedback: Feedback): Observable<boolean> {
        let headers =  new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this.loggedInUser.getAccessToken()
        });
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(feedback);
        return this.http.post(environment.feedbackUrl, body, options)
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