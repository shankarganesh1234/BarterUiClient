"use strict";
var GlobalUrls = (function () {
    function GlobalUrls() {
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
        this.getInterestsForUser = "http://localhost:8080/customServer/interest/interesteduser/";
        this.deleteInterestUrl = "http://localhost:8080/customServer/interest/";
        this.userItemDeleteUrl = "http://localhost:8080/customServer/listing/";
        this.getOffersForUser = "http://localhost:8080/customServer/interest/originaluser/";
        this.createChatDetails = "http://localhost:8080/customServer/chat/";
        this.getChatForOriginalUser = "http://localhost:8080/customServer/chat/originaluser/";
        this.getChatForInterestedUser = "http://localhost:8080/customServer/chat/interestedUser/";
    }
    return GlobalUrls;
}());
exports.GlobalUrls = GlobalUrls;
//# sourceMappingURL=url-values.js.map