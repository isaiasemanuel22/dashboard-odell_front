import { Product } from "./product.interface";


export interface ProductSupplement {
  id: string;
  cant: number;
  product: Product;
  supplement: Product;
}
