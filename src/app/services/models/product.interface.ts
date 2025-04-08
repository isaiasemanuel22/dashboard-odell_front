import { Bill } from "./Bill.interface";

export interface Product extends ProductDTO{
    id: string;
}


export interface ProductDTO{
    name: string;
    cant: number;
    cost: number;
    price: number;
    photos: string[];
    supplement:boolean;
    product:boolean;
    hours: number;
    productInfo: any;
    bills: Bill[];
    supplements: Product[];
}