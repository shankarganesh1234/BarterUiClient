import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';
import { SearchResponse } from './search-response';
import { ItemListComponent } from './item-list.component';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';




// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Item } from './item';
  
@Component({
  moduleId: module.id,
  selector: 'swap-header',
  templateUrl: `./header.component.html`,
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit {

	 searchResponse:SearchResponse;
   observableTitles : Observable<Item[]>;

   private searchQueries = new Subject<string>();
   constructor(
  		private searchService: SearchService,
      private router: Router
		) {}

  autocomplete(term: string): void {
     this.searchQueries.next(term);
  }
  ngOnInit(): void {
      this.observableTitles = this.searchQueries
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.searchService.autoComplete(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Item[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Item[]>([]);
      });
  }
  

	search(searchVal: string): void {
		 this.searchService
        .search(searchVal)
        .subscribe(
            result => this.success(result),
            error => console.log(error)
        ); 

  }
  success(result : any): void {
     console.log(result);
     this.searchResponse = result;
    // var link = ['/itemlist'];
    // this.router.navigate(link);
  }
}

