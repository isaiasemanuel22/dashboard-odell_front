import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = environment.apiBaseUrl; // Obtén la base URL del entorno
    // Clonamos la solicitud original, agregando la base URL
    const clonedRequest = req.clone({
      url: apiUrl + req.url // Concatenamos la base URL con la ruta
    });
    clonedRequest.headers.set('content-type' , 'application/json; charset=utf-8');
    clonedRequest.headers.set('Access-Control-Allow-Origin','');
    console.log(clonedRequest);
    return next.handle(clonedRequest); // Pasamos la solicitud modificada
  }
}

export const ApiBaseUrlInterceptor2 :HttpInterceptorFn = (req, next) => {
    console.log(req);
    console.log("Request is on its way");
    const apiUrl = environment.apiBaseUrl; 
    

    const clonedRequest = req.clone({
      url: apiUrl + req.url 
    });
    return next(clonedRequest);
  }