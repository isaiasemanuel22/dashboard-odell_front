import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'odell-tab-table',
    imports: [],
    templateUrl: './tab-table.component.html',
    styleUrl: './tab-table.component.scss'
})
export class TabTableComponent {

  @Input() valueName:string = '';
  @ContentChild('name') nameTab: ElementRef | undefined; 

  get value(){
    return {
      valueName:this.valueName,
      name : this.nameTab?.nativeElement
  }
  }
}
