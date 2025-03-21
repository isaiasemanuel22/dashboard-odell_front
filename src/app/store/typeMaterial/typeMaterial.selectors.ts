import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TypeMaterialState } from "./typeMaterial.reducer";

export const typeMaterialState = createFeatureSelector<TypeMaterialState>('typeMaterials');

export const allTypeMaterialsSelector = createSelector(typeMaterialState, (state) => state.typeMaterials);

export const typeMaterialError = createSelector(typeMaterialState , (state)=> state.error);