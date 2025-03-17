import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { FormComponent } from '../../../commons/form/form/form.component';
import { SelectComponent } from '../../../commons/form/select/select.component';
import { TypeMaterialService } from '../../../services/typeMaterial/type-material.service';
import { forkJoin, Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ColorService } from '../../../services/color/color.service';
import { BrandService } from '../../../services/brand/brand.service';
import { FilamentService } from '../../../services/filament/filament.service';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { Filament } from '../../../services/models/Filament.interface';
import { Store } from '@ngrx/store';
import { addFilament, updateFilament } from '../../../store/filaments.actions';

@Component({
    selector: 'odell-filament',
    standalone:true,
    imports: [ReactiveFormsModule, NgIf, InputComponent, FormComponent, SelectComponent, NgFor, ButtonComponent],
    templateUrl: './filament.component.html',
    styleUrl: './filament.component.scss'
})
export class FilamentComponent {

  @Input()set dataFilament(data:Filament | undefined){
    this.dataFilamentEdit = data;
  }

  @Output() dataFilamentChange = new EventEmitter<boolean>()

    public isLoading = true;
    filamentForm!:FormGroup;
    dataFilamentEdit:any;
    $listMaterials:Observable<any>;
    $listColors:Observable<any>;
    $listBrand:Observable<any>;
    colorOptions:any[] = []
    brandOptions:any[] = []
    materialOptions:any[] = []
    private editFilament = false;
    store = inject(Store);
    constructor(
      private readonly fb:FormBuilder,
      private readonly typeMaterialService:TypeMaterialService,
      private readonly colorsService:ColorService,
      private readonly brandService:BrandService,
      private readonly filamentService:FilamentService,
      private readonly cdr:ChangeDetectorRef
    ){
      this.$listMaterials = this.typeMaterialService.getAllTypeMaterialsName();
      this.$listColors = this.colorsService.getColors();
      this.$listBrand = this.brandService.getBrands();
    }
  

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      forkJoin({
        colors: this.$listColors,
        brands: this.$listBrand,
        materials: this.$listMaterials
      }).subscribe(
        (result) => {
          this.colorOptions = result.colors;
          this.brandOptions = result.brands;
          this.materialOptions = result.materials;
          this.isLoading = false; 
          this.createFormFilament();
          this.createAndPathValue(this.dataFilamentEdit);
          this.cdr.detectChanges(); // Cuando  está listo, habilita el formulario
        },
        (error) => {
          console.error('Error en las peticiones:', error);
          this.isLoading = false; // En caso de error, también lo habilitamos (según el caso)
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
          brandFilament: [form.brandFilament, [Validators.required]],
          typeMaterial: [form.typeMaterial, [Validators.required]],
          stock:[form.stock, [Validators.required]],
          color:[form.color, [Validators.required]],
          price:[form.price, [Validators.required]],
        })
      }


      createAndPathValue(data:any){
        if(data !== undefined && this.filamentForm){
         this.editFilament = true;
          const formDataDefaul:{
            kgMaterial: number,
            brandFilament:string,
            typeMaterial:string,
            stock:number,
            color:string, 
            price:number,
          } = {
            kgMaterial: data.kgMaterial,
            brandFilament: data.brandFilament!.id,
            typeMaterial:data.typeMaterial!.id,
            stock:data.stock,
            color:data.color ? data.color.id : null, 
            price:data.price,
          }
          console.log('valor de color' , formDataDefaul.color)
          this.filamentForm.get('typeMaterial')!.setValue(formDataDefaul.typeMaterial);
          this.filamentForm.patchValue(formDataDefaul);
        }
        else{
          this.editFilament = false;
        }
      }
    
}
