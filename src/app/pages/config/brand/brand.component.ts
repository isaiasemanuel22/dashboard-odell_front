import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
import { BrandService } from '../../../services/brand/brand.service';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { BrandFilament } from '../../../services/models/BrandFilament.interface';
import { Store } from '@ngrx/store';
import { addBrand, updateBrand } from '../../../store/brand/brand.actions';

@Component({
  selector: 'odell-brand',
  standalone:true,
  imports: [FormComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  @Input() brandData:BrandFilament | undefined;
  brandForm!:FormGroup;
  editForm = false;

   store = inject(Store);
  constructor(private readonly fb:FormBuilder, private readonly brandService:BrandService){
    this.brandForm = this.fb.group({
      name: [],
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let data = this.brandData ? this.brandData : {name:''}
    this.editForm = !!this.brandData;
    this.brandForm = this.fb.group({
      name: [data.name],
    })
  }
  onSubmit() {
    if (this.brandForm.valid) {
      if(this.editForm){
        if(this.brandData){
          const dataUpdate = {
            id:this.brandData.id,
            name:this.brandForm.value
          }
          this.store.dispatch(updateBrand(dataUpdate))
        }
      }else{
        this.store.dispatch(addBrand(this.brandForm.value))
      }
      this.brandForm.reset();
    }
  }

  formControlName(name:string):FormControl{
      return this.brandForm.get(name) as FormControl;
  }
  
}
