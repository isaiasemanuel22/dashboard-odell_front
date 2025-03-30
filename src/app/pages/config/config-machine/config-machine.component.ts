import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { FormComponent } from '../../../commons/form/form/form.component';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { Store } from '@ngrx/store';
import { addConfigMachine, updateConfiMachine } from '../../../store/machine/machine.actions';

@Component({
    selector: 'odell-config-machine',
    standalone:true,
    imports: [ReactiveFormsModule, InputComponent, FormComponent, ButtonComponent],
    templateUrl: './config-machine.component.html',
    styleUrl: './config-machine.component.scss'
})
export class ConfigMachineComponent implements OnInit{

  
   @Input() config_machine:any = null;
   configFixed!: FormGroup;
   private readonly store = inject(Store);

   constructor(private readonly fb: FormBuilder)
   {

   }


   ngOnInit(): void {
    let empty ={
      price_kwh:0,
      consume_x_hour:0,
      wear_machine:0,
      price_replacement:0,
      margin_error:0,
      type:''
    }
    if(this.config_machine){
      this.createForm(this.config_machine);
    }else{
      this.createForm(empty);
    }
 
   }

   createForm(config_machine:any = {
    price_kwh:0,
    consume_x_hour:0,
    wear_machine:0,
    price_replacement:0,
    margin_error:0,
    type:''
   }){
    this.configFixed = this.fb.group({
      price_kwh:[config_machine.price_kwh,[Validators.required,]],
      consume_x_hour:[config_machine.consume_x_hour,[Validators.required]],
      wear_machine:[config_machine.wear_machine,[Validators.required]],
      price_replacement:[config_machine.price_replacement,[Validators.required]],
      margin_error:[config_machine.margin_error,[Validators.required]],
      type:[config_machine.type,[Validators.required]]
    });
   }

   onSubmit() {
    if (this.configFixed.valid) {
      if(this.config_machine){
        this.store.dispatch(updateConfiMachine({id:this.config_machine.id , config:this.configFixed.value}));
      }else{
        this.store.dispatch(addConfigMachine({config:this.configFixed.value}));
      }
    }
  }

    formControlName(name:string):FormControl{
      return this.configFixed.get(name) as FormControl
    }
}
