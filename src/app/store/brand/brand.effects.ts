import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addBrand, addBrandFailure, addBrandSuccess, deleteBrand, deleteBrandFailure, deleteBrandSuccess, loadBrands, loadBrandsFailure, loadBrandsSuccess, updateBrand, updateBrandFailure, updateBrandSuccess } from "./brand.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { BrandService } from "../../services/brand/brand.service";
import { loadFilaments } from "../filaments/filaments.actions";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()

export class EffectsBrand {
     private readonly actions$ = inject(Actions);

    $loadBrands = createEffect(()=> 
        this.actions$.pipe(
            ofType(loadBrands),
            mergeMap(()=>
                this.brandService.getBrands().pipe(
                    map(brands => loadBrandsSuccess({brands})),
                    catchError((error)=> of(loadBrandsFailure({error:error.message})))
                )
            )
        )
     )

     $addBrand = createEffect(()=> 
        this.actions$.pipe(
            ofType(addBrand),
            mergeMap(({name})=> 
                this.brandService.addBrand(name).pipe(
                    mergeMap(()=> [
                        addBrandSuccess(),
                        notificationSuccess({message:'Marca agregada'})
                    ]),
                    catchError((error)=> of(
                        addBrandFailure({error:error.message}),
                        notificationFailure({message:'Error al agregar marca'})
                    ))
                )
            )
        )
    )

    $delete = createEffect(()=> 
        this.actions$.pipe(
            ofType(deleteBrand),
            mergeMap(({id})=> 
                this.brandService.deleteBrand(id).pipe(
                    mergeMap(()=> 
                        [
                            deleteBrandSuccess(),
                            notificationSuccess({message:'Se ha borrado la marca'}),
                        ]),
                    catchError((error)=> of(
                        deleteBrandFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido borrar la marca'})
                    ))
                )
            )
        )
    )

    $update = createEffect(()=>
        this.actions$.pipe(
            ofType(updateBrand),
            mergeMap(({id, name})=> 
                this.brandService.updateBrand(id,name).pipe(
                    mergeMap(()=> [
                        updateBrandSuccess(),
                        notificationSuccess({message:'Se ha actualizado la marca'})
                    ]),
                    catchError((error)=>of(
                        updateBrandFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido actualizar la marca'})
                  ))
                )
            )
        )
    )

    $reloadBrands = createEffect(()=> 
        this.actions$.pipe(
            ofType(
                addBrandSuccess,
                updateBrandSuccess,
                deleteBrandSuccess
            ),
            mergeMap(()=>[
                loadBrands(),
                loadFilaments()
            ]
            )
        )
    )

     constructor(private readonly brandService:BrandService){}


    
}