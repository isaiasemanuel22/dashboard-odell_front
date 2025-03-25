import { createAction, props } from "@ngrx/store";

export const loadConfigMachine = createAction('[Machine] loadConfigMachine');

export const loadConfigMachineSuccess = createAction('[Machine] loadConfigMachineSuccess', props<{ config: any }>());

export const loadConfigMachineFailure = createAction('[Machine] loadConfigMachineFailure', props<{ error: any }>());

export const addConfigMachine = createAction( '[Machine] addConfigMachine', props<{ config: any }>());

export const addConfigMachineSuccess = createAction('[Machine] addConfigMachineSuccess');

export const updateConfiMachine = createAction( '[Machine] updateConfiMachine', props<{ id:string , config:any }>());

export const updateConfiMachineSuccess = createAction('[Machine] updateConfiMachineSuccess');

export const deleteConfigMachine = createAction( '[Machine] deleteConfigMachine', props<{ id: string }>());

export const deleteConfigMachineSuccess = createAction('[Machine] deleteConfigMachineSuccess');