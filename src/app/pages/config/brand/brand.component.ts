import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
import { BrandService } from '../../../services/brand/brand.service';
import { ButtonComponent } from "../../../commons/form/button/button.component";

@Component({
  selector: 'odell-brand',
  standalone:true,
  imports: [FormComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  brandForm!:FormGroup;

  constructor(private readonly fb:FormBuilder, private readonly brandService:BrandService){
    this.brandForm = this.fb.group({
      name: [],
    })
  }
  onSubmit() {
    if (this.brandForm.valid) {
     this.brandService.addBrand(this.brandForm.value);
    }
  }

  formControlName(name:string):FormControl{
      return this.brandForm.get(name) as FormControl;
  }
}
