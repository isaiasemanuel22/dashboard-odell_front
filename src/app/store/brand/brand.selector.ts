import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BrandState } from "./brand.reducer";

export const brandState = createFeatureSelector<BrandState>('brands');

export const allBrandsSelector = createSelector(brandState,
    (state: BrandState) => state.brands
)

export const brandError = createSelector(brandState,
    (state:BrandState) => state.error
)