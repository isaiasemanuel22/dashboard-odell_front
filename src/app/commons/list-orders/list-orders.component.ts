import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { CardResumeComponent } from "../card-resume/card-resume.component";


@Component({
    selector: 'odell-list',
    standalone:true,
    imports: [NgFor, NgIf, CardResumeComponent],
    templateUrl: './list-orders.component.html',
    styleUrl: './list-orders.component.scss'
})
export class ListComponent {


  @Input() items:any[] = []
  @Input() btnedit:boolean = false
  @Input() btndelete:boolean = false

  @Output() btn:EventEmitter<any> = new EventEmitter<any>();

  titles:any[] = [];
  constructor(){
  }

  ngOnInit(): void {
    this.titles = this.createTitles(this.items);
    console.log(this.titles);
  }

  createTitles(items:any[]){
    if(items !== null && items.length !== 0 ){
      let obj = items[0] || {}
        return Object.keys(obj);
      }else{
        return []
      }
    }

    handlerBtn(action:any , data:any){
      this.btn.emit({action:action , data:data});
    }
  }

