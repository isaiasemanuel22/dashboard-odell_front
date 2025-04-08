import {  Component, inject, OnDestroy } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { allColorsSelector } from '../../../store/colors/colors.selectors';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { ColorComponent } from "../color/color.component";
import { Color } from '../../../services/models/Color.interface';
import { deleteColor } from '../../../store/colors/colors.actions';

@Component({
  selector: 'odell-list-color',
  imports: [ListComponent, AsyncPipe, DialogComponent, ColorComponent ,NgIf],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.scss'
})
export class ListColorComponent implements OnDestroy {
private readonly store = inject(Store);
private readonly destroy$ = new Subject<void>();  

 $colorList:Observable<any> ;

 colorSelected:Color | null = null
 openDialog = false;
 constructor(){

  this.$colorList = this.store.select(allColorsSelector).pipe(takeUntil(this.destroy$))

 }
 hamdler(action:any){
       switch(action.action){
         case 'edit':{
           this.$colorList.pipe(
            map(colorList => colorList.find((color:any) => color.id === action.data.id)),
            take(1)
           ).subscribe((color)=> {
            this.colorSelected = color;
            this.openDialog = true;
           })
           break;
         }
         case 'delete':{
           this.store.dispatch(deleteColor({id:action.data.id}))
         }
       }
 }

 closeDialog(){
  this.openDialog = false;
  this.colorSelected = null;
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
