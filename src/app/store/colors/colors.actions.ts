import { createAction, props } from "@ngrx/store";
import { Color } from "../../services/models/Color.interface";

export const allColors = createAction('[Color] allColors');

export const allColorsSuccess = createAction('[Color] allColorsSuccess', props<{ colors: Color[] }>());

export const allColorFaliure = createAction('[Color] allColorFaliure', props<{ error: string }>());