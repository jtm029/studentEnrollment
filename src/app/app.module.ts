import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './features/menu/menu.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './features/add-form/add-form.component';
@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    RouterModule.forRoot([]),
    // tslint:disable-next-line: deprecation
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
