import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { notification } from '../../store/notifications/notification.selectors';
import { enumTypeStatus } from '../../store/notifications/notification.reducer';
import { NotificationComponent } from "./notification/notification.component";
import { NgFor } from '@angular/common';

@Component({
  standalone:true,
  selector: 'odell-notifications',
  imports: [ NotificationComponent, NgFor],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements AfterViewInit {
  private readonly store = inject(Store)
  notifications:any[] = [];

  success = enumTypeStatus.SUCCESS;
  error = enumTypeStatus.ERROR;
  constructor(private readonly cdr:ChangeDetectorRef){

  }  

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.store.select(notification).subscribe((notification) => {
      if(notification.message !== ''){
        this.notifications.push(notification);
        this.cdr.detectChanges();
      }
      })
  }
}
