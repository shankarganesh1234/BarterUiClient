import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

declare const $:any;

@Component({
    selector: 'swap-faq',
    templateUrl: `./faq.component.html`
})
export class FaqComponent implements OnInit{

    constructor(private route: ActivatedRoute) {
        route.params.subscribe(val => {
            this.initFaq();
        });
    }

    ngOnInit() : void {
        this.initFaq();
    }

    initFaq() : void {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
}

