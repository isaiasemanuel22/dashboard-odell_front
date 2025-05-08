import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess} from "./products.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ProductsService } from "../../services/products/products.service";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";
import { Route, Router } from "@angular/router";

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

    $deleteProduct = createEffect(()=>
        this.$actions.pipe(
            ofType(deleteProduct),
            mergeMap(({id})=> 
                this.productService.deleteProduct(id).pipe(
                    mergeMap(()=> [
                        deleteProductSuccess(),
                        notificationSuccess({message:'Se ha podido eliminar el producto'}),
                    ]),
                    tap(() => {
                        this.router.navigate(['/products']); // Navega a la lista de productos después de la eliminación
                    }),
                    catchError((error:any)=> of(
                        loadProductsFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido agregar el producto'})
                    ))
                )
            )
        )
    )

   
       $reloadProducts = createEffect(()=>
           this.$actions.pipe(
               ofType(
                   addProductSuccess,
                   deleteProductSuccess,
               ),
               mergeMap(()=> [
                   loadProducts()
               ]
               )
           )
       )


    constructor(private readonly productService:ProductsService , private readonly router:Router){}
}