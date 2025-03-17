
import { Component } from '@angular/core';
import { ConfigMachineComponent } from './config-machine/config-machine.component';
import { MaterialComponent } from './material/material.component';
import { FilamentComponent } from './filament/filament.component';
import { BrandComponent } from "./brand/brand.component";
import { ColorComponent } from "./color/color.component";
import { NgFor, NgIf } from '@angular/common';
import { ListFilamentsComponent } from "./list-filaments/list-filaments.component";



@Component({
    selector: 'odell-config',
    standalone:true,
    imports: [ConfigMachineComponent, MaterialComponent, FilamentComponent, BrandComponent, ColorComponent, NgIf, NgFor, ListFilamentsComponent],
    templateUrl: './config.component.html',
    styleUrl: './config.component.scss'
})
export class ConfigComponent {

    inputSelected = 'filament';

    listTabs = [
        'machine',
        'filament',
        'basic',
    ]

    selectTab(selected:string)
    {
        console.log(selected);
        this.inputSelected = selected;
    }
}
