"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var category_service_1 = require("../services/category.service");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var CategoryComponent = (function () {
    function CategoryComponent(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    CategoryComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService
            .getCategories()
            .subscribe(function (result) { return _this.success(result); }, function (error) { return console.log(error); });
    };
    CategoryComponent.prototype.success = function (result) {
        this.categories = result.categories;
    };
    CategoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-categories',
            templateUrl: "./category.component.html"
        }), 
        __metadata('design:paramtypes', [category_service_1.CategoryService])
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map