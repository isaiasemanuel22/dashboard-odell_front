import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { NgIf } from '@angular/common';
import { Filament } from '../../../services/models/Filament.interface';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { FilamentComponent } from "../filament/filament.component";
import { Store } from '@ngrx/store';
import { allFilaments } from '../../../store/filaments/filaments.selectors';
import { removeFilament } from '../../../store/filaments/filaments.actions';
import { map, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'odell-list-filaments',
  standalone:true,
  imports: [ListComponent, NgIf, DialogComponent, FilamentComponent],
  templateUrl: './list-filaments.component.html',
  styleUrl: './list-filaments.component.scss'
})
export class ListFilamentsComponent implements OnInit , OnDestroy{ 
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  listFilaments:any[] = []
  originalFilamentList:Filament[] = [] 
  openDialog = false;
  filamentSelected:any = undefined;

  constructor(private readonly cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.store.select(allFilaments).pipe(
      takeUntil(this.destroy$)
    ).subscribe((filaments)=> {
      this.listFilaments = filaments.map((filament)=>{
        return {
          id: filament.id,
          price: filament.price,
          kgMaterial: filament.kgMaterial,
          marca: filament.brandFilament?.name,
          color: filament.color?.name,
          type: filament.typeMaterial?.name,
          stock: filament.stock
        } as any as Filament
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}


