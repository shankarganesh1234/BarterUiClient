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
var item_model_1 = require("../models/item.model");
var forms_1 = require("@angular/forms");
var item_service_1 = require("../service/item.service");
var component_event_service_1 = require("../../component-events/component-event.service");
var ItemComponent = (function () {
    function ItemComponent(fb, itemService, componentEventService) {
        this.fb = fb;
        this.itemService = itemService;
        this.componentEventService = componentEventService;
        this.itemModel = new item_model_1.Item();
        this.submitted = false;
        this.active = true;
        this.formErrors = {
            'title': '',
            'description': '',
            'zipCode': '',
            'categoryId': '',
            'userId': '',
            'condition': '',
            'itemStage': ''
        };
        this.validationMessages = {
            'title': {
                'required': 'Title is required',
                'maxlength': 'Name cannot be more than 100 characters long.'
            },
            'description': {
                'required': 'Description is required',
                'maxlength': 'Name cannot be more than 500 characters long.'
            },
            'zipCode': {
                'required': 'Zip code is required',
                'maxlength': 'Zip code should only be 5 characters long'
            },
            'categoryId': {
                'required': 'Category is required'
            },
            'userId': {
                'required': 'User name is required'
            },
            'condition': {
                'required': 'Condition is required'
            },
            'itemStage': {
                'required': 'Item stage is required'
            }
        };
    }
    ItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentEventService.itemObjectEvent$.subscribe(function (result) {
            _this.itemDetail = result;
            _this.setItemInForm(_this.itemDetail);
            if (result != null) {
                _this.createOrUpdate = 'update';
            }
            else {
                _this.createOrUpdate = 'create';
            }
        });
        this.buildForm();
    };
    ItemComponent.prototype.setItemInForm = function (itemDetail) {
        if (itemDetail != null) {
            this.itemForm.patchValue({
                'title': itemDetail.title,
                'description': itemDetail.description,
                'zipCode': itemDetail.zipCode.zipCode,
                'categoryId': itemDetail.categoryId.categoryId,
                'condition': itemDetail.condition,
                'itemStage': itemDetail.itemStage,
                'userId': itemDetail.userId.userId,
                'itemId': itemDetail.itemId
            });
        }
        else {
            this.itemForm.patchValue({
                'title': '',
                'description': '',
                'zipCode': '',
                'categoryId': '',
                'condition': '',
                'itemStage': '',
                'userId': '',
                'itemId': ''
            });
        }
    };
    ItemComponent.prototype.buildForm = function () {
        var _this = this;
        this.itemForm = this.fb.group({
            'title': [this.itemModel.title, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(100)
                ]
            ],
            'description': [this.itemModel.description, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(500)
                ]
            ],
            'zipCode': [this.itemModel.zipCode, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(5)
                ]
            ],
            'categoryId': [this.itemModel.categoryId, [
                    forms_1.Validators.required
                ]
            ],
            'userId': [this.itemModel.userId, [
                    forms_1.Validators.required
                ]
            ],
            'condition': [this.itemModel.condition, [
                    forms_1.Validators.required
                ]
            ],
            'itemStage': [this.itemModel.itemStage, [
                    forms_1.Validators.required
                ]
            ],
            'itemId': [this.itemModel.itemId
            ]
        });
        this.itemForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    ItemComponent.prototype.onValueChanged = function (data) {
        if (!this.itemForm) {
            return;
        }
        var form = this.itemForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ItemComponent.prototype.createItem = function () {
        var _this = this;
        this.submitted = true;
        this.itemModel = this.itemForm.value;
        this.itemService
            .createItem(this.itemModel)
            .subscribe(function (result) { return _this.itemCreationSuccess(result); }, function (error) { return console.log(error); });
    };
    ItemComponent.prototype.itemCreationSuccess = function (result) {
        var _this = this;
        this.itemImageFormData.append('itemId', result.itemId);
        this.itemService
            .createImageForItem(this.itemImageFormData)
            .subscribe(function (result) { return _this.itemImageCreationSuccess(result); }, function (error) { return console.log(error); });
    };
    ItemComponent.prototype.itemImageCreationSuccess = function (result) {
    };
    ItemComponent.prototype.fileUpload = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            this.itemImageFormData = new FormData();
            this.itemImageFormData.append('file', file, file.name);
        }
    };
    ItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-item',
            templateUrl: 'item.component.html',
            styleUrls: ['item.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, item_service_1.ItemService, component_event_service_1.ComponentEventService])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map