import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addFilament, addFilamentSuccess, loadFilaments, loadFilamentsFailure, loadFilamentsSuccess, removeFilament, removeFilamentSuccess, updateFilament, updateFilamentSuccess } from "./filaments.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { FilamentService } from "../../services/filament/filament.service";
import { loadTypeMaterials } from "../typeMaterial/typeMaterial.actions";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()
export class EffectFilament {
    private readonly actions$ = inject(Actions);

    $loadFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(loadFilaments),
            mergeMap(()=> 
                this.filamentsService.getFilaments().pipe(
                    map(filaments =>loadFilamentsSuccess({filaments})),
                    catchError((error) => of(loadFilamentsFailure({ error: error.message })))
            ))
        )
    )

    $addFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(addFilament),
            mergeMap(({filament})=> 
                this.filamentsService.addFilament(filament).pipe(
                    mergeMap((filamentAdded) => [
                        addFilamentSuccess({filament:filamentAdded}),
                        notificationSuccess({message:'Se ha agregado un nuevo filamento'})
                    ]),
                    catchError((error) => of(
                        notificationFailure({message: 'Error al agregar filamento'}),
                        loadFilamentsFailure({error:error.message})
                    )
            ))
        )
    ))

    $updateFilaments = createEffect(()=>
        this.actions$.pipe(
            ofType(updateFilament),
            mergeMap(({filament})=> 
                this.filamentsService.updateFilament(filament.id , filament.data).pipe(
                    mergeMap((filamentUpdate) => [
                        updateFilamentSuccess({filament:filamentUpdate}),
                        notificationSuccess({message:'Se ha actualizado el filamento '})
                    ]
                
                ),
                    catchError((error) => of(
                        loadFilamentsFailure({ error: error.message }),
                        notificationFailure({message: 'Error al actualizar filamento'}),
                        )
                    )
            ))
        )
    )

    $removeFilament = createEffect(()=>
        this.actions$.pipe(
            ofType(removeFilament),
            mergeMap(({id})=> 
                this.filamentsService.deleteFilament(id).pipe(
                    mergeMap((messageRequest) => [
                        removeFilamentSuccess({message:messageRequest}),
                        notificationSuccess({message:'Se ha borrado el filamento '})
                    ]),
                    catchError((error) => of(
                        loadFilamentsFailure({ error: error.message }),
                        notificationFailure({message: 'Error al borrar filamento'}),
                    ))
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