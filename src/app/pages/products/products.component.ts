import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';
import { ListProductsComponent } from './compoents/list-products/list-products.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './compoents/odell-filters/odell-filters.component';
import { SearchComponent } from './compoents/search/search.component';

@Component({
    selector: 'odell-products',
    imports: [ListProductsComponent, FiltersComponent, CommonModule, SearchComponent],
    providers: [ProductsService],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  
  $listProducts:Observable<any> = new Observable<any>();

  constructor(private readonly products:ProductsService){
    
  }

  ngOnInit(): void {
    this.$listProducts = this.products.getProducts();
    this.$listProducts.subscribe((response)=> {
      console.log(response);
    })
  }
}
