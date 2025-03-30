import { createReducer, on } from "@ngrx/store";
import { Product } from "../../services/models/product.interface";
import { loadProductsFailure, loadProductsSuccess } from "./products.actions";

export interface ProductsState{
    products: Product[],
    error:string | undefined
}

export const initialState:ProductsState={
    products:[],
    error:undefined
}

export const productsReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, {products}) => (
         {...state,products
        }
    )),
    on(loadProductsFailure, (state, {error}) => ({...state, error})),
)