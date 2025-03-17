import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilamentState } from "./filaments.reducer";

export const filamentState = createFeatureSelector<FilamentState>('filaments');

export const allFilaments = createSelector(
    filamentState,
    (state)=> state.filaments
)

export const error = createSelector(
    filamentState,
    (state)=> state.error
)