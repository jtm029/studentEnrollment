import { Component } from '@angular/core';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ViewMode } from './View/view-mode.enum';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studentEnrollment';

private readonly viewModeSource = new BehaviorSubject<ViewMode>(
  ViewMode.FullScreen
);
viewModeSnapshotValue: ViewMode;
items: MenuItem[];

constructor(private router: Router) { }

add(){
  this.viewModeSource.next(ViewMode.Add);
  this.viewModeSnapshotValue = ViewMode.Add;
}
gotoContact() {
  this.router.navigate(['/contact']);
}
}
