"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("../app-component/app.component");
var search_service_1 = require("../services/search.service");
var category_service_1 = require("../services/category.service");
var item_list_component_1 = require("../items/item-list.component");
var category_component_1 = require("../category/category.component");
var app_routing_module_1 = require("../routing/app-routing.module");
var http_1 = require("@angular/http");
var landing_component_1 = require("../landing/landing.component");
var header_component_1 = require("../header/header.component");
var search_bar_component_1 = require("../search-bar/search-bar.component");
var ng2_pagination_1 = require("ng2-pagination");
var item_component_1 = require("../item/create-item/item.component");
var item_service_1 = require("../services/item.service");
var get_item_component_1 = require("../item/get-item/get-item.component");
var interest_options_component_1 = require("../interest/get-options/interest-options.component");
var interest_service_1 = require("../services/interest.service");
var login_component_1 = require("../login/login.component");
var login_service_1 = require("../services/login.service");
var error_modal_component_1 = require("../errors/error-modal.component");
var myaccount_component_1 = require("../myaccount/myaccount.component");
var user_service_1 = require("../services/user.service");
var myaccount_detail_component_1 = require("../myaccount/myaccount-detail/myaccount-detail.component");
var my_profile_component_1 = require("../myaccount/myaccount-detail/my-profile/my-profile.component");
var my_interests_component_1 = require("../myaccount/myaccount-detail/my-interests/my-interests.component");
var my_items_component_1 = require("../myaccount/myaccount-detail/my-items/my-items.component");
var my_offers_component_1 = require("../myaccount/myaccount-detail/my-offers/my-offers.component");
var my_reviews_component_1 = require("../myaccount/myaccount-detail/my-reviews/my-reviews.component");
var my_notifications_component_1 = require("../myaccount/myaccount-detail/my-notifications/my-notifications.component");
var home_component_1 = require("../home/home.component");
var footer_component_1 = require("../footer/footer.component");
var chat_component_1 = require("../chat/chat.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ng2_pagination_1.Ng2PaginationModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [app_component_1.AppComponent,
                item_list_component_1.ItemListComponent,
                category_component_1.CategoryComponent,
                landing_component_1.LandingComponent,
                header_component_1.HeaderComponent,
                search_bar_component_1.SearchBarComponent,
                item_component_1.ItemComponent,
                get_item_component_1.ItemDetailComponent,
                interest_options_component_1.InterestOptionsComponent,
                login_component_1.LoginComponent,
                error_modal_component_1.ErrorModalComponent,
                myaccount_component_1.MyAccountComponent,
                myaccount_detail_component_1.MyAccountDetailComponent,
                my_profile_component_1.MyProfileComponent,
                my_interests_component_1.MyInterestsComponent,
                my_items_component_1.MyItemsComponent,
                my_offers_component_1.MyOffersComponent,
                my_reviews_component_1.MyReviewsComponent,
                my_notifications_component_1.MyNotificationsComponent,
                home_component_1.HomeComponent,
                footer_component_1.FooterComponent,
                chat_component_1.ChatComponent],
            bootstrap: [landing_component_1.LandingComponent],
            providers: [search_service_1.SearchService, category_service_1.CategoryService, item_service_1.ItemService, interest_service_1.InterestService, login_service_1.LoginService, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map