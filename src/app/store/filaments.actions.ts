import { createAction, props } from "@ngrx/store";
import { Filament } from "../services/models/Filament.interface";


export const loadFilaments = createAction(
  '[Filament] loadFilaments');

export const addFilament = createAction(
  '[Filament] addFilament',
  props<{ filament: any }>()
);

export const updateFilament = createAction(
  '[Filament] updateFilament',
  props<{ filament: {id:string , data:any} }>()
);

export const removeFilament = createAction(
  '[Filament] Remove Filament',
  props<{ id: string }>()
);

export const loadFilamentsSuccess = createAction(
  '[Filament] loadFilamentsSuccess', 
  props<{ filaments: Filament[] }>());

export const loadFilamentsFailure = createAction(
    '[Filament] Load Filaments Failure',
    props<{ error: string }>()
  );

  export const addFilamentSuccess = createAction(
    '[Filament] Add Filament',
    props<{ filament: Filament }>()
  );
  
  export const updateFilamentSuccess = createAction(
    '[Filament] Update Filament',
    props<{ filament: Filament }>()
  )

  export const removeFilamentSuccess = createAction(
    '[Filament] Remove Filament Success',
    props<{ message: any }>()
  )