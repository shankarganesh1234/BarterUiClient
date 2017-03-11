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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('../app-component/app.component');
var search_service_1 = require('../search/search.service');
var category_service_1 = require('../category/category.service');
var item_list_component_1 = require('../items/item-list.component');
var category_component_1 = require('../category/category.component');
var app_routing_module_1 = require('../routing/app-routing.module');
var http_1 = require('@angular/http');
var landing_component_1 = require("../landing/landing.component");
var header_component_1 = require("../header/header.component");
var search_bar_component_1 = require("../search-bar/search-bar.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                http_1.JsonpModule,
            ],
            declarations: [app_component_1.AppComponent, item_list_component_1.ItemListComponent, category_component_1.CategoryComponent, landing_component_1.LandingComponent, header_component_1.HeaderComponent, search_bar_component_1.SearchBarComponent],
            bootstrap: [landing_component_1.LandingComponent],
            providers: [search_service_1.SearchService, category_service_1.CategoryService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map