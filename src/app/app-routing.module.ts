import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'contact', component: ContactListComponent, outlet: 'contact' },
 // { path: 'details', component: Contact },
  { path: '', redirectTo: 'contact', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
