import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MyAccountDetailComponent} from "../myaccount/myaccount-detail/myaccount-detail.component";
import {ItemDetailComponent} from "../item/get-item/get-item.component";
import {ItemListComponent} from "../items/item-list.component";
import {HomeComponent} from "../home/home.component";
const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'search/:search/:zip', component: ItemListComponent},
    {path: 'item/:itemId', component: ItemDetailComponent},
    {path: 'my-account/:component', component: MyAccountDetailComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}