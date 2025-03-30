import { Component, inject } from '@angular/core';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsService } from '../../services/products/products.service';
import { ProductDTO } from '../../services/models/product.interface';
import { Store } from '@ngrx/store';
import { addProduct } from '../../store/products/products.actions';



@Component({
    selector: 'odell-add-product',
    imports: [CreateProductComponent],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  private readonly store = inject(Store)

  constructor(private readonly productService:ProductsService){

  }
  saveProduct(product:any){
    let saveProduct:ProductDTO = {
      name: product.name,
      cant: product.cant,
      cost: 0,
      price: 0,
      photos: product.photos,
      bill:{
        hours: product.horas,
        grams: product.gramos
      },
      supplement:product.supplement,
      product:product.product
    }
    this.store.dispatch(addProduct({product:saveProduct}))
  }

}
