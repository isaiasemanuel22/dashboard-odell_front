import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";

export const productsState = createFeatureSelector<ProductsState>('products');

export const allProductsSelector = createSelector(productsState , (state) => state.products);

export const allSupplements = createSelector(productsState , (state) => state.products.filter((product) => product.supplement));

export const error = createSelector(productsState, (state)=> state.error);
