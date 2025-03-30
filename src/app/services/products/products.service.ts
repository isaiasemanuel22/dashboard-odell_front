import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { Product } from '../models/product.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private readonly httpClient:HttpClient) { }

  getProducts(){
    return this.httpClient.get(endpoints.products.getProducts);
  }
  
  createProduct(product: any) {
   return this.httpClient.post<any>(endpoints.products.createProduct, product);
  }

  getSupplements(){
    return this.httpClient.get<Product[]>(endpoints.products.getSupplement);
  }
}
