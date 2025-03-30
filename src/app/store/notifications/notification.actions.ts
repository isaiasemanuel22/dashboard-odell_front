import { createAction, props } from "@ngrx/store";

export const notificationSuccess = createAction('[Notification] Success' , props<{message:string}>());
export const notificationFailure = createAction('[Notification] Failure' , props<{message:string}>());