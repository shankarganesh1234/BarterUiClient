import {Component, OnInit, Input} from "@angular/core";

declare const FB:any;
declare var $: any


@Component({
    moduleId: module.id,
    selector: 'error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.css']
})

export class ErrorModalComponent implements OnInit{

    show: boolean = false;

    @Input()
    errorMessage: string;

    ngOnInit() {
        this.show = true;
    }

    onFacebookLoginClick() {

        FB.login((result: any) => {
            if (result.status === 'connected') {
                console.log('connected');
                console.log(result);
                this.errorMessage = null;
                $('#errorModal').modal('hide');
            } else {
                console.log('cannot tell');
            }
        }, { scope: 'public_profile,email' });
    }
}