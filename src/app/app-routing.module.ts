import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ItemListComponent} from "./items/item-list.component";
import {ItemDetailComponent} from "./item/get-item/get-item.component";
import {MyAccountDetailComponent} from "./myaccount/myaccount-detail/my-account-detail-parent/myaccount-detail.component";
import {ChatComponent} from "./chat/chat.component";
import {FeedbackComponent} from "./feedback/feedback.component";

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'search/:categoryName/:search/:zip', component: ItemListComponent},
    {path: 'item/:itemId', component: ItemDetailComponent},
    {path: 'my-account/:component', component: MyAccountDetailComponent},
    {path: 'chat/:interestId', component: ChatComponent},
    {path: 'user/:componentName', component: FeedbackComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
