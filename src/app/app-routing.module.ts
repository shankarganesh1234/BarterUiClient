import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ItemListComponent} from "./items/item-list.component";
import {ItemDetailComponent} from "./item/get-item/get-item.component";
import {MyAccountDetailComponent} from "./myaccount/myaccount-detail/myaccount-detail.component";
import {ChatComponent} from "./chat/chat.component";
import {LandingComponent} from "app/landing/landing.component";

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'search/:search/:zip', component: ItemListComponent},
    {path: 'item/:itemId', component: ItemDetailComponent},
    {path: 'my-account/:component', component: MyAccountDetailComponent},
    {path: 'chat/:interestId', component: ChatComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}