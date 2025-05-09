import { Component, Input} from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { InputGeneral } from '../input.class';

@Component({
    selector: 'odell-select',
    standalone:true,
    imports: [FormsModule, NgIf, NgFor , ReactiveFormsModule],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    providers: []
})
export class SelectComponent extends InputGeneral {

    @Input() options:any[] =[]

}