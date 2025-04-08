import {  Component, inject, OnDestroy } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { allTypeMaterialsSelector } from '../../../store/typeMaterial/typeMaterial.selectors';
import { map, Observable, pipe, Subject, take, takeUntil } from 'rxjs';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { MaterialComponent } from "../material/material.component";
import { deleteTypeMaterial } from '../../../store/typeMaterial/typeMaterial.actions';

@Component({
  selector: 'odell-list-type-material',
  imports: [ListComponent, AsyncPipe, DialogComponent, MaterialComponent,NgIf],
  templateUrl: './list-type-material.component.html',
  styleUrl: './list-type-material.component.scss'
})
export class ListTypeMaterialComponent implements OnDestroy{
private readonly store = inject(Store);
private readonly destroy$ = new Subject<void>();

 $typeMaterialList:Observable<any>;

 typeMaterialSelected = null;
 openDialog = false;

 constructor(){
 this.$typeMaterialList =  this.store.select(allTypeMaterialsSelector).pipe(takeUntil(this.destroy$));
 }
 
    hamdler(action:{action:string,data:any}){
      switch(action.action){
        case 'edit':{
         this.$typeMaterialList.pipe(
            map(typeMaterials=> typeMaterials.find((tm:any) => tm.id === action.data.id)),
            pipe(take(1))
          ).subscribe(typeMaterial => {
            this.typeMaterialSelected = typeMaterial;
          })
        this.openDialog = true;
          break;
        }
        case 'delete':{
         this.store.dispatch(deleteTypeMaterial({id:action.data.id}))
        }
      }
    }
  
   closeDialog(){
      this.openDialog = false;
      this.typeMaterialSelected = null;
    }
    
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
