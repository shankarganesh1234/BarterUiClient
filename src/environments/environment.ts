// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env:prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  searchUrl : "http://localhost:8080/customServer/search/item",
  autocompleteUrl : "http://localhost:8080/customServer/search/autocomplete/",
  googleZipUrl : "http://maps.googleapis.com/maps/api/geocode/json?",
  createItemUrl : "http://localhost:8080/customServer/listing",
  createItemImageUrl : "http://localhost:8080/customServer/image/upload",
  getItemUrl : "http://localhost:8080/customServer/listing/",
  getItemByUserUrl : "http://localhost:8080/customServer/listing/user/",
  createInterestUrl : "http://localhost:8080/customServer/interest/",
  loginUrl : "http://localhost:8080/customServer/login/facebook",
  userProfileUrl : "http://localhost:8080/customServer/userprofile/",
  getInterestsForUser : "http://localhost:8080/customServer/interest/interesteduser/",
  deleteInterestUrl : "http://localhost:8080/customServer/interest/",
  userItemDeleteUrl : "http://localhost:8080/customServer/listing/",
  getOffersForUser : "http://localhost:8080/customServer/interest/originaluser/",
  createChatDetails : "http://localhost:8080/customServer/chat/",
  getChatForOriginalUser : "http://localhost:8080/customServer/chat/originaluser/",
  getChatForInterestedUser : "http://localhost:8080/customServer/chat/interestedUser/",
  getInterests : "http://localhost:8080/customServer/interest?",
  getInterestById : "http://localhost:8080/customServer/interest/",
  getChatHistory: "http://localhost:8080/customServer/chat/history?channelId="
};
