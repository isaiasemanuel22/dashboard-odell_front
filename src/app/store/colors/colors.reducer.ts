import { createReducer, on } from "@ngrx/store";
import { Color } from "../../services/models/Color.interface";
import { allColorFaliure, allColorsSuccess } from "./colors.actions";

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
    on(allColorsSuccess , (state , {colors})=> {
        return {
            ...state,
            colors
        }
    }),
    on(allColorFaliure , (state , {error})=> {
        return {
            ...state ,
            error
        }
    })
)