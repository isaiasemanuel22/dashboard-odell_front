import { ChangeDetectorRef, Component } from '@angular/core';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { TypeMaterialService } from '../../../services/typeMaterial/type-material.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'odell-list-type-material',
  imports: [ListComponent,NgIf],
  templateUrl: './list-type-material.component.html',
  styleUrl: './list-type-material.component.scss'
})
export class ListTypeMaterialComponent {
 typeMaterialList:any[]=[] 

 hamdler(evento:any){
  console.log(evento);
 }

 constructor(
  private readonly typeMaterialService:TypeMaterialService,
  private readonly cdr:ChangeDetectorRef
){
  this.typeMaterialService.getAllTypeMaterials().subscribe((data:any) => {
    console.log(data);
    this.typeMaterialList = data;
    cdr.detectChanges();
  })
 }
}
