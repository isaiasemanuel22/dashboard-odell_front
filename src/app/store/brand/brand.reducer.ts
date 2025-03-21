import { createReducer, on } from "@ngrx/store";
import { BrandFilament } from "../../services/models/BrandFilament.interface";
import {addBrandFailure, deleteBrandFailure, loadBrandsFailure, loadBrandsSuccess, updateBrandFailure } from "./brand.actions";

export interface BrandState {
   brands:BrandFilament[],
   error:string | undefined;
}

export const appState:BrandState ={
    brands: [],
    error:undefined
}

export const brandReducer = createReducer(
    appState,
    on(
        loadBrandsSuccess , (state ,{ brands })=> {
            return{
                ...state,
                brands:brands
            }
        }
    ),
    on(
        loadBrandsFailure , (state ,{ error })=> {
            return{
                ...state,
                error
            }
        }
    ),
    on(
        addBrandFailure, (state ,{ error })=> {
            return{
                ...state,
                error
            }
        }
    ),
    on(
        deleteBrandFailure , (state ,{ error })=> {
            return{
                ...state,
                error
            }
        }
    ),
    on(
        updateBrandFailure , (state ,{ error })=> {
            return {
                ...state,
                error
            }
        }
    )
)