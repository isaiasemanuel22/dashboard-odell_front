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
      console.log(product);
  return this.httpClient.post(`${endpoints.products.createProduct}/${product.type}`, addProduct)

  }

  getSupplements(){
    return this.httpClient.get<Product[]>(endpoints.products.getSupplement);
  }


  private newProduct(product:any){

    const formData = new FormData();
    console.log(product);
    // Campos simples
    formData.append('name', product.name);
    formData.append('cant', product.cant.toString());
    formData.append('price', product.price.toString());
    formData.append('cost', product.cost.toString());
    formData.append('hours', product.horas.toString());
    formData.append('supplement', product.supplement.toString());
    formData.append('product', product.product.toString());
  
    // Campos complejos como strings
    formData.append('productInfo', JSON.stringify(null));
    formData.append('bills', JSON.stringify(product.materials));
    formData.append('supplements', JSON.stringify(product.extras));
  
    // ✅ Archivos: agregar uno por uno
    for (const photo of product.photos) {
      formData.append('photos', photo);
    }

        // ✅ Archivos: agregar uno por uno
    for (const file of product.files) {
      formData.append('files', file);
    }
    return formData;
    /*
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
   } */
  }

  deleteProduct (id:string){
    return this.httpClient.delete(`${endpoints.products.createProduct}/${id}`);
  }

}
