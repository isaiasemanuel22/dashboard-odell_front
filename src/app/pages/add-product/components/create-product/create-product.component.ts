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
import { faClose, faFile, faFileCirclePlus, faFileZipper, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
  iconFilePlus = faFileCirclePlus;
  iconFileZipper = faFileZipper;
  iconFile = faFile;

  fileIcon = ['.3mf','.stl','.obj'];

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

  fileIconName(file:any) {
    const is3DModel = this.fileIcon.some(ext => file.name.toLowerCase().endsWith(ext));
    return is3DModel ? this.iconFile : this.iconFileZipper;
  }

  async onSubmit() {
    if (this.productForm.valid) {
      this.dataProduct.emit(this.productForm.value);
    }
  }

  onFileChange(event: any) {
    this.productForm.patchValue({ photos: [...this.productForm.value.photos , ...event]});
  }

  selectEMF(event:any){
    console.log(event);
    this.productForm.patchValue({ files: [...this.productForm.value.files, ...event]  });
  }


  formControlName(name:string,i:number = -1 ,control:string=''):FormControl{
    if(i < 0){
      return this.productForm.get(name) as FormControl
    }else{
      return (this.productForm.get(name) as FormArray).at(i).get(control) as FormControl;
    }
  }

  createFormProduct(){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      cant: [0, [Validators.required]],
      horas: [0 , [Validators.required]],
      photos: [[]],
      extras: this.fb.array([]),
      materials: this.fb.array([]),
      supplement:[false],
      product:[true],
      type:[0],
      price:[0],
      cost:[0],
      files:[[]]
    });
  }

  get materials(): FormArray {
    return this.productForm.get('materials') as FormArray;
  }

  get extras(): FormArray{
    return this.productForm.get('extras') as FormArray
  }

  createFormTypeMaterial()
  {
    return this.fb.group({
      grams: [0, Validators.required],
      material:[null]
    })
  }

  createExtra(extra:any){
    return this.fb.group({
      cant: [1, Validators.required],
      supplement:[extra]
    })
  }

  addMaterial(): void {
    this.materials.push(this.createFormTypeMaterial());
  }
  
  removeMaterial(index: number): void {
    this.materials.removeAt(index);
  }
  
  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  addListSelected(option:any){
    firstValueFrom(this.$suplements.pipe((
      map((supplements:Product[])=>{
        return supplements.find((supplement:any)=>supplement.id === option.id)}
    )))).then((findProduct)=>{
      this.extras.push(this.createExtra(findProduct));
    })
  }

  deleteExtra(index:number){
    this.extras.removeAt(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dropFile(index:number , control:string ){
    let files = this.formControlName(control).value;
    let newFiles = files.filter((file:any ,i:number )=> i !== index);
    this.formControlName(control).patchValue([...newFiles]);
  }



}
