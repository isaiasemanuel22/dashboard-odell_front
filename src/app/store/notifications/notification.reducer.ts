import { createReducer, on } from "@ngrx/store"
import { notificationFailure, notificationSuccess } from "./notification.actions"

export enum enumTypeStatus {
    SUCCESS='success',
    ERROR = 'error',

}

export interface NotificationState{
    message:string,
    status:enumTypeStatus | undefined
}

export const initialNotificationState :NotificationState = {
    message:'',
    status:undefined
}

export const notificationReducer = createReducer(
    initialNotificationState,
    on(notificationSuccess,(state , {message})=>{
        return {
            ...state,
            message,
            status:enumTypeStatus.SUCCESS
        }
    }),
    on(notificationFailure, (state, {message}) => {
        return {
            ...state,
            message,
            status: enumTypeStatus.ERROR
        }
    })
)
