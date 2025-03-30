import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationState } from "./notification.reducer";

export const notificationState = createFeatureSelector<NotificationState>('notification');

export const notification = createSelector(notificationState , (state => state));