export class GlobalUrls {

    autocompleteUrl: string;
    searchUrl: string;
    googleZipUrl: string;
    serverName: string;


    constructor() {
        this.serverName = "customServer";
        this.searchUrl = "http://localhost:8080/" + this.serverName + "/search/item";
        this.autocompleteUrl = "http://localhost:8080/" + this.serverName + "/search/autocomplete/";
        this.googleZipUrl = "http://maps.googleapis.com/maps/api/geocode/json?";
    }
}