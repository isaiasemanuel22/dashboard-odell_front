import { Component, inject, OnDestroy } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { ListProductsComponent } from './compoents/list-products/list-products.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './compoents/odell-filters/odell-filters.component';
import { SearchComponent } from './compoents/search/search.component';
import { Store } from '@ngrx/store';
import { allProductsSelector } from '../../store/products/products.selector';
import { selectSearch, selectOrderBy, selectDirection, selectType } from '../../store/filter/filter.selector';

@Component({
    selector: 'odell-products',
    imports: [ListProductsComponent, FiltersComponent, CommonModule, SearchComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy{
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();
  $listProducts:Observable<any> = new Observable<any>();

  constructor() {
    this.$listProducts =  combineLatest([
      this.store.select(allProductsSelector),
      this.store.select(selectSearch),
      this.store.select(selectOrderBy),
      this.store.select(selectDirection),
      this.store.select(selectType)
    ]).pipe(
      map(([products, search, orderBy, direction ,type ]) => {
        let result = [...products];
    
        // 1. Filtrar por search
        if (search) {
          result = result.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
        }
    
        // 2. Aplicar ordenamiento/filtro extra
        switch (orderBy) {
          case 'name':
            result = result.sort((a, b) => {
              const comparison = a.name.localeCompare(b.name);
              return direction === 'asc' ? comparison : -comparison;
            });
            break;
    
          case 'price':
            result = result.sort((a, b) => {
              const comparison = a.price - b.price;
              return direction === 'asc' ? comparison : -comparison;
            });
            break;
          default:
            break;
        }

        switch(type){
          case 'supplements':
            result = result.filter((product)=> product.supplement);

            break;
          case'products':
            result = result.filter((products)=> products.product);
        }

      
        return result;
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
