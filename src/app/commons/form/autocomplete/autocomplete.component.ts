import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone:true,
  selector: 'odell-autocomplete',
  imports: [ReactiveFormsModule,InputComponent , NgFor, AsyncPipe ,NgIf],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {

 @Input() listOptions:any[]= [];
 @Output() optionSelected:EventEmitter<any> = new EventEmitter();
 $filterObs =new BehaviorSubject<any[]>([]);
 $options:Observable<any>;
 autocompleteForm!:FormGroup;
 showOptions = false;
  constructor(private readonly fb : FormBuilder , private readonly cdr:ChangeDetectorRef) {
    this.autocompleteForm = this.fb.group({
      search: [''],
    })
    this.$options = this.$filterObs.asObservable();
    this.detectedChangeForm();
  }
    formControlName(name:string):FormControl{
      return this.autocompleteForm.get(name) as FormControl
    }

    detectedChangeForm(){
      this.autocompleteForm.valueChanges.pipe(map((value)=>{
        this.showOptions =   value.search ? value.search.length > 2 : false;
        return this.showOptions ? value.search : ''
      })).subscribe((value)=>{
        if(value !== ''){
          let tempOptions = [...this.listOptions];
          let optionsFilter = tempOptions.filter((option)=>{
            if(option.name.includes(value)){
              return option;
            }
          })

          this.$filterObs.next(optionsFilter);
          
        }else{
          this.$filterObs.next([]);
        }
        this.cdr.markForCheck();
      })
    }

    selectOption(option:any){
      this.optionSelected.emit(option);
      this.autocompleteForm.reset();
      this.$filterObs.next([]);
    }
}
