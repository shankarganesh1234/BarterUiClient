import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {CreateInterest} from "../models/create-interest.model";
import {Interest} from "../models/interest.model";
import {Interests} from "../models/interests.model";
import {environment} from "../../environments/environment";

@Injectable()
export class InterestService {

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    getInterestById(interestId: string): Observable<Interest> {
        return this.http.get(environment.getInterestById + interestId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createInterest(createInterest: CreateInterest): Observable<boolean> {
        let body = JSON.stringify(createInterest);
        return this.http.post(environment.createInterestUrl, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getInterestsForUser(userId: string): Observable<Interests> {
        return this.http.get(environment.getInterestsForUser + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getOffersForUser(userId: string): Observable<Interests> {
        return this.http.get(environment.getOffersForUser + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllInterestsAndOffersForUser(userId: string): Observable<Interests> {
        return this.http.get(environment.getAllInterestsAndOffers + userId, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getInterests(userId: string, itemId: string, isOwner: boolean): Observable<Interests> {
        return this.http.get(environment.getInterests + 'user=' + userId + '&item=' + itemId + '&isowner=' + isOwner, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteInterests(interestId: number): Observable<void> {
        return this.http.delete(environment.deleteInterestUrl + interestId, this.options)
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