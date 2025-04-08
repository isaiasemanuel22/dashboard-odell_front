import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
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
  @Input() brandData:BrandFilament | null = null;
  @Output() dataBrandChange:EventEmitter<boolean> = new EventEmitter();

  private readonly store = inject(Store);

  brandForm!:FormGroup;
  editForm = false;

  constructor(private readonly fb:FormBuilder){
    this.brandForm = this.fb.group({
      name: [''],
    })
  }

  ngOnInit(): void {
    let data = this.brandData ? this.brandData.name : ''
    this.brandForm = this.fb.group({
      name: [data],
    })
  }
  onSubmit() {
    if (this.brandForm.valid) {
      if(this.brandData){
          const dataUpdate = {
            id:this.brandData.id,
            name:this.brandForm.value
          }
          this.store.dispatch(updateBrand(dataUpdate))
        }
      else{
        this.store.dispatch(addBrand(this.brandForm.value))
      }
      this.dataBrandChange.emit(true);
      this.brandForm.reset();
    }
  }

  formControlName(name:string):FormControl{
      return this.brandForm.get(name) as FormControl;
  }
  
}
