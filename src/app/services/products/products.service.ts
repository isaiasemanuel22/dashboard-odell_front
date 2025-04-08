import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { Product } from '../models/product.interface';

import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { allTypeMaterialsSelector } from '../../store/typeMaterial/typeMaterial.selectors';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly store = inject(Store);
    $materials:Observable<any>;

  constructor(private readonly httpClient:HttpClient) { 
    this.$materials = this.store.select(allTypeMaterialsSelector)
  }

  getProducts(){
    return this.httpClient.get(endpoints.products.getProducts);
  }
  
  createProduct(product: any) {
      const addProduct = this.newProduct({ ...product });
  return this.httpClient.post(`${endpoints.products.createProduct}/${product.type}`, addProduct)

  }

  getSupplements(){
    return this.httpClient.get<Product[]>(endpoints.products.getSupplement);
  }


  private newProduct(product:any){
   return{
    name: product.name,
    cant: product.cant,
    cost: 0,
    price: 0,
    photos: product.photos,
    bills: product.materials,
    supplement: product.supplement,
    product: product.product,
    supplements: product.extras,
    hours: product.horas,
    productInfo: null
   } 
  }

}
