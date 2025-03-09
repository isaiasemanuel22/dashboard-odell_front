import { Component } from '@angular/core';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsService } from '../../services/products/products.service';
import { ProductDTO } from '../../services/models/product.interface';



@Component({
    selector: 'odell-add-product',
    imports: [CreateProductComponent],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.scss'
})
export class AddProductComponent {


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

    this.productService.createProduct(saveProduct);
  }

}
