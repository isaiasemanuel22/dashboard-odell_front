import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from '../../../commons/form/input/input.component';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { TypeMaterial } from '../../../services/models/TypeMaterial.interface';
import { addTypeMaterial, updateTypeMaterial } from '../../../store/typeMaterial/typeMaterial.actions';


@Component({
    selector: 'odell-material',
    standalone:true,
    imports: [FormComponent, ReactiveFormsModule, InputComponent, ButtonComponent],
    templateUrl: './material.component.html',
    styleUrl: './material.component.scss'
})
export class MaterialComponent {

  @Input() dataMaterial:TypeMaterial | null = null;
  @Output() dataMaterialChange:EventEmitter<boolean> = new EventEmitter();

  private readonly store = inject(Store);

  materialForm!:FormGroup;
  constructor(private readonly fb:FormBuilder){}

  ngOnInit(): void {
    let dataMaterial = this.dataMaterial ? this.dataMaterial.name : null; 
    this.materialForm = this.fb.group({
      name: [dataMaterial],
    })
  }
  onSubmit() {
    if (this.materialForm.valid) {
      if(this.dataMaterial){
        this.store.dispatch(updateTypeMaterial({id: this.dataMaterial.id, name:this.materialForm.value}))
      }else{
        this.store.dispatch(addTypeMaterial({name:this.materialForm.value}))
      }
      this.dataMaterialChange.emit(true);
    }
  }

  formControlName(name:string):FormControl{
      return this.materialForm.get(name) as FormControl;
  }
  

}
