import { Bill } from "./Bill.interface";
import { Filament } from "./Filament.interface";

export interface TypeMaterial {
  id: string;
  name: string;
  price: number;
  bills: Bill[] | undefined;
  filament: Filament[] | undefined;

}