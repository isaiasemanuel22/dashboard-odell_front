import { Component, inject } from '@angular/core';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorService } from '../../../services/color/color.service';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { Store } from '@ngrx/store';

@Component({
  selector: 'odell-color',
  standalone:true,
  imports: [FormComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
 colorForm!:FormGroup;
 private readonly store = inject(Store)
  constructor(private readonly fb:FormBuilder, private readonly colorService:ColorService){
    this.colorForm = this.fb.group({
      name: [],
    })
  }


  onSubmit() {
    if (this.colorForm.valid) {
     this.colorService.addColor(this.colorForm.value);
    }
  }

  formControlName(name:string):FormControl{
      return this.colorForm.get(name) as FormControl;
  }
}
