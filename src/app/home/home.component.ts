import {Component} from "@angular/core";
import {ComponentEventService} from "../services/component-event.service";

@Component({
    moduleId: module.id,
    selector: 'swap-home',
    templateUrl: `./home.component.html`,
    providers: [ComponentEventService]
})
export class HomeComponent {

}

