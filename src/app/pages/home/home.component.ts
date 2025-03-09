import { Component } from '@angular/core';
import { ChartSoldsComponent } from './components/chart-solds/chart-solds.component';
import { CardResumeComponent } from '../../commons/card-resume/card-resume.component';
import { ListOrdersComponent } from '../../commons/list-orders/list-orders.component';

@Component({
  selector: 'odell-home',
  standalone: true,
  imports: [ChartSoldsComponent , CardResumeComponent,ListOrdersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
