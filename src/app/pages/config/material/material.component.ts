import { Component } from '@angular/core';
import { FormComponent } from "../../../commons/form/form/form.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { TypeMaterialService } from '../../../services/typeMaterial/type-material.service';


@Component({
    selector: 'odell-material',
    standalone:true,
    imports: [FormComponent, ReactiveFormsModule, InputComponent],
    templateUrl: './material.component.html',
    styleUrl: './material.component.scss'
})
export class MaterialComponent {

  materialForm!:FormGroup;

  constructor(private readonly fb:FormBuilder, private readonly typeMaterialService:TypeMaterialService){
    this.materialForm = this.fb.group({
      name: [],
    })
  }
  onSubmit() {
    if (this.materialForm.valid) {
     this.typeMaterialService.setTypeMaterial(this.materialForm.value);
    }
  }

  formControlName(name:string):FormControl{
      return this.materialForm.get(name) as FormControl;
  }
  

}
