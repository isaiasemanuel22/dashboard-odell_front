import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'odell-dialog',
  standalone : true,
  imports: [FontAwesomeModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Output() close:EventEmitter<boolean> = new EventEmitter();

  iconCross = faClose;


  closeDialog(){
    this.close.emit(true);
  }
}
