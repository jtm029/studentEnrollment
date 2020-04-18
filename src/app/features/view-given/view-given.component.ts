import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Student, Courses, Enrollment } from '../models';
import { StudentService } from '../student.service';
import { takeWhile } from 'rxjs/operators';

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

  constructor(private studentService: StudentService) {
   }

  goMenu(){
    this.menu.emit();
  }

  changeEnrollment(enrollment: Enrollment[]){
    console.log('newEnroll', enrollment);
    this.enrollments = enrollment;
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
    // this.enrollment = [];

    this.studentService
    .getEnrollmentsByStudentId(this.selectedStudent.StudentId)
    .pipe(takeWhile(() => true))
    .subscribe((enrollments: Enrollment[]) => {
      console.log('serviceEnroll', enrollments);
      this.changeEnrollment(enrollments);
    });

    console.log('enroll', this.enrollments);

    this.courses = [];
    this.enrollments.forEach(enrollment => {
      this.studentService
      .getCoursesByCourseNum(enrollment.CourseNum, enrollment.DeptCode)
      .then((course: Courses) => {
        this.courses.push(course);
      });
    });

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
