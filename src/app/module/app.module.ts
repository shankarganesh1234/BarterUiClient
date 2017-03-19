import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app-component/app.component";
import {SearchService} from "../search/search.service";
import {CategoryService} from "../category/category.service";
import {ItemListComponent} from "../items/item-list.component";
import {CategoryComponent} from "../category/category.component";
import {AppRoutingModule} from "../routing/app-routing.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {LandingComponent} from "../landing/landing.component";
import {HeaderComponent} from "../header/header.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {Ng2PaginationModule} from 'ng2-pagination';
import {ItemComponent} from "../item/item.component";
import { ReactiveFormsModule } from '@angular/forms';
import {ItemService} from "../item/item.service";


@NgModule({
    imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule,
        Ng2PaginationModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent, ItemListComponent, CategoryComponent, LandingComponent, HeaderComponent, SearchBarComponent, ItemComponent],
    bootstrap: [LandingComponent],
    providers: [SearchService, CategoryService, ItemService]
})

export class AppModule {
}
