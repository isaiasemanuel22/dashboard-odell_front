import { Component } from '@angular/core';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brand/brand.service';
import { ColorService } from '../../../services/color/color.service';

@Component({
  selector: 'odell-color',
  standalone:true,
  imports: [FormComponent, InputComponent,ReactiveFormsModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent {
 colorForm!:FormGroup;

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
