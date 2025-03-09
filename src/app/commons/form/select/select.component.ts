import { Component, forwardRef } from '@angular/core';
import {  NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputGeneral } from '../input.class';

@Component({
  selector: 'odell-select',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectComponent),
        multi: true
      }
    ]
})
export class SelectComponent extends InputGeneral {


}
