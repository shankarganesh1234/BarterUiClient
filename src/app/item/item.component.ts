import {Component, Input, OnInit} from "@angular/core";
import {Item} from "./item.model";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";


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

    constructor(private fb: FormBuilder) {
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
            'categoryName': [this.itemModel.categoryName, [
                Validators.required
            ]
            ],
            'userName': [this.itemModel.userName, [
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

    success(result: any): void {
        console.log(result);
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

    onSubmit() {
        this.submitted = true;
        this.itemModel = this.itemForm.value;
    }

    createItem() {
        this.itemModel = new Item();
        this.buildForm();
    }

    formErrors = {
        'title': '',
        'description': '',
        'zipCode': '',
        'categoryName': '',
        'userName': '',
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

    fileChange(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
        }
    }

}