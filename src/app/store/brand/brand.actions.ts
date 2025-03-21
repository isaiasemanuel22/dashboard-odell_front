import { createAction, props } from "@ngrx/store";
import { BrandFilament } from "../../services/models/BrandFilament.interface";


export const loadBrands = createAction('[Brand] Load Brands');

export const addBrand = createAction('[Brand] Add Brand', props<{ name: string }>());

export const updateBrand = createAction('[Brand] Update Brand', props<{ id: string, name: string }>())

export const deleteBrand = createAction('[Brand] Delete Brand', props<{ id: string }>());

export const loadBrandsSuccess = createAction('[Brand] Load Brands Success', props<{brands:BrandFilament[]}>());

export const loadBrandsFailure = createAction('[Brand] Load Brands Failure', props<{ error: any }>());

export const addBrandSuccess = createAction('[Brand] Add Brand Success');

export const addBrandFailure = createAction('[Brand] Add Brand Failure', props<{ error: any }>());

export const updateBrandSuccess = createAction('[Brand] Update Brand Success');

export const updateBrandFailure = createAction('[Brand] Update Brand Failure', props<{ error: any }>());

export const deleteBrandSuccess = createAction('[Brand] Delete Brand Success');

export const deleteBrandFailure = createAction('[Brand] Delete Brand Failure', props<{ error: any }>());

