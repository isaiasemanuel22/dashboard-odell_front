import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApiBaseUrlInterceptor, ApiBaseUrlInterceptor2 } from './interceptor/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([ApiBaseUrlInterceptor2])),
    provideClientHydration(),
    provideCharts(withDefaultRegisterables()),

  ]
}

export const HTTP_INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiBaseUrlInterceptor,
    multi: true, // Esto permite agregar múltiples interceptores si es necesario
  },
];

