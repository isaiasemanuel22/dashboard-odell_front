import { Component, Input, OnInit} from '@angular/core';
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
export class SelectComponent extends InputGeneral implements OnInit {

    @Input() options:any[] =[]

    ngOnInit(): void {
        if (this.formControl) {
            console.log(this.formControl.value);
            this.value = 1;
        } else {
            console.warn('⚠️ FormControl no está definido en SelectComponent');
        }
    }
}