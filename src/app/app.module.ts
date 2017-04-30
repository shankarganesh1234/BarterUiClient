import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {ItemListComponent} from "./items/item-list.component";
import {CategoryComponent} from "./category/category.component";
import {LandingComponent} from "./landing/landing.component";
import {HeaderComponent} from "./header/header.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {ItemComponent} from "./item/create-item/item.component";
import {ItemDetailComponent} from "./item/get-item/get-item.component";
import {InterestOptionsComponent} from "./interest/get-options/interest-options.component";
import {LoginComponent} from "./login/login.component";
import {ErrorModalComponent} from "./errors/error-modal.component";
import {MyAccountComponent} from "./myaccount/myaccount.component";
import {MyAccountDetailComponent} from "./myaccount/myaccount-detail/myaccount-detail.component";
import {MyProfileComponent} from "./myaccount/myaccount-detail/my-profile/my-profile.component";
import {MyInterestsComponent} from "./myaccount/myaccount-detail/my-interests/my-interests.component";
import {MyItemsComponent} from "./myaccount/myaccount-detail/my-items/my-items.component";
import {MyOffersComponent} from "./myaccount/myaccount-detail/my-offers/my-offers.component";
import {MyReviewsComponent} from "./myaccount/myaccount-detail/my-reviews/my-reviews.component";
import {MyNotificationsComponent} from "./myaccount/myaccount-detail/my-notifications/my-notifications.component";
import {HomeComponent} from "./home/home.component";
import {FooterComponent} from "./footer/footer.component";
import {ChatComponent} from "./chat/chat.component";
import {SearchService} from "./services/search.service";
import {CategoryService} from "./services/category.service";
import {ItemService} from "./services/item.service";
import {InterestService} from "./services/interest.service";
import {LoginService} from "./services/login.service";
import {UserService} from "./services/user.service";
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import {MyNewComponentComponent} from "./my-new-component/my-new-component.component";

@NgModule({
  declarations: [
    AppComponent,
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
    FooterComponent,
    ChatComponent,
    TestcomponentComponent,
    MyNewComponentComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [SearchService, CategoryService, ItemService, InterestService, LoginService, UserService],
  bootstrap: [LandingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // add this!
})
export class AppModule { }