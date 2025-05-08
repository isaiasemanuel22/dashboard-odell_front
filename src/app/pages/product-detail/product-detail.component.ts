import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { allProductsSelector } from '../../store/products/products.selector';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ProductComponent } from '../products/compoents/product/product.component';
import { ButtonComponent } from "../../commons/form/button/button.component";
import { deleteProduct } from '../../store/products/products.actions';

@Component({
  selector: 'odell-product-detail',
  standalone:true,
  imports: [NgFor, NgIf, AsyncPipe, ProductComponent, ButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private readonly store = inject(Store)
  productDetail:any ;
  product$:Observable<any> = new Observable()

  constructor(private readonly route: ActivatedRoute,private readonly cdr:ChangeDetectorRef) {

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.store.select(allProductsSelector).pipe(
          map(products => products.find(product => product.id === id))
        );
      })
    );

    this.product$.subscribe((product)=> {
      console.log(product);
    })
  }

  deleteProduct(id:string){
    console.log('delete');
    this.store.dispatch(deleteProduct({ id: id }));
  }
}


