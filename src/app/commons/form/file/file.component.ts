import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputGeneral } from '../input.class';


@Component({
    standalone:true,
    selector: 'odell-file',
    imports: [],
    templateUrl: './file.component.html',
    styleUrl: './file.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        }
    ]
})
export class FileComponent  extends InputGeneral{

  @Input() multiple = false
  @Input() set filesAcepted(type:string){
    console.log(type);
    this.filesTypes = type;
  }

  @Output() filesChange:EventEmitter<any> = new EventEmitter<any>();

  filesTypes = '.';
  getFiles(event:any){
    const files:FileList = event.target.files;
    let filesReturn = [];
    if (files.length > 0) {
      for(let i=0 ; i<files.length ; i++){
        filesReturn.push(files[i]);
      }
     this.filesChange.emit(filesReturn);
    }
  }
}
