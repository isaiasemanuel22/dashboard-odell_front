import { Component } from '@angular/core';
import { CardResumeComponent } from '../../commons/card-resume/card-resume.component';
import { ListComponent } from "../../commons/list-orders/list-orders.component";


@Component({
    selector: 'odell-home',
    standalone:true,
    imports: [CardResumeComponent, ListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
