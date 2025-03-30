import { AsyncPipe, NgFor, NgIf, } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../../commons/form/input/input.component";
import { SelectComponent } from "../../../../commons/form/select/select.component";
import { FileComponent } from "../../../../commons/form/file/file.component";
import { firstValueFrom, map, Observable, Subject } from 'rxjs';
import { FormComponent } from "../../../../commons/form/form/form.component";
import { Store } from '@ngrx/store';
import { allConfigMachine } from '../../../../store/machine/machine.selectors';
import { allTypeMaterialsSelector } from '../../../../store/typeMaterial/typeMaterial.selectors';
import { ButtonComponent } from '../../../../commons/form/button/button.component';
import { AutocompleteComponent } from '../../../../commons/form/autocomplete/autocomplete.component';
import { allSupplements } from '../../../../store/products/products.selector';
import { Product } from '../../../../services/models/product.interface';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'odell-create-product',
    imports: [ReactiveFormsModule, 
      NgFor, 
      NgIf,
      InputComponent,
      SelectComponent, 
      FileComponent,
      AsyncPipe,
      FormComponent,
      ButtonComponent,
      AutocompleteComponent,
      FontAwesomeModule],
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  private readonly store = inject(Store);
  productForm: FormGroup;
  $suplements:Observable<any> = new Subject();
  $suplementsAutocomplete:Observable<any> = new Subject();
  $types:Observable<any> = new Subject();
  $materials:Observable<any> = new Subject();
   iconCross = faClose;
  @Output() dataProduct:EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      cant: [0, [Validators.required]],
      gramos: [0],
      horas: [0],
      photos: [[]],
      extras: [[]],
      parameters: [[]],
      material:[1],
      supplement:[false],
      product:[true],
      type:[0]
    });
    this.$suplements = this.store.select(allSupplements);
    this.$types = this.store.select(allConfigMachine);
    this.$materials = this.store.select(allTypeMaterialsSelector);
    this.$suplementsAutocomplete = this.$suplements.pipe(
      map((supplements:Product[])=>{
      return supplements.map((supplement:any)=>{
        return {
          id:supplement.id,
          name:supplement.name
        }
      })
    }))
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.dataProduct.emit(this.productForm.value);
    }
  }

  onFileChange(event: any) {
    const files:FileList = event.target.files;
    let photos = this.productForm.get('photos')?.value;
    if (files.length > 0) {
      for(let i=0 ; i<files.length ; i++){
        photos.push(files[i]);
      }
      this.productForm.patchValue({ photos: photos });
    }
  }

  selectEMF(event:any){
    const files:FileList = event.target.files;
    this.productForm.patchValue({ parameters: files.item(0) });
  }


  formControlName(name:string):FormControl{
    return this.productForm.get(name) as FormControl
  }

  

  addListSelected(option:any){
    firstValueFrom( this.$suplements.pipe((
      map((supplements:Product[])=>{
        return supplements.find((supplement:any)=>supplement.id === option.id)}
    )))).then((findProduct)=>{
      this.productForm.patchValue({extras: [...this.productForm.value.extras, findProduct]});
      console.log(this.productForm);
    })

   
  }


}
