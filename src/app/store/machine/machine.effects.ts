import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addConfigMachine, addConfigMachineSuccess, deleteConfigMachine, deleteConfigMachineSuccess, loadConfigMachine, loadConfigMachineFailure, loadConfigMachineSuccess, updateConfiMachine, updateConfiMachineSuccess } from "./machine.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ConfigService } from "../../services/config/config.service";
import { notificationFailure, notificationSuccess } from "../notifications/notification.actions";

@Injectable()
export class EffectsConfigMachine {
    private readonly $actions = inject(Actions);

    $loadConfigMachine = createEffect(()=>
        this.$actions.pipe(
            ofType(loadConfigMachine),
                mergeMap(()=>
                this.machineConfigService.getTypes().pipe(
                    map((config)=> loadConfigMachineSuccess({config:config})),
                    catchError((error)=> of(loadConfigMachineFailure({error:error.message})))
                )
        
            )
        )
    )

    $addConfigMachine = createEffect(()=>
        this.$actions.pipe(
            ofType(addConfigMachine),
                mergeMap(({config})=>
                this.machineConfigService.saveConfig(config).pipe(
                    mergeMap(()=>  [
                        addConfigMachineSuccess(),
                        notificationSuccess({message:'Se ha guardado la configuracion'})
                    ]
                    ),
                    catchError((error)=> of(
                        loadConfigMachineFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido guardar la configuracion'})
                    ))
                )
            )
        )
    )

    $deleteConfigMachine = createEffect(()=> 
        this.$actions.pipe(
            ofType(deleteConfigMachine),
            mergeMap(({id})=>
                this.machineConfigService.delete(id).pipe(
                    mergeMap(()=>[
                        deleteConfigMachineSuccess(),
                        notificationSuccess({message:'Se ha borrado la configuracion'})
                    ] ),
                    catchError((error)=> of(
                        loadConfigMachineFailure({error:error.message}),
                        notificationFailure({message:'No se ha podido borrar la configuracion'})
                    ))
                )
            )
        ))

    $updateConfigMachine = createEffect(()=>
        this.$actions.pipe(
            ofType(updateConfiMachine),
            mergeMap(({id , config})=>
            this.machineConfigService.update(id, config).pipe(
                mergeMap(()=> [
                    updateConfiMachineSuccess(),
                    notificationSuccess({message:'Se ha actualizado la configuracion'})
                ]),
                catchError((error)=> of(
                    loadConfigMachineFailure({error:error.message}),
                    notificationFailure({message:'No se ha podido actualizar la configuracion'})
                ))
            ))
        )
    )

    $reloadConfigMachie = createEffect(()=>
        this.$actions.pipe(
            ofType(
                addConfigMachineSuccess,
                updateConfiMachineSuccess,
                deleteConfigMachineSuccess
            ),
            mergeMap(()=> [
                loadConfigMachine()
            ]
            )
        )
    )
    constructor(private readonly machineConfigService:ConfigService){}
}