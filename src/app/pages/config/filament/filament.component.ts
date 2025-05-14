import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { FormComponent } from '../../../commons/form/form/form.component';
import { SelectComponent } from '../../../commons/form/select/select.component';
import { combineLatest,Observable, Subject, takeUntil } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { Filament } from '../../../services/models/Filament.interface';
import { Store } from '@ngrx/store';
import { addFilament, updateFilament } from '../../../store/filaments/filaments.actions';
import { allBrandsSelector } from '../../../store/brand/brand.selector';
import { allTypeMaterialsSelector } from '../../../store/typeMaterial/typeMaterial.selectors';
import { allColorsSelector } from '../../../store/colors/colors.selectors';
import { notNullValidator } from '../../../commons/form/validators.custom';

@Component({
    selector: 'odell-filament',
    standalone:true,
    imports: [ReactiveFormsModule, NgIf, InputComponent, FormComponent, SelectComponent, NgFor, ButtonComponent],
    templateUrl: './filament.component.html',
    styleUrl: './filament.component.scss'
})
export class FilamentComponent implements OnInit, OnDestroy{

  @Input()set dataFilament(data:Filament | undefined){
    this.dataFilamentEdit = data;
  }

  @Output() dataFilamentChange = new EventEmitter<boolean>();

  private readonly destroy$ = new Subject<void>();
  private readonly store = inject(Store);

    public isLoading = true;
    filamentForm!:FormGroup;
    dataFilamentEdit:any;
    $listMaterials:Observable<any>;
    $listColors:Observable<any>;
    $listBrand:Observable<any>;
    colorOptions:any[] = [];
    brandOptions:any[] = [];
    materialOptions:any[] = [];
    editFilament = false;

    constructor(
      private readonly fb:FormBuilder,
      private readonly cdr:ChangeDetectorRef
    ){
      this.$listMaterials = this.store.select(allTypeMaterialsSelector).pipe(takeUntil(this.destroy$));
      this.$listColors = this.store.select(allColorsSelector).pipe(takeUntil(this.destroy$))
      this.$listBrand = this.store.select(allBrandsSelector).pipe(takeUntil(this.destroy$));
    }
  

    ngOnInit(): void {
      combineLatest({
        colors: this.$listColors,
        brands: this.$listBrand,
        materials: this.$listMaterials
      }).subscribe(
        (result) => {
          this.colorOptions = result.colors;
          this.brandOptions = result.brands;
          this.materialOptions = result.materials;
          this.createFormFilament();
          this.createAndPathValue(this.dataFilamentEdit);
          this.cdr.detectChanges();
          this.isLoading = false; 
        },
        (error) => {
          console.error('Error en las peticiones:', error);
          this.isLoading = false;
        }
      );
 
    }

    onSubmit() {
      if (this.filamentForm.valid) {
        if(this.editFilament){
          const filament ={
            id: this.dataFilamentEdit.id,
            data:this.filamentForm.value
          }
          this.store.dispatch(updateFilament({filament}));
        }else{
          this.store.dispatch(addFilament({filament:this.filamentForm.value}));
        }
        this.dataFilamentChange.emit(true);
      }
    }
  
      formControlName(name:string):FormControl{
        return this.filamentForm.get(name) as FormControl;
      }

      createFormFilament(form:any = {
        kgMaterial: 0,
        brandFilament:null,
        typeMaterial:null,
        stock:0,
        color:null, 
        price:0,
      }){
        this.filamentForm = this.fb.group({
          kgMaterial: [form.kgMaterial, [Validators.required]],
          brandFilament: [form.brandFilament, [Validators.required, notNullValidator()]],
          typeMaterial: [form.typeMaterial, [Validators.required , notNullValidator()]],
          stock:[form.stock, [Validators.required ] , ],
          color:[form.color, [Validators.required ,  notNullValidator()]],
          price:[form.price, [Validators.required ]],
        })
      }


      createAndPathValue(data:any){
        if(data !== undefined && this.filamentForm){
         this.editFilament = true;
         console.log(data);
          const formDataDefaul:{
            kgMaterial: number,
            brandFilament:string,
            typeMaterial:string,
            stock:number,
            color:string, 
            price:number,
          } = {
            kgMaterial: data.kgMaterial,
            brandFilament: data.brandFilament ? data.brandFilament.id : null,
            typeMaterial:data.typeMaterial ? data.typeMaterial.id : null,
            stock:data.stock,
            color:data.color ? data.color.id : null, 
            price:data.price,
          }
          this.filamentForm.patchValue(formDataDefaul);
        }
        else{
          this.editFilament = false;
        }
      }
    
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
