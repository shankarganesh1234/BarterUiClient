import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemListComponent} from "../items/item-list.component";
import {CategoryComponent} from "../category/category.component";
import {MyAccountDetailComponent} from "../myaccount/myaccount-detail/myaccount-detail.component";
const routes: Routes = [
    {path: 'itemlist', component: ItemListComponent},
    {path: 'categories', component: CategoryComponent},
    {path: 'my-account', component: MyAccountDetailComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}