import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Router } from '@angular/router';

@Component({
    selector: 'odell-product',
    imports: [NgIf, FontAwesomeModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {
   @Input() set data(data:any){
    this.product = data;
  }

  constructor(
   private readonly router:Router
  ){}

  plusIcon = faPlus as IconProp;

  product:any = null

  handleClick(){
    if(this.product !== null){
      this.router.navigateByUrl('')
    }else{
      this.router.navigateByUrl('addProduct')
    }
  }
}
