import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone:true,
  selector: 'odell-autocomplete',
  imports: [ReactiveFormsModule,InputComponent , NgFor, AsyncPipe ,NgIf],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnDestroy{

 @Input() listOptions:any[]= [];
 @Output() optionSelected:EventEmitter<any> = new EventEmitter();
 @HostListener('document:click', ['$event'])
 onDocumentClick(event: MouseEvent) {
   const clickIn = this.elementRef.nativeElement.contains(event.target);
   if (!clickIn) {
    this.showList(false)
   } 
 }

 private readonly $filterObs =new BehaviorSubject<any[]>([]);
 private readonly destroy$ = new Subject<void>();

 $options:Observable<any>;
 autocompleteForm!:FormGroup;
 showOptions = false;
 focused = false;

constructor(private readonly fb : FormBuilder 
  , private readonly cdr:ChangeDetectorRef,
  private readonly elementRef: ElementRef) {
  this.autocompleteForm = this.fb.group({
    search: [''],
  })
  this.$options = this.$filterObs.asObservable().pipe(takeUntil(this.destroy$));
  this.$filterObs.next([...this.listOptions]);

  this.detectedChangeForm();
  }
    formControlName(name:string):FormControl{
      return this.autocompleteForm.get(name) as FormControl
    }

    detectedChangeForm(){
      this.autocompleteForm.valueChanges.pipe(map((value)=>{
        this.showOptions =   value.search ? value.search.length > 2 : false;
        return this.showOptions ? value.search : ''
      }),
      takeUntil(this.destroy$)
    ).subscribe((value)=>{
      let tempOptions = [...this.listOptions];
        if(value !== ''){
          let optionsFilter = tempOptions.filter((option)=>{
            if(option.name.toLowerCase().includes(value.toLowerCase())){
              return option;
            }
          })
          this.$filterObs.next(optionsFilter);
          
        }else{
          this.resetList();
        }
        this.cdr.markForCheck();
      })
    }

    selectOption(option:any){
      this.optionSelected.emit(option);
      this.autocompleteForm.reset();
      this.resetList();
  
    }

    showList(focused:boolean){
      this.resetList();
      this.focused = focused
    }

    resetList(){
      this.$filterObs.next([...this.listOptions]);
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
