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
    return this.httpClient.post(endpoints.color.addColor,newColor)
    .toPromise()
    .then((response)=> {
      console.log(response);
      return response
    })
  }

  getColors(){
    return this.httpClient.get<Color[]>(endpoints.color.getColors)
  }
}