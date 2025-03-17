import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { NgIf } from '@angular/common';
import { Filament } from '../../../services/models/Filament.interface';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { FilamentComponent } from "../filament/filament.component";
import { Store } from '@ngrx/store';
import { allFilaments } from '../../../store/filaments.selectors';
import { removeFilament } from '../../../store/filaments.actions';


@Component({
  selector: 'odell-list-filaments',
  standalone:true,
  imports: [ListComponent, NgIf, DialogComponent, FilamentComponent],
  templateUrl: './list-filaments.component.html',
  styleUrl: './list-filaments.component.scss'
})
export class ListFilamentsComponent implements OnInit { 

  listFilaments:any[] = []
  originalFilamentList:Filament[] = [] 
  openDialog = false;
  filamentSelected:any = undefined;

  store = inject(Store);

  constructor(private readonly cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.store.select(allFilaments).subscribe((filaments)=> {
      this.listFilaments = filaments.map((response)=> {
        return {
          id: response.id,
          price:response.price,
          kgMaterial:response.kgMaterial,
          marca:response.brandFilament?.name,
          color:response.color?.name,
          type:response.typeMaterial?.name,
          stock:response.stock
        }
      });
      this.originalFilamentList = filaments
      this.cdr.detectChanges();
    });
  }

  hamdler(action:{action:string,data:any}){
    switch(action.action){
      case 'edit':{
        this.filamentSelected = this.originalFilamentList.find((filament)=> {
          return filament.id === action.data.id
        })
        this.openDialog = true;
        break;
      }
      case 'delete':{
        this.store.dispatch(removeFilament({id:action.data.id}))
      }
    }
  }

  closeDialog(){
    this.openDialog = false;
    this.filamentSelected = undefined;
  }
}


