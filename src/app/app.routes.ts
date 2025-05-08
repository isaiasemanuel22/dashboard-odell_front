import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ConfigComponent } from './pages/config/config.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
    {title:'home', path:'',component:HomeComponent ,  data:{show:true}},
    {title:'products', path:'products',component:ProductsComponent ,  data:{show:true}},
    {title:'detail', path:'products/detail/:id',component:ProductDetailComponent ,  data:{show:false}},
    {title:'Create' ,path:'addProduct',component:AddProductComponent ,  data:{show:false}},
    {title:'config' ,path:'config',component:ConfigComponent ,  data:{show:true}}
    
];
