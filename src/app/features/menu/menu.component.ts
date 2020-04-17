import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact, Student, Courses, Enrollment } from '../models';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [StudentService]
})

export class MenuComponent implements OnInit {
  selectedStudent: Student;
  selectedCourse: Courses;
  selectedEnrollment: Enrollment;

  show = true;
  showResult = false;
  lastOptions = false;
  showForm = true;
  sORe = true;

  cols: any;
  studentData: Student[];

  // students: Student[];
  // courses: Courses[];
  // enrollments: Enrollment[];

  @Output() addData: EventEmitter<any> = new EventEmitter();


  constructor(private studentService: StudentService) {}

  ngOnInit() {
  }

  // private getIndexOfContact = (contactId: string) => {
  //   return this.contacts.findIndex((contact) => {
  //     return contact._id === contactId;
  //   });
  // }

  showMenu(){
    this.show = true;
    this.lastOptions = false;
    this.showResult = false;
    this.showForm = false;
  }

  showStudents(){
    this.lastOptions = true;
    this.show = false;
    this.sORe = true;
  }

  showEnrollments(){
    this.lastOptions = true;
    this.show = false;
    this.sORe = false;
  }

  showTable(){
    this.showResult = true;
    this.show = false;
    this.cols = [
      { field: 'StudentId', header: 'Student Id' },
      { field: 'StudentName', header: 'Student Name' },
      { field: 'Major', header: 'Major' }
    ];

    this.studentService
      .getStudents()
      .then((students: Student[]) => {
        this.studentData = students.map((student) => {
          return student;
        });
      });
  }

  createNewStudent() {
    const student: Student = {
      StudentId: '',
      StudentName: '',
      Major: ''
    };

    this.selectedStudent = student;
    this.selectedCourse = null;
    this.selectedEnrollment = null;
    this.show = false;
    this.showForm = true;
  }

  createNewCourse() {
    const course: Courses = {
      CourseNum: '',
      Title: '',
      DeptCode: '',
      CreditHours: null
    };

    this.selectedStudent = null;
    this.selectedCourse = course;
    this.selectedEnrollment = null;
    this.show = false;
    this.showForm = true;
  }

  createNewEnrollment() {
    const enrollment: Enrollment = {
      StudentId: '',
      CourseNum: '',
      DeptCode: ''
    };

    this.selectedStudent = null;
    this.selectedCourse = null;
    this.selectedEnrollment = enrollment;
    this.show = false;
    this.showForm = true;
  }
}
