import {Component, OnInit} from "@angular/core";
import {FeedbackService} from "../services/feedback.service";
import {Feedback} from "../models/feedback";

declare const $:any;

@Component({
    selector: 'swap-feedback',
    templateUrl: `./feedback.component.html`
})
export class FeedbackComponent implements OnInit{

    thankYouMessage: boolean = false;
    feedbackRequest: Feedback;

    constructor(private feedbackService: FeedbackService) {}

    ngOnInit(): void {
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

