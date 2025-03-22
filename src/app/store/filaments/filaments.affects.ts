import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addFilament, addFilamentSuccess, loadFilaments, loadFilamentsFailure, loadFilamentsSuccess, removeFilament, removeFilamentSuccess, updateFilament, updateFilamentSuccess } from "./filaments.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { FilamentService } from "../../services/filament/filament.service";
import { loadTypeMaterials } from "../typeMaterial/typeMaterial.actions";

@Injectable()
export class EffectFilament {
    private readonly actions$ = inject(Actions);

    $loadFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(loadFilaments),
            mergeMap(()=> 
                this.filamentsService.getFilaments().pipe(
                    map(filaments => loadFilamentsSuccess({filaments})),
                    catchError((error) => of(loadFilamentsFailure({ error: error.message })))
            ))
        )
    )

    $addFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(addFilament),
            mergeMap(({filament})=> 
                this.filamentsService.addFilament(filament).pipe(
                    map((filamentAdded) => addFilamentSuccess({filament:filamentAdded})),
                    catchError((error) => of(loadFilamentsFailure({ error: error.message })))
            ))
        )
    )

    $updateFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(updateFilament),
            mergeMap(({filament})=> 
                this.filamentsService.updateFilament(filament.id , filament.data).pipe(
                    map((filamentUpdate) => updateFilamentSuccess({filament:filamentUpdate})),
                    catchError((error) => of(loadFilamentsFailure({ error: error.message })))
            ))
        )
    )

    $removeFilament = createEffect(()=>
        this.actions$.pipe(
            ofType(removeFilament),
            mergeMap(({id})=> 
                this.filamentsService.deleteFilament(id).pipe(
                    map((messageRequest) => removeFilamentSuccess({message:messageRequest})),
                    catchError((error) => of(loadFilamentsFailure({ error: error.message })))
            ))
        )
    )

    reloadAfterActions = createEffect(() =>
        this.actions$.pipe(
          ofType(
            addFilamentSuccess,
            updateFilamentSuccess,
            removeFilamentSuccess
          ), // Cuando se agrega con éxito
          mergeMap(() =>
          [
            loadFilaments(),
            loadTypeMaterials()
          ]
        ),// Llama a loadProducts() para recargar la lista
        )
      );

    constructor(private readonly filamentsService:FilamentService) {}
}