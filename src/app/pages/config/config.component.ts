
import { Component } from '@angular/core';
import { ConfigMachineComponent } from './config-machine/config-machine.component';
import { MaterialComponent } from './material/material.component';
import { FilamentComponent } from './filament/filament.component';
import { BrandComponent } from "./brand/brand.component";
import { ColorComponent } from "./color/color.component";



@Component({
    selector: 'odell-config',
    standalone:true,
    imports: [ConfigMachineComponent, MaterialComponent, FilamentComponent, BrandComponent, ColorComponent],
    templateUrl: './config.component.html',
    styleUrl: './config.component.scss'
})
export class ConfigComponent {

}
