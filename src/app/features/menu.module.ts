import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ViewGivenComponent } from './view-given/view-given.component';


@NgModule({
  declarations: [
    MenuComponent,
    ViewGivenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContactModule { }
