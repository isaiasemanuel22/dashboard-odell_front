import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ColorService } from "../../services/color/color.service";
import { addColor, addColorSuccess, deleteColor, deleteColorSuccess, loadColors, loadColorsFaliure, loadColorsSuccess, updateColor, updateColorSuccess } from "./colors.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { loadFilaments } from "../filaments/filaments.actions";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()
export class EffectColor{
 private readonly actions$ = inject(Actions);

    $allColors = createEffect(()=>
        this.actions$.pipe(
            ofType(loadColors),
            mergeMap(()=>
            this.colorService.getColors().pipe(
                map((colors)=> loadColorsSuccess({colors})),
                catchError((error)=> of(loadColorsFaliure({error:error.message})))
                )
            )
        )
    )

    $addColor = createEffect(()=> 
        this.actions$.pipe(
            ofType(addColor),
            mergeMap(({name})=>
                this.colorService.addColor(name).pipe(
                    mergeMap(()=>[ 
                        addColorSuccess(),
                        notificationSuccess({message:'Se ha agregado un color'})
                    ]),
                    catchError((error)=> of(
                        loadColorsFaliure({error:error.message}),
                        notificationFailure({message:'No se ha podido agregar el color'})
                    ))
                )
            )
        )
    )

    $updateColor = createEffect(()=>
        this.actions$.pipe(
            ofType(updateColor),
            mergeMap(({id,name})=> 
                this.colorService.updateColor(id,name).pipe(
                    mergeMap(()=>[
                        updateColorSuccess(),
                        notificationSuccess({message:'Se ha podido actualizar el color'})
                    ] ),
                    catchError((error)=> of(
                        loadColorsFaliure({error:error.message}),
                        notificationFailure({message:'No se ha podido actualizar el color'})
                    ))
                )
            )
        )
    )

    $deleteColor = createEffect(()=> 
        this.actions$.pipe(
            ofType(deleteColor),
            mergeMap(({id})=> 
                this.colorService.deleteColor(id).pipe(
                    mergeMap(()=> [
                        deleteColorSuccess(),
                        notificationSuccess({message:'Se ha podido borrar el color'})
                    ]),
                    catchError((error)=> of(
                        loadColorsFaliure({error:error.message}),
                        notificationFailure({message:'No se ha podido borrar el color'})
                    ))
                )
            )
        )
    )

    $reloadEffects = createEffect(()=>
        this.actions$.pipe(
            ofType(
                addColorSuccess,
                deleteColorSuccess,
                updateColorSuccess
            ),
            mergeMap(()=> 
                [
                    loadColors(),
                    loadFilaments()
                ]
            )
        )

    )




    constructor(private readonly colorService:ColorService){}
}