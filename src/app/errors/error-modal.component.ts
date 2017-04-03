import {Component, OnInit, Input} from "@angular/core";

declare const FB: any;
declare var $: any


@Component({
    moduleId: module.id,
    selector: 'error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.css']
})

export class ErrorModalComponent implements OnInit {

    show: boolean = false;

    @Input()
    errorMessage: string;

    temp:string;

    ngOnInit() {
        this.show = true;
    }

    dismissModal() {
        this.errorMessage = null;
        $('#errorModal').modal('hide');
        this.temp = 'data-dismiss';
    }
}