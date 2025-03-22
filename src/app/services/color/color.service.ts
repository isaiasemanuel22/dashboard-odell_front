import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { Color } from '../models/Color.interface';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private readonly httpClient:HttpClient) { }

  addColor(newColor:any){
    return this.httpClient.post<Color>(endpoints.color.addColor,newColor)
  }

  getColors(){
    return this.httpClient.get<Color[]>(endpoints.color.getColors)
  }

  updateColor(id:string , name:string)
  {
    return this.httpClient.put<Color>(`${endpoints.color.getColors}/${id}` , name);
  }

  deleteColor(id:string){
    return this.httpClient.delete(`${endpoints.color.getColors}/${id}`);
  }
}