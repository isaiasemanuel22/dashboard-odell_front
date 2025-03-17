import { BrandFilament } from "./BrandFilament.interface";
import { Color } from "./Color.interface";
import { TypeMaterial } from "./TypeMaterial.interface";

export interface Filament {
  id: string;
  price: number;
  kgMaterial: number;
  stock:number;
  brandFilament: BrandFilament | undefined;
  typeMaterial: TypeMaterial | undefined;
  color: Color | undefined;

}