import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Student, Courses, Enrollment } from '../models';
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
  courses: Courses[];
  enrollment: Enrollment[];

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
      { field: 'DeptCode', header: 'Department Code' },
      { field: 'CourseNum', header: 'Course Number' },
      { field: 'Title', header: 'Course Title' },
      { field: 'CreditHours', header: 'Credit Hours' }
    ];

    console.log('student', this.selectedStudent, this.selectedStudent._id);
    this.studentService
    .getEnrollmentsByStudentId(this.selectedStudent.StudentId)
    .then((enrollments: Enrollment[]) => {
      this.enrollment = enrollments.map((enrollment) => {
        return enrollment;
      });
    });

    console.log('enroll', this.enrollment);

    this.courses = [];
    this.enrollment.forEach(enrollment => {
      this.studentService
      .getCoursesByCourseNum(enrollment.CourseNum, enrollment.DeptCode)
      .then((course: Courses) => {
        this.courses.push(course);
      });
    });

    console.log('courses', this.courses);
    this.data = this.courses;
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
