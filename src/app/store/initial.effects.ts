import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadApp } from "./initial.actions";
import { mergeMap } from "rxjs";
import { loadBrands } from "./brand/brand.actions";
import { loadFilaments } from "./filaments/filaments.actions";
import { loadTypeMaterials } from "./typeMaterial/typeMaterial.actions";
import { allColors } from "./colors/colors.actions";

@Injectable()
export class EffectInitalApp {
    private readonly $actions = inject(Actions);
    
    $loadApp = createEffect(()=> 
        this.$actions.pipe(
            ofType(loadApp),
            mergeMap(()=> [
                loadBrands(),
                loadFilaments(),
                loadTypeMaterials(),
                allColors()
            ])
        )
    )

    constructor(){}

}