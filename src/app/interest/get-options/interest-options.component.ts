import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {ItemService} from "../../item/service/item.service";
import {ItemDetail} from "../../item/models/item-detail.model";
import {FormGroup, FormBuilder, FormControl, FormArray, Validators} from "@angular/forms";


@Component({
    moduleId: module.id,
    selector: 'swap-interest-options',
    templateUrl: 'interest-options.component.html',
    styleUrls: ['interest-options.component.css']
})

export class InterestOptionsComponent implements OnInit, OnChanges {

    @Input()
    userId: number;

    itemDetails: ItemDetail[];

    constructor(private itemService: ItemService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        if (this.userId === null)
            return;

        this.itemService
            .getItemsByUser(this.userId)
            .subscribe(
                result => this.getItemsByUserSuccess(result),
                error => console.log(error)
            );

    }

    ngOnChanges(): void {

    }

    getItemsByUserSuccess(result: ItemDetail[]): void {
        this.itemDetails = result;
    }
}