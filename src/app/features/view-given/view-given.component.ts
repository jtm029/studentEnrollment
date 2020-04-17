import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Student } from '../models';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-given',
  templateUrl: './view-given.component.html',
  styleUrls: ['./view-given.component.css']
})
export class ViewGivenComponent implements OnInit {
  showResult = false;
  data: any = [];
  cols: any;
  students: Student[];
  selectedStudent: Student;

  @Input() set viewComponent(value: boolean){

  }

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  constructor(private studentService: StudentService) {
   }

  goMenu(){
    this.menu.emit();
  }

  showStudentTable(){
    this.showResult = true;
    this.cols = [
      { field: 'StudentId', header: 'Student Id' },
      { field: 'StudentName', header: 'Student Name' },
      { field: 'Major', header: 'Major' }
    ];

    this.studentService
    .getStudent(this.selectedStudent._id)
    .then((student: Student) => {
      this.data = student;
    });
  }

  ngOnInit() {
    this.studentService
      .getStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          return student;
        });
      });
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.showStudentTable();
  }
}
