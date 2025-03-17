import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";


@Component({
    selector: '',
    standalone:true,
    imports: [],
    template: ``,
    styles: '',
    providers: []
})
export class InputGeneral {

    @Input() inputName='';   // Nombre del input (para el label)
    @Input() set formControlInput(formControl:FormControl){
      this.formControl = formControl;
      if(formControl !== undefined){
        this.value = formControl.value
        formControl.valueChanges.subscribe((response)=>{
          console.log(response);
        })
      }
    }

    formControl:any;
    value: any = null;  
  
    constructor(){

    }


}
