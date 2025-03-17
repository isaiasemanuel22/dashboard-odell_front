import { Filament } from "./Filament.interface";

export interface BrandFilament{
  id: string;
  name:string;
  filaments: Filament[] | undefined;

}