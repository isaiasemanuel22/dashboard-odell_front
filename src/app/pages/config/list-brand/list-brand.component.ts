import { ChangeDetectorRef, Component } from '@angular/core';
import { BrandService } from '../../../services/brand/brand.service';
import { ListComponent } from "../../../commons/list-orders/list-orders.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'odell-list-brand',
  imports: [ListComponent,NgIf],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.scss'
})
export class ListBrandComponent {
 brandList:any[]=[] 

 hamdler(evento:any){
  console.log(evento);
 }

 constructor(
  private readonly brandService:BrandService,
  private readonly cdr:ChangeDetectorRef
){
  this.brandService.getBrands().subscribe((data:any) => {
    this.brandList = data;
    cdr.detectChanges();
  })
 }
}
