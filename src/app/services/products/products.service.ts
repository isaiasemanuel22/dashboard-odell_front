import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private readonly httpClient:HttpClient) { }

  getProducts(){

    return this.httpClient.get(endpoints.products.getProducts);
  }
  
  createProduct(product: any) {
    this.httpClient.post<any>(endpoints.products.createProduct, product).toPromise().then(
    (response)=>{
      console.log(response);
      return response;
    },
    (error)=>{
      console.log(error);
      return error;
    }
    );
  }

  getSupplement(){
    return this.httpClient.get(endpoints.products.getSupplement);
  }
}
