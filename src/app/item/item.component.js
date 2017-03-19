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
var item_model_1 = require("./item.model");
var forms_1 = require("@angular/forms");
var ItemComponent = (function () {
    function ItemComponent(fb) {
        this.fb = fb;
        this.itemModel = new item_model_1.Item();
        this.submitted = false;
        this.active = true;
        this.formErrors = {
            'title': '',
            'description': '',
            'zipCode': '',
            'categoryName': '',
            'userName': '',
            'condition': '',
            'itemStage': ''
        };
        this.validationMessages = {
            'title': {
                'required': 'Title is required',
                'maxlength': 'Name cannot be more than 50 characters long.'
            },
            'description': {
                'required': 'Description is required',
                'maxlength': 'Name cannot be more than 300 characters long.'
            },
            'zipCode': {
                'required': 'Zip code is required',
                'maxlength': 'Zip code should only be 5 characters long'
            },
            'categoryName': {
                'required': 'Category is required'
            },
            'userName': {
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
        console.log("inside item component");
        this.buildForm();
    };
    ItemComponent.prototype.buildForm = function () {
        var _this = this;
        this.itemForm = this.fb.group({
            'title': [this.itemModel.title, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(24)
                ]
            ],
            'description': [this.itemModel.description, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(300)
                ]
            ],
            'zipCode': [this.itemModel.zipCode, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(5)
                ]
            ],
            'categoryName': [this.itemModel.categoryName, [
                    forms_1.Validators.required
                ]
            ],
            'userName': [this.itemModel.userName, [
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
            ]
        });
        this.itemForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    ItemComponent.prototype.success = function (result) {
        console.log(result);
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
    ItemComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.itemModel = this.itemForm.value;
    };
    ItemComponent.prototype.createItem = function () {
        this.itemModel = new item_model_1.Item();
        this.buildForm();
    };
    ItemComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ItemComponent.prototype, "itemId", void 0);
    ItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'swap-item',
            templateUrl: 'item.component.html',
            styleUrls: ['item.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map