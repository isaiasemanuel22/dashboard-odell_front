import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly httpClient:HttpClient) {

   }


  saveConfig(config:any){
        const headers = new HttpHeaders();
        headers.set('content-type' , 'application/json; charset=utf-8');
        headers.set('Access-Control-Allow-Origin','')
        let url = endpoints.config.createConfig;
    return this.httpClient.post(url,config,{headers:headers});
  }

  getTypes(){
    const headers = new HttpHeaders();
    headers.set('content-type' , 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin','')
    let url = endpoints.config.getTypes;
    return this.httpClient.get(url,{headers:headers});
}
}
