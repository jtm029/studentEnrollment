import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Student, Courses, Enrollment } from '../models';
import { StudentService } from '../student.service';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-given',
  templateUrl: './view-given.component.html',
  styleUrls: ['./view-given.component.css']
})
export class ViewGivenComponent implements OnInit {
  @Input()
  sORe: boolean;

  showResult = false;
  enrollmentsShow: boolean;
  data: any = [];
  cols: any;
  students: Student[];
  selectedStudent: Student;
  selectedEnrollment: Enrollment;
  courses: Courses[];
  enrollments: Enrollment[] = [];

  @Input() set viewComponent(value: boolean){

  }

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly studentService: StudentService,
              private readonly changeDector: ChangeDetectorRef) {
   }

  goMenu(){
    this.menu.emit();
  }

  setEnrollments(enroll: Enrollment[]){
    this.enrollments = enroll;
    console.log('serviceEnroll', enroll);
  }

  getCourseByCourseNum(){

  }

  showStudentTable(){
    this.showResult = true;
    this.cols = [
      { field: 'DeptCode', header: 'Department Code' },
      { field: 'CourseNum', header: 'Course Number' },
      { field: 'Title', header: 'Course Title' },
      { field: 'CreditHours', header: 'Credit Hours' }
    ];

    console.log('student', this.selectedStudent);
    this.enrollments = [];

    this.studentService
    .getEnrollmentsByStudentId(this.selectedStudent.StudentId)
    .then((enrollments: Enrollment[]) => {
        enrollments.forEach(enroll => {
          console.log('newEnroll', enroll);
          this.studentService
          .getCoursesByCourseNum(enroll.CourseNum, enroll.DeptCode)
          .then((course: Courses) => {
          console.log('serviceCourse', course);
          this.courses.push(course);
      });
        });
    });

    // this.courses = [];
    // // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < this.enrollments.length; i++) {
    //   console.log('here');
    //   this.studentService
    //   .getCoursesByCourseNum(this.enrollments[i].CourseNum, this.enrollments[i].DeptCode)
    //   .then((course: Courses) => {
    //     console.log('serviceCourse', course);
    //     this.courses.push(course);
    //   });
    // }

    console.log('courses', this.courses);
    this.data = this.courses;
    console.log('data', this.data);
  }

  ngOnInit() {
    if (!this.sORe){
    console.log('first');
    this.studentService
      .getStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          return student;
        });
      });
    this.enrollmentsShow = false;
    } else {
      console.log('second');
      this.studentService
      .getEnrollments()
      .then((enrollments: Enrollment[]) => {
        this.enrollments = enrollments.map((enrollment) => {
          return enrollment;
        });
      });
      this.enrollments = this.enrollments.filter((test, index, array) =>
     index === array.findIndex((findTest) =>
        findTest.DeptCode === test.DeptCode
     )
  );
      this.students = null;
      this.enrollmentsShow = true;
    }
  }

  selectStudent(student: Student) {
    console.log('selectStudent');
    this.selectedStudent = student;
    this.showStudentTable();
  }

  selectEnrollment(enrollment: Enrollment) {
    console.log('selectEnrollment');
    this.selectedEnrollment = enrollment;
    this.showEnrollmentTable();
  }

  showEnrollmentTable(){
    this.showResult = true;
    this.cols = [
      { field: 'DeptCode', header: 'Department Code' },
      { field: 'CourseNum', header: 'Course Number' },
      { field: 'Title', header: 'Course Title' },
      { field: 'CreditHours', header: 'Credit Hours' }
    ];

    this.studentService
      .getCoursesByDeptCode(this.selectedEnrollment.DeptCode)
      .then((course: Courses[]) => {
        this.courses = course;
      });

    this.data = this.courses;
    console.log('dataE', this.data);
  }
}
