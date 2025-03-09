import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ConfigComponent } from './pages/config/config.component';

export const routes: Routes = [
    {title:'home', path:'',component:HomeComponent},
    {title:'products', path:'products',component:ProductsComponent},
    {title:'Create Product' ,path:'addProduct',component:AddProductComponent},
    {title:'config' ,path:'config',component:ConfigComponent}
    
];
