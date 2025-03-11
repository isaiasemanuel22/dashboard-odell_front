import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { FormComponent } from '../../../commons/form/form/form.component';
import { SelectComponent } from '../../../commons/form/select/select.component';
import { TypeMaterialService } from '../../../services/typeMaterial/type-material.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { ColorService } from '../../../services/color/color.service';
import { BrandService } from '../../../services/brand/brand.service';
import { FilamentService } from '../../../services/filament/filament.service';

@Component({
    selector: 'odell-filament',
    standalone:true,
    imports: [ReactiveFormsModule, InputComponent, FormComponent, SelectComponent, AsyncPipe, NgFor],
    templateUrl: './filament.component.html',
    styleUrl: './filament.component.scss'
})
export class FilamentComponent {


    filamentForm!:FormGroup;
    $listMaterials:Observable<any>;
    $listColors:Observable<any>;
    $listBrand:Observable<any>;
  
    constructor(
      private readonly fb:FormBuilder,
      private readonly typeMaterialService:TypeMaterialService,
      private readonly colorsService:ColorService,
      private readonly brandService:BrandService,
      private readonly filamentService:FilamentService
    ){
      this.filamentForm = this.fb.group({
        kgMaterial: ['', [Validators.required]],
        brandFilament: [0, [Validators.required]],
        typeMaterial: [0, [Validators.required]],
        cant:[0, [Validators.required]],
        color:[0, [Validators.required]],
        price:[0, [Validators.required]],
      })

      this.$listMaterials = this.typeMaterialService.getAllTypeMaterialsName();
      this.$listColors = this.colorsService.getColors();
      this.$listBrand = this.brandService.getBrands();
    }
  
    onSubmit() {
      if (this.filamentForm.valid) {
        this.filamentService.addFilament(this.filamentForm.value).toPromise().then((response)=>{
          console.log(response);
        })
      }
    }
  
      formControlName(name:string):FormControl{
        return this.filamentForm.get(name) as FormControl;
      }
    
}
