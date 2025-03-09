import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'odell-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  routes = routes.map((route)=> {
      return {
        title:route.title,
        path:route.path ? route.path : ''
      }
    
  }).filter((path)=> {
    return path.path !== '**' 
  }) ;
  
}
