import { createReducer, on } from "@ngrx/store"
import { loadConfigMachineFailure, loadConfigMachineSuccess } from "./machine.actions"

export interface ConfigMachineState{
    configMachine:any,
    error:string | undefined
}

export const initialState:ConfigMachineState ={
    configMachine:[],
    error:undefined
}

export const configMachineReducer = createReducer(
    initialState,
    on(loadConfigMachineSuccess, (state , {config}) => ({...state, configMachine:config})),
    on(loadConfigMachineFailure , (state , {error}) => ({...state, error:error}))
)