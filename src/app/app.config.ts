import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApiBaseUrlInterceptor2 } from './interceptor/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([ApiBaseUrlInterceptor2])),
    provideClientHydration(),
    provideCharts(withDefaultRegisterables()),

  ]
}


