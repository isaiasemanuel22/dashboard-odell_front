import { Filament } from "./Filament.interface";


export interface Color {
  id: string;
  name: string;
  filament: Filament[] | undefined;
}
