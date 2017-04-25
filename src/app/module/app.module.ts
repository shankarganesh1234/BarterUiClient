import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "../app-component/app.component";
import {SearchService} from "../services/search.service";
import {CategoryService} from "../services/category.service";
import {ItemListComponent} from "../items/item-list.component";
import {CategoryComponent} from "../category/category.component";
import {AppRoutingModule} from "../routing/app-routing.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {LandingComponent} from "../landing/landing.component";
import {HeaderComponent} from "../header/header.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {Ng2PaginationModule} from "ng2-pagination";
import {ItemComponent} from "../item/create-item/item.component";
import {ItemService} from "../services/item.service";
import {ItemDetailComponent} from "../item/get-item/get-item.component";
import {InterestOptionsComponent} from "../interest/get-options/interest-options.component";
import {InterestService} from "../services/interest.service";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../services/login.service";
import {ErrorModalComponent} from "../errors/error-modal.component";
import {MyAccountComponent} from "../myaccount/myaccount.component";
import {UserService} from "../services/user.service";
import {MyAccountDetailComponent} from "../myaccount/myaccount-detail/myaccount-detail.component";
import {MyProfileComponent} from "../myaccount/myaccount-detail/my-profile/my-profile.component";
import {MyInterestsComponent} from "../myaccount/myaccount-detail/my-interests/my-interests.component";
import {MyItemsComponent} from "../myaccount/myaccount-detail/my-items/my-items.component";
import {MyOffersComponent} from "../myaccount/myaccount-detail/my-offers/my-offers.component";
import {MyReviewsComponent} from "../myaccount/myaccount-detail/my-reviews/my-reviews.component";
import {MyNotificationsComponent} from "../myaccount/myaccount-detail/my-notifications/my-notifications.component";
import {HomeComponent} from "../home/home.component";
import {FooterComponent} from "../footer/footer.component";


@NgModule({
    imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule,
        Ng2PaginationModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent,
                ItemListComponent,
                CategoryComponent,
                LandingComponent,
                HeaderComponent,
                SearchBarComponent,
                ItemComponent,
                ItemDetailComponent,
                InterestOptionsComponent,
                LoginComponent,
                ErrorModalComponent,
                MyAccountComponent,
                MyAccountDetailComponent,
                MyProfileComponent,
                MyInterestsComponent,
                MyItemsComponent,
                MyOffersComponent,
                MyReviewsComponent,
                MyNotificationsComponent,
                HomeComponent,
                FooterComponent],
    bootstrap: [LandingComponent],
    providers: [SearchService, CategoryService, ItemService, InterestService, LoginService, UserService]
})

export class AppModule {
}
