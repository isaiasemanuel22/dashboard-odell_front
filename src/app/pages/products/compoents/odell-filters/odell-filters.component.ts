import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { direction, orderBy, productType, setOrder, setType } from '../../../../store/filter/filter.actions';

@Component({
    selector: 'odell-filters',
    imports: [],
    templateUrl: './odell-filters.component.html',
    styleUrl: './odell-filters.component.scss'
})
export class FiltersComponent {
  private readonly store = inject(Store);



    filter(nameFilter:string , value:string){
        switch(nameFilter){
            case 'type':
                switch(value) {
                    case 'all':
                        this.store.dispatch(setType({productType:productType.all}))
                        break;
                    case 'supplements':
                        this.store.dispatch(setType({productType:productType.supplements}))
                        break;
                    case 'products':
                        this.store.dispatch(setType({productType:productType.products})) 
                }
                break;
            
            case 'name':
                value === 'asc'? 
                this.store.dispatch(setOrder({orderBy:orderBy.name , direction:direction.asc})) :
                 this.store.dispatch(setOrder({orderBy:orderBy.name , direction:direction.desc}))
                 break;
            case 'price':
                value === 'asc' ? 
                this.store.dispatch(setOrder({orderBy:orderBy.price , direction:direction.asc})):
                this.store.dispatch(setOrder({orderBy:orderBy.price, direction:direction.desc}));
            
        }
    }
}
