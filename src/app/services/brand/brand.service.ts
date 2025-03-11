import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly httpClient:HttpClient) { }

  addBrand(newBrand:any){
    this.httpClient.post(endpoints.brand.addBrand,newBrand).toPromise().then((response)=> {
      return response;
    })
  }

  getBrands(){
   return this.httpClient.get(endpoints.brand.addBrand)
  }
}
