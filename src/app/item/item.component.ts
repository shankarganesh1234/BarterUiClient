import {Component, Input, OnInit} from "@angular/core";
import {Item} from "./item.model";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ItemService} from "./item.service";


@Component({
    moduleId: module.id,
    selector: 'swap-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css']
})

export class ItemComponent implements OnInit {

    @Input()
    itemId: string;

    itemForm: FormGroup;
    itemModel: Item = new Item();
    submitted = false;
    active = true;
    itemImageFormData: FormData;

    constructor(private fb: FormBuilder, private itemService: ItemService) {
    }


    ngOnInit(): void {
        console.log("inside item component");
        this.buildForm();
    }

    buildForm(): void {
        this.itemForm = this.fb.group({
            'title': [this.itemModel.title, [
                Validators.required,
                Validators.maxLength(24)
            ]
            ],
            'description': [this.itemModel.description, [
                Validators.required,
                Validators.maxLength(300)
            ]
            ],
            'zipCode': [this.itemModel.zipCode, [
                Validators.required,
                Validators.maxLength(5)
            ]
            ],
            'categoryId': [this.itemModel.categoryId, [
                Validators.required
            ]
            ],
            'userId': [this.itemModel.userId, [
                Validators.required
            ]
            ],
            'condition': [this.itemModel.condition, [
                Validators.required
            ]
            ],
            'itemStage': [this.itemModel.itemStage, [
                Validators.required
            ]
            ]
        })
        ;
        this.itemForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.itemForm) {
            return;
        }
        const form = this.itemForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'title': '',
        'description': '',
        'zipCode': '',
        'categoryId': '',
        'userId': '',
        'condition': '',
        'itemStage': ''
    };

    validationMessages = {
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

    createItem() {
        this.submitted = true;
        this.itemModel = this.itemForm.value;
        this.itemService
            .createItem(this.itemModel)
            .subscribe(
                result => this.itemCreationSuccess(result),
                error => console.log(error)
            );
    }

    itemCreationSuccess(result: Item): void {
        this.itemImageFormData.append('itemId', result.itemId);
        this.itemService
            .createImageForItem(this.itemImageFormData)
            .subscribe(
                result => this.itemImageCreationSuccess(result),
                error => console.log(error)
            );
        console.log(result);
    }

    itemImageCreationSuccess(result: any): void {
        console.log(result);
    }

    fileUpload(event:any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            this.itemImageFormData = new FormData();
            this.itemImageFormData.append('file', file, file.name);
        }
    }

}