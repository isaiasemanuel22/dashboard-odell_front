import { createAction, props } from "@ngrx/store";
import { Color } from "../../services/models/Color.interface";

export const loadColors = createAction('[Color] loadColors');

export const loadColorsSuccess = createAction('[Color] loadColorsSuccess', props<{ colors: Color[] }>());

export const loadColorsFaliure = createAction('[Color] loadColorsFaliure', props<{ error: string }>());

export const addColor = createAction('[Color] addColor', props<{name:string}>());

export const addColorSuccess = createAction('[Color] addColorSuccess');

export const deleteColor = createAction('[Color] deleteColor', props<{id: string}>());

export const deleteColorSuccess = createAction('[Color] deleteColorSuccess');

export const updateColor = createAction('[Color] updateColor', props<{id: string, name: string}>());

export const updateColorSuccess = createAction('[Color] updateColorSuccess');