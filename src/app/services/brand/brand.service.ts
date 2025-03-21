import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { BrandFilament } from '../models/BrandFilament.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly httpClient:HttpClient) { }

  addBrand(name:string){
    let brand = {
      id:undefined,
      name:name
    }
   return this.httpClient.post(endpoints.brand.addBrand,brand);
  }

  getBrands(){
   return this.httpClient.get<BrandFilament[]>(endpoints.brand.addBrand)
  }

  updateBrand(id:string, brand:any){
    return this.httpClient.put<any>(`${endpoints.brand.getBrands}/${id}`, brand);
  }

  deleteBrand(id:string){
    return this.httpClient.delete(`${endpoints.brand.getBrands}/${id}`);
  }
}
