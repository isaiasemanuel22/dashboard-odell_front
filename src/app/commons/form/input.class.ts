import { Component, Input } from "@angular/core";
import { ControlValueAccessor, FormControl } from "@angular/forms";


@Component({
  selector: '',
  standalone: true,
  imports: [],
  template: ``,
  styles: '',
    providers: []
})
export class InputGeneral implements ControlValueAccessor{

    @Input() inputName='';
    @Input() formControl!:FormControl;
  
    value:any = null;
  
    ngOnInit(): void {
      this.value = this.formControl?.value; 
    }
  
    onChange = (value: any) => {}; // Función para actualizar el valor
    onTouched = () => {}; // Función para marcar el control como tocado
  
    writeValue(value: any): void {
      this.value = value || '';
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    onInput(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.value = value;
      this.onChange(value); // Notifica al formulario del nuevo valor
    }
  

}
