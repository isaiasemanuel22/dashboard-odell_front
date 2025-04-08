import { Component, inject, OnDestroy } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteBrand } from '../../../store/brand/brand.actions';
import { allBrandsSelector } from '../../../store/brand/brand.selector';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { BrandComponent } from "../brand/brand.component";

@Component({
  selector: 'odell-list-brand',
  imports: [ListComponent, NgIf, AsyncPipe, DialogComponent, BrandComponent],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.scss'
})
export class ListBrandComponent implements OnDestroy{
  private readonly destroy$ = new Subject<void>();
  private readonly store = inject(Store);

  $brandList:Observable<any>
  openDialog = false;
  brandSelected:any = undefined;

 constructor(){
  this.$brandList = this.store.select(allBrandsSelector).pipe(takeUntil(this.destroy$));
 }


 
   hamdler(action:{action:string,data:any}){
     switch(action.action){
       case 'edit':{
         this.$brandList.pipe(
          map(brandList => brandList.find((brand:any) => brand.id === action.data.id)),
          take(1)
         ).subscribe((brand)=> {
          this.brandSelected = brand;
          this.openDialog = true;
         })
         break;
       }
       case 'delete':{
         this.store.dispatch(deleteBrand({id:action.data.id}))
       }
     }
   }
 
   closeDialog(){
     this.openDialog = false;
     this.brandSelected = undefined;
   }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
   }
}
