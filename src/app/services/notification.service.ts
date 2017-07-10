import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {environment} from "../../environments/environment";
import {LoggedInUser} from "../storage-utils/loggedInUser";
import {NotificationModel} from "../models/notification-model";


@Injectable()
export class NotificationService extends LoggedInUser {


    connection:WebSocket;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        super();
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        this.options = new RequestOptions({headers: this.headers});
    }

    getUnreadNotifications(userId: string): Observable<NotificationModel[]> {
        return this.http
            .get(environment.getUnreadNotifications + userId, this.options)
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

    /**
     * Get the web socket connection
     * @returns {WebSocket}
     */
    getWebSocket() {
        if(this.getLoggedInUser() != null && this.getLoggedInUser().id != null && this.getLoggedInUser().id != '') {
            this.connection = new WebSocket(environment.websocketNotificationUrl + this.getLoggedInUser().id)
        }
        return this.connection;
    }

    /**
     * initialize websocket for the user
     * @param connection
     */
    initWebSocket(connection:WebSocket) : void {
        connection.onopen = function () {
            console.log('Websocket opened successfully');
        };
        connection.onerror = function (error) {
            console.log('Error within init websocket: ' + error); //log errors
        };
        connection.onmessage = function (e) {
            console.log('Received From Server: ' + e.data); //log the received message
            return e.data;
        };
    }
}