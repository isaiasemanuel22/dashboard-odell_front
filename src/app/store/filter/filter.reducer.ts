import { createReducer, on } from '@ngrx/store';
import * as FilterActions from './filter.actions';

export interface FilterState {
  search: string;
  orderBy: FilterActions.orderBy
  direction: FilterActions.direction
  productType: FilterActions.productType
}

export const initialState: FilterState = {
  search: '',
  orderBy: FilterActions.orderBy.name,
  direction: FilterActions.direction.asc,
  productType: FilterActions.productType.all
};

export const filterReducer = createReducer(
  initialState,
  on(FilterActions.setFilter, (state, { search }) => ({
    ...state,
    search
  })),
  on(FilterActions.setOrder, (state, { orderBy, direction }) => ({
    ...state,
    orderBy,
    direction
  })),
  on(FilterActions.setType, (state , {productType })=> ({
    ...state,
    productType
  }))
);