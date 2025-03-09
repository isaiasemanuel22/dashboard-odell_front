
import { Component } from '@angular/core';
import { ConfigMachineComponent } from './config-machine/config-machine.component';
import { MaterialComponent } from './material/material.component';
import { FilamentComponent } from './filament/filament.component';



@Component({
  selector: 'odell-config',
  standalone: true,
  imports: [ConfigMachineComponent,MaterialComponent,FilamentComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {

}
