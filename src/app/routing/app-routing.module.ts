import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MyAccountDetailComponent} from "../myaccount/myaccount-detail/myaccount-detail.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
const routes: Routes = [
    {path: 'home', component: SearchBarComponent},
    {path: 'my-account/:component', component: MyAccountDetailComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}