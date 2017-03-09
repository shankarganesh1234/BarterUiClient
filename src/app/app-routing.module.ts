import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent }  from './header.component';
import { ItemListComponent }  from './item-list.component';
import { CategoryComponent }  from './category/category.component';
const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search',     component: HeaderComponent },
  { path: 'itemlist',     component: ItemListComponent },
  { path: 'categories',     component: CategoryComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}