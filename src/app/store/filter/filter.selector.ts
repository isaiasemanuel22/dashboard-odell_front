import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.reducer';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectSearch = createSelector(
  selectFilterState,
  (state) => state.search
);

export const selectOrderBy = createSelector(
  selectFilterState,
  (state) => state.orderBy
);

export const selectDirection = createSelector(
  selectFilterState,
  (state) => state.direction
);

export const selectType = createSelector(
  selectFilterState,
  (state) => state.productType
);