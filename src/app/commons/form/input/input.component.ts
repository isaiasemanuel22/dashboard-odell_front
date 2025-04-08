import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputGeneral } from '../input.class';

@Component({
    selector: 'odell-input',
    standalone:true,
    imports: [ReactiveFormsModule, NgIf, NgClass],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent extends InputGeneral{
  @Input() type = 'text' 
  @Input() placeholder = '';
  @Output() focus:EventEmitter<boolean> = new EventEmitter()


  getFocus(focus:boolean = false){
    this.focus.emit(focus);
  }
}
