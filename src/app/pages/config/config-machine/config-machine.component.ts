import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../commons/form/input/input.component';
import { ConfigService } from '../../../services/config/config.service';
import { FormComponent } from '../../../commons/form/form/form.component';
import { ButtonComponent } from "../../../commons/form/button/button.component";

@Component({
    selector: 'odell-config-machine',
    standalone:true,
    imports: [ReactiveFormsModule, InputComponent, FormComponent, ButtonComponent],
    templateUrl: './config-machine.component.html',
    styleUrl: './config-machine.component.scss'
})
export class ConfigMachineComponent implements OnInit{

   configFixed!: FormGroup;
   @Input() config_machine:any;

   constructor(private readonly fb: FormBuilder,
    private readonly configService:ConfigService
   )
   {}


   ngOnInit(): void {
    this.createForm(this.config_machine);
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
      this.configService.saveConfig(this.configFixed.value).toPromise().then(()=> {
        this.configFixed.reset();
      });
    }
  }

    formControlName(name:string):FormControl{
      return this.configFixed.get(name) as FormControl
    }
}
