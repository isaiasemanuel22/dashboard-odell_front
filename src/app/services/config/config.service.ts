import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly httpClient:HttpClient) {}


  saveConfig(config:any){
        let url = endpoints.config.createConfig;
    return this.httpClient.post(url,config);
  }

  getTypes(){
    let url = endpoints.config.getTypes;
    return this.httpClient.get<any>(url);
}
}
