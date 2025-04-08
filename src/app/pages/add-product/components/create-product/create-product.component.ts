import { AsyncPipe, NgFor, NgIf, } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../../commons/form/input/input.component";
import { SelectComponent } from "../../../../commons/form/select/select.component";
import { FileComponent } from "../../../../commons/form/file/file.component";
import { firstValueFrom, map, Observable, Subject, takeUntil } from 'rxjs';
import { FormComponent } from "../../../../commons/form/form/form.component";
import { Store } from '@ngrx/store';
import { allConfigMachine } from '../../../../store/machine/machine.selectors';
import { allTypeMaterialsSelector } from '../../../../store/typeMaterial/typeMaterial.selectors';
import { ButtonComponent } from '../../../../commons/form/button/button.component';
import { AutocompleteComponent } from '../../../../commons/form/autocomplete/autocomplete.component';
import { allSupplements } from '../../../../store/products/products.selector';
import { Product } from '../../../../services/models/product.interface';
import { faClose, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TypeMaterial } from '../../../../services/models/TypeMaterial.interface';

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
export class CreateProductComponent implements OnDestroy {
  @Output() dataProduct:EventEmitter<any> = new EventEmitter();

  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  $suplements:Observable<any> = new Subject();
  $suplementsAutocomplete:Observable<any> = new Subject();
  $types:Observable<any> = new Subject();
  $materials:Observable<any> = new Subject();

  productForm!: FormGroup;
  iconCross = faClose;
  iconsPlus = faPlus;
  iconsTrash = faTrash;
 
  constructor(
    private readonly fb: FormBuilder,
  ) {

    this.createFormProduct();
    this.addMaterial();
    this.$suplements = this.store.select(allSupplements).pipe(takeUntil(this.destroy$));
    this.$types = this.store.select(allConfigMachine).pipe(takeUntil(this.destroy$));
    this.$materials = this.store.select(allTypeMaterialsSelector).pipe(takeUntil(this.destroy$));
    this.$suplementsAutocomplete = this.$suplements.pipe(
      map((supplements:Product[])=>{
      return supplements.map((supplement:any)=>{
        return {
          id:supplement.id,
          name:supplement.name
        }
      })
    }),
    takeUntil(this.destroy$)
  )
  }

  async onSubmit() {
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

  
  formControlNameMaterials(index:number, name:string):FormControl{
    return this.materials.at(index).get(name) as FormControl
  }




  createFormProduct(){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      cant: [0, [Validators.required]],
      horas: [0 , [Validators.required]],
      photos: [[]],
      extras: [[]],
      materials: this.fb.array([]),
      supplement:[false],
      product:[true],
      type:[0]
    });
  }

  get materials(): FormArray {
    return this.productForm.get('materials') as FormArray;
  }

  createFormTypeMaterial()
  {
    return this.fb.group({
      gramos: [0, Validators.required],
      material:[null]
    })
  }

  addMaterial(): void {
    this.materials.push(this.createFormTypeMaterial());
  }
  
  removeMaterial(index: number): void {
    this.materials.removeAt(index);
  }
  

  addListSelected(option:any){
    firstValueFrom(this.$suplements.pipe((
      map((supplements:Product[])=>{
        return supplements.find((supplement:any)=>supplement.id === option.id)}
    )))).then((findProduct)=>{
      this.productForm.patchValue({extras: [...this.productForm.value.extras, findProduct]});
    })
  }

  deleteExtra(index:number){
    let extras:any[] = this.productForm.value.extras;
    let newExtras = extras.filter((extra:any, i:number)=>i !== index);
    this.productForm.patchValue({extras:newExtras});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
