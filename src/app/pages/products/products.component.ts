import { Component, inject, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ListProductsComponent } from './compoents/list-products/list-products.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './compoents/odell-filters/odell-filters.component';
import { SearchComponent } from './compoents/search/search.component';
import { Store } from '@ngrx/store';
import { allProductsSelector } from '../../store/products/products.selector';

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
    this.$listProducts = this.store.select(allProductsSelector).pipe(takeUntil(this.destroy$))  ;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
