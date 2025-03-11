import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class FilamentService {

  constructor(private readonly httpClient:HttpClient) { }

  getFilament(){
    return this.httpClient.get(endpoints.filament.createFilament);
  }

  addFilament(filament:any){
    return this.httpClient.post(endpoints.filament.createFilament,filament);
  }
}
