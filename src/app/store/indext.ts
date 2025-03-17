import { EffectFilament } from "./filaments.affects";
import { filamentReducer } from "./filaments.reducer";


export const appReducers ={
    filaments:filamentReducer
}

export const appEffects = [
    EffectFilament
]