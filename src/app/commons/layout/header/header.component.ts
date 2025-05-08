import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
    selector: 'odell-header',
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  routes = routes.filter((route)=> route.data!['show']).map((route)=> {
      return {
        title:route.title,
        path:route.path ?? ''
    }
  }).filter((path)=> {
    return path.path !== '**' 
  }) ;
  
  constructor(private readonly router:Router){

  }

  routerLink(router:string){
    this.router.navigate([router]);
  }

}
