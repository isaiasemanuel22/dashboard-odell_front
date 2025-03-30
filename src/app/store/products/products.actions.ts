import { createAction, props } from "@ngrx/store";
import { Product, ProductDTO } from "../../services/models/product.interface";

export const loadProducts = createAction('[Products] loadProducts');

export const loadProductsSuccess = createAction('[Products] loadProductsSuccess', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Products] loadProductsFailure', props<{ error: string }>());

export const addProduct = createAction('[Products] addProduct', props<{ product: ProductDTO }>());

export const addProductSuccess = createAction('[Products] addProductSuccess');

export const deleteProduct = createAction('[Product] deleteProduct', props<{ id: string }>());

export const deleteProductSuccess = createAction('[Product] deleteProductSuccess');

export const updateProduct = createAction('[Product] updateProduct', props<{ id:string, product: ProductDTO }>());

export const updateProductSuccess = createAction('[Product] updateProductSuccess');
