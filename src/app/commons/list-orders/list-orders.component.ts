import { Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { CardResumeComponent } from "../card-resume/card-resume.component";

@Component({
    selector: 'odell-list-orders',
    standalone:true,
    imports: [NgFor, NgIf, CardResumeComponent],
    templateUrl: './list-orders.component.html',
    styleUrl: './list-orders.component.scss'
})
export class ListOrdersComponent {

  titles:any[] = [];


  items:any = [
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    },
    {
      id:1234,
      name:'producto1',
      cant:'2',
      price:'323'
    }
  ]


  constructor(){
    this.titles = Object.keys(this.items[0]);
  }
}
