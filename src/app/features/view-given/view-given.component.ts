import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Student, Courses, Enrollment } from '../models';
import { StudentService } from '../student.service';

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

  showStudentTable(){
    this.showResult = true;
    this.cols = [
      { field: 'DeptCode', header: 'Department Code' },
      { field: 'CourseNum', header: 'Course Number' },
      { field: 'Title', header: 'Course Title' },
      { field: 'CreditHours', header: 'Credit Hours' }
    ];

    this.courses = [];
    this.studentService
    .getEnrollmentsByStudentId(this.selectedStudent.StudentId)
    .then((enrollments: Enrollment[]) => {
        enrollments.forEach(enroll => {
          this.studentService
          .getCoursesByCourseNum(enroll.CourseNum, enroll.DeptCode)
          .then((course: Courses) => {
          this.courses.push(course);
      });
        });
    });

    this.data = this.courses;
  }

  ngOnInit() {
    if (!this.sORe){
    this.studentService
      .getStudents()
      .then((students: Student[]) => {
        this.students = students.map((student) => {
          return student;
        });
      });
    this.enrollmentsShow = false;
    } else {
      this.studentService
      .getEnrollments()
      .then((enrollments: Enrollment[]) => {
        this.enrollments = enrollments.map((enrollment) => {
          return enrollment;
        });
        this.enrollments = this.enrollments.filter((test, index, array) =>
     index === array.findIndex((findTest) =>
        findTest.DeptCode === test.DeptCode
     )
  );
      });
      this.students = null;
      this.enrollmentsShow = true;
    }
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.showStudentTable();
  }

  selectEnrollment(enrollment: Enrollment) {
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

    this.courses = [];

    this.studentService
      .getCoursesByDeptCode(this.selectedEnrollment.DeptCode)
      .then((course: Courses[]) => {
        course.forEach(singleCourse => {
          this.courses.push(singleCourse);
        });
      });

    this.data = this.courses;
  }
}
