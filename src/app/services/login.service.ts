import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {LoginRequest} from "../models/login-request.model";
import {LoginResponse} from "../models/login-response.model";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {FbLongLivedTokenModel} from "../models/fb-longlivedtoken.model";

@Injectable()
export class LoginService {

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    userLogin(loginRequest: LoginRequest): Observable<User> {
        let body = JSON.stringify(loginRequest);
        return this.http.post(environment.loginUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLongLivedToken(request: FbLongLivedTokenModel): Observable<string> {
        let body = JSON.stringify(request);
        return this.http.put(environment.longLivedTokenUrl, body, this.options)
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