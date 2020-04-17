import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-view-given',
  templateUrl: './view-given.component.html',
  styleUrls: ['./view-given.component.css']
})
export class ViewGivenComponent implements OnInit {
  show = false;

  @Input() set viewComponent(value: boolean){
    this.show = value;
  }

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  constructor() {
   }

  goMenu(){
    this.show = false;
    this.menu.emit();
  }

  ngOnInit(): void {
  }

}
