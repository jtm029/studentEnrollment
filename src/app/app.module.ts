import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './features/menu/menu.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {TableModule} from 'primeng/table';
import { AddFormComponent } from './features/add-form/add-form.component';
import { ResultTableComponent } from './features/result-table/result-table.component';
import { ViewGivenComponent } from './features/view-given/view-given.component';
@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    MenuComponent,
    ResultTableComponent,
    ViewGivenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    TableModule,
    RouterModule.forRoot([]),
    // tslint:disable-next-line: deprecation
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
