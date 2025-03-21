import {  Component, inject } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { allColorsSelector } from '../../../store/colors/colors.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'odell-list-color',
  imports: [ListComponent,NgIf, AsyncPipe],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent {
 $colorList:Observable<any> 
 
 private readonly store = inject(Store);
 hamdler(evento:any){
  console.log(evento);
 }

 constructor(){

  this.$colorList = this.store.select(allColorsSelector)

 }
}
