import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  @Input()
  showResults: boolean;

  @Input()
  data: any;

  @Input()
  cols: any;

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  goMenu(){
    this.showResults = false;
    this.menu.emit();
  }
}
