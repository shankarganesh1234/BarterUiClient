import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { SearchService }  from './search.service';
import { CategoryService }  from './category/category.service';
import { ItemListComponent } from './item-list.component';
import { CategoryComponent }  from './category/category.component';
import { HeaderComponent } from './header.component';
import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';
import { HttpModule, JsonpModule }    from '@angular/http';



@NgModule({
  imports:      [ 	BrowserModule,
  					FormsModule,
  					AppRoutingModule,
  					HttpModule,
  					JsonpModule,
  					],
  declarations: [ AppComponent, HeaderComponent, ItemListComponent, CategoryComponent],
  bootstrap:    [ AppComponent ],
  providers:	[ SearchService, CategoryService ]
})

export class AppModule { }
