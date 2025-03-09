import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class TypeMaterialService {

  constructor(private readonly httpClient:HttpClient) { }

  getAllTypeMaterials(){
    return this.httpClient.get(endpoints.typeMaterial.getTypeMaterials);
  }

  getAllTypeMaterialsName(){
    return this.httpClient.get(endpoints.typeMaterial.getNamesTypeMaterials);
  }

  setTypeMaterial(typeMaterial:any){
    return this.httpClient.post(endpoints.typeMaterial.getTypeMaterials,typeMaterial).toPromise().then((reponse)=> {
      return reponse;
    })
  }
}
