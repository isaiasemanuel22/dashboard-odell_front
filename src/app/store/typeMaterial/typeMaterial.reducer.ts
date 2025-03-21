import { createReducer, on } from "@ngrx/store";
import { TypeMaterial } from "../../services/models/TypeMaterial.interface";
import { addTypeMaterialFailure, deleteTypeMaterialFailure, loadTypeMaterialsFailure, loadTypeMaterialsSuccess, updateTypeMaterialFailure } from "./typeMaterial.actions";

export interface TypeMaterialState {
    typeMaterials:TypeMaterial[],
    error:string | undefined
}

export const initialState:TypeMaterialState = {
    typeMaterials: [],
    error: undefined
}

export const typeMaterialReducer = createReducer(
    initialState, 
    on(loadTypeMaterialsSuccess, (state, { typeMaterials }) => {
        return { ...state, typeMaterials }
    }),
    on(loadTypeMaterialsFailure, (state , {error})=> {
        return { ...state, error }
    }),
    on(addTypeMaterialFailure,(state , {error})=> {
        return {...state , error}
    }),
    on(updateTypeMaterialFailure,(state, {error})=> {
        return {...state , error}
    }),
    on(deleteTypeMaterialFailure,(state , {error})=> {
        return {...state,error}
    })
)