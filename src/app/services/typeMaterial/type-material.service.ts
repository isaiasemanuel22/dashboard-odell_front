import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { TypeMaterial } from '../models/TypeMaterial.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterialService {

  constructor(private readonly httpClient:HttpClient) { }

  getAllTypeMaterials(){
    return this.httpClient.get<TypeMaterial[]>(endpoints.typeMaterial.getTypeMaterials);
  }

  getAllTypeMaterialsName(){
    return this.httpClient.get(endpoints.typeMaterial.getNamesTypeMaterials);
  }

  setTypeMaterial(typeMaterial:any){
    return this.httpClient.post(endpoints.typeMaterial.getTypeMaterials,typeMaterial);

  }

  updateMaterial(id:string,name:string){
    return this.httpClient.put(`${endpoints.typeMaterial.getTypeMaterials}/${id}`,name);
  }

  deleteMaterial(id:string){
    return this.httpClient.delete(`${endpoints.typeMaterial.getTypeMaterials}/${id}`);
  }
}
