import { EffectsBrand } from "./brand/brand.effects";
import { brandReducer } from "./brand/brand.reducer";
import { EffectColor } from "./colors/colors.effects";
import { colorsReducer } from "./colors/colors.reducer";
import { EffectFilament } from "./filaments/filaments.affects";
import { filamentReducer } from "./filaments/filaments.reducer";
import { EffectInitalApp } from "./initial.effects";
import { EffectsTypeMaterial } from "./typeMaterial/typeMaterial.effects";
import { typeMaterialReducer } from "./typeMaterial/typeMaterial.reducer";


export const appReducers ={
    filaments:filamentReducer,
    brands:brandReducer,
    typeMaterials:typeMaterialReducer,
    color:colorsReducer
}

export const appEffects = [
    EffectFilament,
    EffectsBrand,
    EffectsTypeMaterial,
    EffectColor,
    EffectInitalApp
]