import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './commons/layout/header/header.component';
import { Store } from '@ngrx/store';
import { loadApp } from './store/initial.actions';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'odell-dashboard';
  store = inject(Store);

  constructor(){
    this.store.dispatch(loadApp());
  }
}
