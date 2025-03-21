import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ColorService } from "../../services/color/color.service";
import { allColorFaliure, allColors, allColorsSuccess } from "./colors.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class EffectColor{
 private readonly actions$ = inject(Actions);

    $allColors = createEffect(()=>
        this.actions$.pipe(
            ofType(allColors),
            mergeMap(()=>
            this.colorService.getColors().pipe(
                map((colors)=> allColorsSuccess({colors})),
                catchError((error)=> of(allColorFaliure({error:error.message})))
                )
            )
        )
    )
    constructor(private readonly colorService:ColorService){}
}