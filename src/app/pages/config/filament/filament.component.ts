import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { FormComponent } from '../../../commons/form/form/form.component';
import { SelectComponent } from '../../../commons/form/select/select.component';
import { TypeMaterialService } from '../../../services/typeMaterial/type-material.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
    selector: 'odell-filament',
    imports: [ReactiveFormsModule, InputComponent, FormComponent, SelectComponent, AsyncPipe, NgFor],
    templateUrl: './filament.component.html',
    styleUrl: './filament.component.scss'
})
export class FilamentComponent {


    filamentForm!:FormGroup;
    $listMaterials:Observable<any>;
  
    constructor(
      private readonly fb:FormBuilder,
      private readonly typeMaterialService:TypeMaterialService
    ){
      this.filamentForm = this.fb.group({
        kgMaterial: ['', [Validators.required]],
        brandFilament: ['', [Validators.required]],
        typeMaterial: ['', [Validators.required]],
        cant:[0, [Validators.required]],
        color:['', [Validators.required]],
      })

      this.$listMaterials = this.typeMaterialService.getAllTypeMaterialsName();
    }
  
    onSubmit() {
      if (this.filamentForm.valid) {
        console.log(this.filamentForm.value);
      }
    }
  
      formControlName(name:string):FormControl{
        return this.filamentForm.get(name) as FormControl;
      }
    
}
