import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    // tslint:disable-next-line: deprecation
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
