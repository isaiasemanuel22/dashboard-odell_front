import { NgClass, NgIf } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputGeneral } from '../input.class';

@Component({
    selector: 'odell-input',
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
export class InputComponent extends InputGeneral implements OnInit {
  @Input() type = 'text' 

  @Input() size = 'auto';
}
