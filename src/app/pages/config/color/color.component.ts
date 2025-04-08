import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormComponent } from "../../../commons/form/form/form.component";
import { InputComponent } from "../../../commons/form/input/input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../commons/form/button/button.component";
import { Store } from '@ngrx/store';
import { Color } from '../../../services/models/Color.interface';
import { addColor, updateColor } from '../../../store/colors/colors.actions';

@Component({
  selector: 'odell-color',
  standalone:true,
  imports: [FormComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent implements OnInit {
  @Input() colorData: Color | null = null; 
  @Output() dataColorChange:EventEmitter<boolean> = new EventEmitter();

  private readonly store = inject(Store);

  colorForm!:FormGroup;

  constructor(private readonly fb:FormBuilder){}

  ngOnInit(): void {
    let color = this.colorData ? this.colorData.name : '';
    this.colorForm = this.fb.group({
      name: [color],
    })
  }

  onSubmit() {
    if (this.colorForm.valid) {
      if(this.colorData){
        this.store.dispatch(updateColor({id:this.colorData.id,name:this.colorForm.value}))
      }else{
        this.store.dispatch(addColor({name:this.colorForm.value}));
      }
      this.colorForm.reset();
      this.dataColorChange.emit(true);
    }
  }

  formControlName(name:string):FormControl{
      return this.colorForm.get(name) as FormControl;
  }
}
