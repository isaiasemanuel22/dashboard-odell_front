import { Component, inject } from '@angular/core';
import { CreateProductComponent } from './components/create-product/create-product.component';
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

  saveProduct(product:any){
    this.store.dispatch(addProduct({product:product}))
  }

}
