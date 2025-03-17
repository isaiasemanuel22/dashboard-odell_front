import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApiBaseUrlInterceptor2 } from './interceptor/interceptor';
import { appEffects, appReducers } from './store/indext';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([ApiBaseUrlInterceptor2])),
    provideClientHydration(),
    provideCharts(withDefaultRegisterables()),
    provideStore(appReducers),
    provideEffects(appEffects),
    provideStoreDevtools({maxAge:25})
  ]
}


