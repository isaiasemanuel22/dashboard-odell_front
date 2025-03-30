import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { enumTypeStatus } from '../../../store/notifications/notification.reducer';
import { NgClass } from '@angular/common';

@Component({
  standalone:true,
  selector: 'odell-notification',
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() message:string = ''
  @Input() type:enumTypeStatus | null = null
;

  @HostBinding('class.hidden') isHidden: boolean = false;
  @HostBinding('class.show') show: boolean = true;
  constructor(private readonly cdr:ChangeDetectorRef,private readonly el: ElementRef, private readonly renderer: Renderer2){

  }


  ngOnInit(): void {
  setTimeout(()=>{
      this.isHidden = true;
      this.show = false;
      this.cdr.markForCheck();
    },5000)
  }


}
