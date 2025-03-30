import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProduct, addProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess} from "./products.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductsService } from "../../services/products/products.service";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()
export class EffectsProducts{
    private readonly $actions = inject(Actions);

    $loadProducts = createEffect(()=>
        this.$actions.pipe(
            ofType(loadProducts),
            mergeMap(()=>
                this.productService.getProducts().pipe(
                    map((products:any)=> loadProductsSuccess({products:products})),
                    catchError((error:any)=>of(
                        loadProductsFailure({error:error.message}),
                        notificationFailure({message:'Error al cargar el listado de productos'})
                        
                    ))
                )
            )
        )
    )

    $addProduct = createEffect(()=>
        this.$actions.pipe(
            ofType(addProduct),
            mergeMap(({product}) => this.productService.createProduct(product).pipe(
                mergeMap(() =>[
                     addProductSuccess(),
                     notificationSuccess({message:'Se ha podido agregar el producto'})
                ]),
                catchError((error:any)=> of(
                    loadProductsFailure({error:error.message}),
                    notificationFailure({message:'No se ha podido agregar el producto'})
                ))
            ))
        )
    )
    constructor(private readonly productService:ProductsService){}
}