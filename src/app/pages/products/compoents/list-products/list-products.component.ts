import { NgFor } from '@angular/common';
import { Component,Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'odell-list-products',
  standalone: true,
  imports: [NgFor, ProductComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  @Input() set products(listProducts:any[]){
    this.listProducts = listProducts;
  }

  listProducts:any[] = [];
}
