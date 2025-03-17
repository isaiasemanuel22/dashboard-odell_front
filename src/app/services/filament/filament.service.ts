import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';
import { Observable } from 'rxjs';
import { Filament } from '../models/Filament.interface';

@Injectable({
  providedIn: 'root'
})
export class FilamentService {

  constructor(private readonly httpClient:HttpClient) { }

  getFilaments():Observable<Filament[]>{
    return this.httpClient.get<Filament[]>(endpoints.filament.createFilament);
  }

  addFilament(filament:any):Observable<Filament>{
    return this.httpClient.post<Filament>(endpoints.filament.createFilament,filament);
  }

  updateFilament(id:string, filament:any):Observable<Filament>{
    return this.httpClient.put<Filament>(`${endpoints.filament.createFilament}/${id}`,filament);
  }

  deleteFilament(id:string):Observable<any>{
    return this.httpClient.delete<any>(`${endpoints.filament.createFilament}/${id}`);
  }
}
