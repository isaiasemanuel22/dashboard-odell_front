import { Product } from "./product.interface";
import { TypeMaterial } from "./TypeMaterial.interface";

export interface Bill {
  id: string;
  grams: number;
  product: Product | undefined;
  material: TypeMaterial;
}