import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ColorState } from "./colors.reducer";


export const colorState = createFeatureSelector<ColorState>('color');

export const allColorsSelector = createSelector(
    colorState, (state) => state.colors
)

export const error = createSelector(
    colorState, (state) => state.error
)