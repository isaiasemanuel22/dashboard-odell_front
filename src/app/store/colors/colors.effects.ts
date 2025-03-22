import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ColorService } from "../../services/color/color.service";
import { addColor, addColorSuccess, deleteColor, deleteColorSuccess, loadColors, loadColorsFaliure, loadColorsSuccess, updateColor, updateColorSuccess } from "./colors.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { loadFilaments } from "../filaments/filaments.actions";

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
                    map(()=> addColorSuccess()),
                    catchError((error)=> of(loadColorsFaliure({error:error.message})))
                )
            )
        )
    )

    $updateColor = createEffect(()=>
        this.actions$.pipe(
            ofType(updateColor),
            mergeMap(({id,name})=> 
                this.colorService.updateColor(id,name).pipe(
                    map(()=> updateColorSuccess()),
                    catchError((error)=> of(loadColorsFaliure({error:error.message})))
                )
            )
        )
    )

    $deleteColor = createEffect(()=> 
        this.actions$.pipe(
            ofType(deleteColor),
            mergeMap(({id})=> 
                this.colorService.deleteColor(id).pipe(
                    map(()=> deleteColorSuccess()),
                    catchError((error)=> of(loadColorsFaliure({error:error.message})))
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