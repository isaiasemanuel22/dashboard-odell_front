import { AsyncPipe, NgFor, } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../../commons/form/input/input.component";
import { SelectComponent } from "../../../../commons/form/select/select.component";
import { FileComponent } from "../../../../commons/form/file/file.component";
import { ProductsService } from '../../../../services/products/products.service';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from '../../../../services/config/config.service';
import { FormComponent } from "../../../../commons/form/form/form.component";

@Component({
  selector: 'odell-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, InputComponent, SelectComponent, FileComponent, AsyncPipe, FormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {


  productForm: FormGroup;
  $suplements:Observable<any> = new Subject();
  $types:Observable<any> = new Subject();

  @Output() dataProduct:EventEmitter<any> = new EventEmitter();
  constructor(
    private readonly fb: FormBuilder,
    private readonly serviceProduct:ProductsService,
    private readonly configService:ConfigService
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
      product:[true]
    });

    this.$suplements = this.serviceProduct.getSupplement();
    this.$types = this.configService.getTypes();
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
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


}
