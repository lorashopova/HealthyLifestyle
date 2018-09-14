import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit, AfterContentInit, AfterContentChecked, OnDestroy, AfterViewChecked, ViewContainerRef } from '@angular/core';

import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public toasterconfig: object;
  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.toasterconfig = this.notificationService.toasterconfig;
  }
}
