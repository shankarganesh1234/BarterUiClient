export class GlobalUrls {

    autocompleteUrl: string;
    searchUrl: string;
    googleZipUrl: string;
    createItemUrl: string;
    createItemImageUrl: string;
    getItemUrl: string;
    getItemByUserUrl: string;
    createInterestUrl: string;
    getInterestsForUser: string;
    deleteInterestUrl: string;
    loginUrl: string;
    userProfileUrl:string;
    userItemsUrl: string;
    userItemDeleteUrl: string;
    serverName: string;

    constructor() {
        this.serverName = "customServer";
        this.searchUrl = "http://localhost:8080/" + this.serverName + "/search/item";
        this.autocompleteUrl = "http://localhost:8080/" + this.serverName + "/search/autocomplete/";
        this.googleZipUrl = "http://maps.googleapis.com/maps/api/geocode/json?";
        this.createItemUrl = "http://localhost:8080/customServer/listing";
        this.createItemImageUrl = "http://localhost:8080/customServer/image/upload";
        this.getItemUrl = "http://localhost:8080/customServer/listing/";
        this.getItemByUserUrl = "http://localhost:8080/customServer/listing/user/";
        this.createInterestUrl = "http://localhost:8080/customServer/interest/";
        this.loginUrl = "http://localhost:8080/customServer/login/facebook";
        this.userProfileUrl = "http://localhost:8080/customServer/userprofile/";
        this.userItemsUrl = "http://localhost:8080/customServer/listing/user/";
        this.getInterestsForUser = "http://localhost:8080/customServer/interest/interesteduser/";
        this.deleteInterestUrl = "http://localhost:8080/customServer/interest/";
        this.userItemDeleteUrl = "http://localhost:8080/customServer/listing/";
    }
}