import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addConfigMachine, addConfigMachineSuccess, loadConfigMachine, loadConfigMachineFailure, loadConfigMachineSuccess } from "./machine.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ConfigService } from "../../services/config/config.service";

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
                    map(()=> addConfigMachineSuccess()),
                    catchError((error)=> of(loadConfigMachineFailure({error:error.message})))
                )
            )
        )
    )
    constructor(private readonly machineConfigService:ConfigService){}
}