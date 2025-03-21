import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteBrand } from '../../../store/brand/brand.actions';
import { allBrandsSelector } from '../../../store/brand/brand.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'odell-list-brand',
  imports: [ListComponent,NgIf,AsyncPipe],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.scss'
})
export class ListBrandComponent implements OnInit{
  brandList:any[]=[] ;
  $brandList:Observable<any>
   openDialog = false;
   brandSelected:any = undefined;
 
   store = inject(Store);

 constructor(
  private readonly cdr:ChangeDetectorRef
){
  this.$brandList = this.store.select(allBrandsSelector);
 }

ngOnInit(): void {
  this.$brandList.subscribe((brands)=>{
    this.brandList = brands;
  })
}

 
   hamdler(action:{action:string,data:any}){
     switch(action.action){
       case 'edit':{
         this.brandSelected = this.brandList.find((brand)=> {
           return brand.id === action.data.id
         })
         this.openDialog = true;
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
}
