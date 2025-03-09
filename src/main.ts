/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { loadTranslations } from '@angular/localize';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


fetch(`/assets/locale/messages.es.json`)
  .then(response => response.json())
  .then(translations => {
    loadTranslations(translations);
  });