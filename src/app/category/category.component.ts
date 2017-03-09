import {Component, OnInit} from "@angular/core";
import {CategoryService} from "./category.service";
import {Category} from "./category";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
    moduleId: module.id,
    selector: 'swap-categories',
    templateUrl: `./category.component.html`
})
export class CategoryComponent implements OnInit {

    categories: Category[];

    constructor(private categoryService: CategoryService) {
    }


    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        this.categoryService
            .getCategories()
            .subscribe(
                result => this.success(result),
                error => console.log(error)
            );

    }

    success(result: any): void {
        console.log(result);
        this.categories = result.categories;
    }
}

