import { createReducer, on } from "@ngrx/store";
import { Color } from "../../services/models/Color.interface";
import { loadColorsSuccess,loadColorsFaliure } from "./colors.actions";

export interface ColorState{
    colors:Color[],
    error:string|undefined
}

export const initialState:ColorState ={
    colors:[],
    error:undefined
}

export const colorsReducer = createReducer<ColorState>(
    initialState,
    on(loadColorsSuccess , (state , {colors})=> {
        return {
            ...state,
            colors
        }
    }),
    on(loadColorsFaliure , (state , {error})=> {
        return {
            ...state ,
            error
        }
    })
)