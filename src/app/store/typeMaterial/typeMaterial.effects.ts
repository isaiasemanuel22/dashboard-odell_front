import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addTypeMaterial, addTypeMaterialFailure, addTypeMaterialSuccess, deleteTypeMaterial, deleteTypeMaterialFailure, deleteTypeMaterialSuccess, loadTypeMaterials, loadTypeMaterialsFailure, loadTypeMaterialsSuccess, updateTypeMaterial, updateTypeMaterialFailure, updateTypeMaterialSuccess } from "./typeMaterial.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { TypeMaterialService } from "../../services/typeMaterial/type-material.service";
import { loadFilaments } from "../filaments/filaments.actions";

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
                    map(()=> addTypeMaterialSuccess()),
                    catchError((error)=> of(addTypeMaterialFailure({error:error.message})))
                )
            )
        )
    )

    $updateTypeMaterial = createEffect(()=>
        this.actions$.pipe(
            ofType(updateTypeMaterial),
            mergeMap(({id,name})=>
                this.typeMaterialService.updateMaterial(id,name).pipe(
                    map(()=> updateTypeMaterialSuccess()),
                    catchError((error)=> of(updateTypeMaterialFailure({error:error.message})))
                )
            )
        )
    )

    $deleteTypeMaterial = createEffect(()=> 
    this.actions$.pipe(
        ofType(deleteTypeMaterial),
        mergeMap(({id})=>
            this.typeMaterialService.deleteMaterial(id).pipe(
                map(()=> deleteTypeMaterialSuccess()),
                catchError((error)=> of(deleteTypeMaterialFailure({error:error.message})))
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