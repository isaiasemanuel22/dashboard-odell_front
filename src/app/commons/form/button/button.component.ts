import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'odell-button',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() type:'primary'|'secondary'|'delete'|'disabled' = 'primary'; 
  @Input() typeButton='button'
  @Input() set disabled(disabled:boolean){
    console.log(disabled);
    this.typeStyle = disabled ? 'disabled' : this.type;
  }
  typeStyle:'primary'|'secondary'|'delete'|'disabled' = 'primary'; 
  isDisabled = false;
  @Output() handler:EventEmitter<boolean> = new EventEmitter();


  handlerBtn(){
    if(!this.isDisabled){
      this.handler.emit(true);
    }
  }
}
