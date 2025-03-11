
import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const ApiBaseUrlInterceptor2 :HttpInterceptorFn = (req, next) => {
    const apiUrl = environment.apiBaseUrl; 

    const clonedRequest = req.clone({
      url: apiUrl + req.url 
    });
    clonedRequest.headers.set('content-type' , 'application/json; charset=utf-8');
    clonedRequest.headers.set('Access-Control-Allow-Origin','');
    return next(clonedRequest);
  }