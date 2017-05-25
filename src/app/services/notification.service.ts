import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {environment} from "../../environments/environment";
import {LoggedInUser} from "../storage-utils/loggedInUser";

@Injectable()
export class NotificationService extends LoggedInUser {

    connection:WebSocket = new WebSocket(environment.websocketNotificationUrl + this.getLoggedInUser().id);

    /**
     * Get the web socket connection
     * @returns {WebSocket}
     */
    getWebSocket() {
        return this.connection;
    }

    /**
     * initialize websocket for the user
     * @param connection
     */
    initWebSocket(connection:WebSocket) : void {
        console.log('inside initWebSocket');
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