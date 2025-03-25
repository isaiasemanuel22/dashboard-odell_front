
import { Component } from '@angular/core';
import { ConfigMachineComponent } from './config-machine/config-machine.component';
import { MaterialComponent } from './material/material.component';
import { FilamentComponent } from './filament/filament.component';
import { BrandComponent } from "./brand/brand.component";
import { ColorComponent } from "./color/color.component";
import { NgFor, NgIf } from '@angular/common';
import { ListFilamentsComponent } from "./list-filaments/list-filaments.component";
import { ListBrandComponent } from "./list-brand/list-brand.component";
import { ListTypeMaterialComponent } from "./list-type-material/list-type-material.component";
import { ListColorComponent } from "./list-color/list-color.component";
import { ListMachineComponent } from "./list-machine/list-machine.component";



@Component({
    selector: 'odell-config',
    standalone:true,
    imports: [
    ConfigMachineComponent, MaterialComponent, FilamentComponent, BrandComponent, ColorComponent, NgIf, NgFor, ListFilamentsComponent, ListBrandComponent, ListTypeMaterialComponent, ListColorComponent,
    ListMachineComponent
],
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
        this.inputSelected = selected;
    }
}
