import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addTypeMaterial, addTypeMaterialFailure, addTypeMaterialSuccess, deleteTypeMaterial, deleteTypeMaterialFailure, deleteTypeMaterialSuccess, loadTypeMaterials, loadTypeMaterialsFailure, loadTypeMaterialsSuccess, updateTypeMaterial, updateTypeMaterialFailure, updateTypeMaterialSuccess } from "./typeMaterial.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { TypeMaterialService } from "../../services/typeMaterial/type-material.service";
import { loadFilaments } from "../filaments/filaments.actions";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()
export class EffectsTypeMaterial{
    private readonly actions$ = inject(Actions);

    $loadTypeMaterial = createEffect(()=>
        this.actions$.pipe(
            ofType(loadTypeMaterials),
            mergeMap(()=>
                this.typeMaterialService.getAllTypeMaterials().pipe(
                    map((typeMaterials)=> loadTypeMaterialsSuccess({typeMaterials})),
                    catchError((error)=> of(loadTypeMaterialsFailure({error:error.message})))
                )
            )
        )
    )

    $addTypeMaterial = createEffect(()=>
        this.actions$.pipe(
            ofType(addTypeMaterial),
            mergeMap(({name})=>
                this.typeMaterialService.setTypeMaterial(name).pipe(
                    mergeMap(()=> [
                        addTypeMaterialSuccess(),
                        notificationSuccess({message:'Se ha agregado el material'})
                    ]),
                    catchError((error)=> of(
                        addTypeMaterialFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido agregar el material'})
                    ))
                )
            )
        )
    )

    $updateTypeMaterial = createEffect(()=>
        this.actions$.pipe(
            ofType(updateTypeMaterial),
            mergeMap(({id,name})=>
                this.typeMaterialService.updateMaterial(id,name).pipe(
                    mergeMap(()=> [
                        updateTypeMaterialSuccess(),
                        notificationSuccess({message:'Se ha podido actualizado el material'})
                    ]),
                    catchError((error)=> of(
                        updateTypeMaterialFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido actualizar el material'})
                    ))
                )
            )
        )
    )

    $deleteTypeMaterial = createEffect(()=> 
    this.actions$.pipe(
        ofType(deleteTypeMaterial),
        mergeMap(({id})=>
            this.typeMaterialService.deleteMaterial(id).pipe(
                mergeMap(()=>
                     [
                        deleteTypeMaterialSuccess(),
                        notificationSuccess({message:'Se ha borrado el material'})
                    ]),
                catchError((error)=> of(
                    deleteTypeMaterialFailure({error:error.message}),
                    notificationFailure({message:'No se ha podido borrar el material'})
                ))
            )
        )
    ))

    $reloadTypeMaterials = createEffect(()=> 
        this.actions$.pipe(
            ofType(addTypeMaterialSuccess,
                updateTypeMaterialSuccess,
                deleteTypeMaterialSuccess),
                mergeMap(()=> [
                    loadTypeMaterials(),
                    loadFilaments()
                ])
            ),
        )


    constructor(private readonly typeMaterialService:TypeMaterialService){

    }
}