export interface Product extends ProductDTO{
    id: string;
}


export interface ProductDTO{
    name: string;
    cant: number;
    cost: number;
    price: number;
    photos: string[];
    bill:any;
    supplement:boolean,
    product:boolean
}