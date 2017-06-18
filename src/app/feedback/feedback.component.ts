import {Component, OnInit} from "@angular/core";
import {FeedbackService} from "../services/feedback.service";
import {Feedback} from "../models/feedback";
import {ActivatedRoute, Router} from "@angular/router";

declare const $:any;

@Component({
    selector: 'swap-feedback',
    templateUrl: `./feedback.component.html`
})
export class FeedbackComponent implements OnInit{

    thankYouMessage: boolean = false;
    feedbackRequest: Feedback;
    componentName: string;

    constructor(private route: ActivatedRoute, private router: Router, private feedbackService: FeedbackService) {
        route.params.subscribe(val => {
            this.initFeedback();
        });
    }

    ngOnInit(): void {
        this.initFeedback();
    }

    initFeedback(): void {

        let componentName = this.route.snapshot.params['componentName'];

        if(componentName == 'feedback')
            this.componentName = 'Feedback';
        else
            this.componentName = 'Contact us';

        $('html, body').animate({ scrollTop: 0 }, 'slow');
        this.feedbackRequest = new Feedback();

    }

    /**
     * Invoke create feedback service
     * @param name
     * @param email
     * @param message
     */
    createFeedback(feedbackRequest: Feedback): void {

        this.feedbackService.createFeedback(feedbackRequest).subscribe(
            result => {
                this.thankYouMessage = result;
            }
        )

    }
}

