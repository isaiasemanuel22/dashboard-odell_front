import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConfigMachineState } from "./machine.reducer";

export const configMachineState = createFeatureSelector<ConfigMachineState>('config_machine');

export const allConfigMachine = createSelector(configMachineState, (state => {
    return state.configMachine;
}) )

export const error = createSelector(configMachineState, (state => {
    return state.error;
}))