import { createReducer, on } from "@ngrx/store";
import { Filament } from "../services/models/Filament.interface";
import * as filamentsActions from './filaments.actions'


export interface FilamentState{
    filaments:Filament[],
    error:string | undefined;
}

export const initialState:FilamentState = {
    filaments: [],
    error: undefined
}

export const filamentReducer = createReducer(
    initialState,
    on(filamentsActions.loadFilamentsSuccess , (state , {filaments})=> {
        return {
            ...state,
            filaments:filaments,
            error:undefined
        }
    }),
    on(filamentsActions.loadFilamentsFailure , (state , {error})=> {
        return {
            ...state,
            error:error
        }
    })
)