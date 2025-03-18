import { ChangeDetectorRef, Component } from '@angular/core';
import { ColorService } from '../../../services/color/color.service';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'odell-list-color',
  imports: [ListComponent,NgIf],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent {
 colorList:any[]=[] 

 hamdler(evento:any){
  console.log(evento);
 }

 constructor(
  private readonly colorService:ColorService,
  private readonly cdr:ChangeDetectorRef
){
  this.colorService.getColors().subscribe((data:any) => {
    this.colorList = data;
    cdr.detectChanges();
  })
 }
}
