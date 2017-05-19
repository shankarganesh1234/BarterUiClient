import {Component, OnInit} from "@angular/core";
import {Item} from "../../models/item.model";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ItemService} from "../../services/item.service";
import {ComponentEventService} from "../../services/component-event.service";
import {ItemDetail} from "../../models/item-detail.model";
import {LoggedInUser} from "../../storage-utils/loggedInUser";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'swap-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

    itemForm: FormGroup;
    itemModel: Item = new Item();
    submitted = false;
    active = true;
    itemImageFormData: FormData;
    imageList: File[] = [];
    itemDetail: ItemDetail;
    createOrUpdate: string;
    categoriesList: Category[] = [];
    disableButton: boolean = false;
    private loggedInUser: LoggedInUser = new LoggedInUser();

    constructor(private fb: FormBuilder,
                private itemService: ItemService,
                private componentEventService: ComponentEventService,
                private categoryService: CategoryService) {
    }


    ngOnInit(): void {
        this.componentEventService.itemObjectEvent$.subscribe(
            result => {
                this.itemDetail = result;
                this.setItemInForm(this.itemDetail);
                if(result != null) {
                    this.createOrUpdate = 'update';
                } else {
                    this.createOrUpdate = 'create';
                }
            });
        this.buildForm();
        this.categoryService.getCategories().subscribe(
            result => {
                this.categoriesList = result.categories;
            }
        )
    }

    setItemInForm(itemDetail: ItemDetail): void {

        if(itemDetail != null) {
        this.itemForm.patchValue({
            'title': itemDetail.title,
            'description': itemDetail.description,
            'zipCode': itemDetail.zipCode.zipCode,
            'categoryId':itemDetail.categoryId.categoryId,
            'condition': itemDetail.condition,
            'itemStage': itemDetail.itemStage,
            'userId': itemDetail.userId.userId,
            'itemId': itemDetail.itemId
         });
        } else {
            this.itemForm.patchValue({
                'title': '',
                'description': '',
                'zipCode': '',
                'categoryId':'',
                'condition': '',
                'itemStage': '',
                'userId': '',
                'itemId': ''
            });
        }
    }

    buildForm(): void {
        this.itemForm = this.fb.group({
            'title': [this.itemModel.title, [
                Validators.required,
                Validators.maxLength(100)
            ]
            ],
            'description': [this.itemModel.description, [
                Validators.required,
                Validators.maxLength(500)
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
            ],
            'itemId': [this.itemModel.itemId
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

    /**
     * Create or update an item based on form submission
     */
    createOrUpdateItem() {
        this.disableButton = true;
        if(this.itemDetail === null) {
            this.createItem();
        } else {
            this.updateItem();
        }
    }

    createItem() {
        this.submitted = true;
        this.itemModel = this.itemForm.value;
        let id = this.loggedInUser.getLoggedInUser().id;
        this.itemModel.userId = id;
        this.itemService
            .createItem(this.itemModel)
            .subscribe(
                result => this.itemCreationSuccess(result),
                error => console.log(error)
            );
    }

    /**
     * Edit an existing item
     */
    updateItem() {
        this.submitted = true;
        this.itemModel = this.itemForm.value;
        let id = this.loggedInUser.getLoggedInUser().id;
        this.itemModel.userId = id;
        this.itemModel.itemId = this.itemDetail.itemId;
        this.itemService
            .updateItem(this.itemModel)
            .subscribe(
                result => this.itemCreationSuccess(result),
                error => console.log(error)
            );
    }


    /**
     * Call to create item images service
     * Append item Id and the item images
     * @param result
     */
    itemCreationSuccess(result: Item): void {
        this.itemImageFormData = new FormData();
        this.itemImageFormData.append('itemId', result.itemId);

        for(let i=0;i<this.imageList.length; i++) {
            this.itemImageFormData.append('file', this.imageList[i], this.imageList[i].name);
        }

        this.itemService
            .createImageForItem(this.itemImageFormData)
            .subscribe(
                result => this.itemImageCreationSuccess(result),
                error => console.log(error)
            );
    }

    itemImageCreationSuccess(result: any): void {
        this.disableButton = false;
    }

    /**
     * Add image or images to the images list
     * @param event
     */
    fileUpload(event:any) {

        let len = this.imageList.length;
        this.imageList[len] = event.file;
    }

    /**
     * Remove image after choosing.
     * Removes it from the imageList. The imageList is used finally to add files to the form data
     * It reflects
     * @param event
     */
    removeImage(event:any) {

        let removeImage = event.file;
        if(this.imageList != null && this.imageList.length > 0) {
            for(let i=0;i<this.imageList.length; i++) {
                if(this.imageList[i].name === removeImage.name) {
                    this.imageList.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * Delete an existing image from an item
     * The image details are deleted from db and cloudinary as part of the same transaction
     * @param imageId
     */
    deleteExistingImage(imageId: string) {
        this.itemService
            .deleteImage(imageId)
            .subscribe(
            result => this.deleteExistingImageFromItemDetail(imageId),
            error => console.log(error)
        );
    }

    /**
     * Remove deleted image from local item detail as well
     * @param imageId
     */
    deleteExistingImageFromItemDetail(imageId: string) {
        for(let i=0;i<this.itemDetail.images.length; i++) {
            if(imageId === this.itemDetail.images[i].public_id) {
                this.itemDetail.images.splice(i, 1);
            }
        }
    }
}
