import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { allConfigMachine } from '../../../store/machine/machine.selectors';
import { map, Observable, take } from 'rxjs';
import { deleteConfigMachine } from '../../../store/machine/machine.actions';
import { DialogComponent } from "../../../commons/dialog/dialog.component";
import { ConfigMachineComponent } from "../config-machine/config-machine.component";

@Component({
  selector: 'odell-list-machine',
  imports: [ListComponent, AsyncPipe, DialogComponent, ConfigMachineComponent,NgIf],
  templateUrl: './list-machine.component.html',
  styleUrl: './list-machine.component.scss'
})
export class ListMachineComponent {

  $listMachine:Observable<any> ;
  private readonly store = inject(Store);
   machineSelected:any = null
   openDialog = false;

  constructor(){
    this.$listMachine = this.store.select(allConfigMachine);
  }

 hamdler(action:any){
       switch(action.action){
         case 'edit':{
           this.$listMachine.pipe(
            map((listMachine:any[]) => listMachine.find((config:any) => config.id === action.data.id)),
            take(1)
           ).subscribe((config:any)=> {
            this.machineSelected = config;
            this.openDialog = true;
           })
           break;
         }
         case 'delete':{
          this.store.dispatch(deleteConfigMachine({id:action.data.id}))
         }
       }
 }

 closeDialog(){
  this.openDialog = false;
  this.machineSelected = null;
}

}
