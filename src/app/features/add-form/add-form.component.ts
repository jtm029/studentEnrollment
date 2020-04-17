import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact, Student, Enrollment, Courses } from '../models';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @Input()
  contact: Contact;

  @Input()
  student: Student;
  @Input()
  course: Courses;
  @Input()
  enrollment: Enrollment;

  @Input()
  createHandler: any;
  @Input()
  updateHandler: any;
  @Input()
  deleteHandler: any;

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  error = false;

  constructor(private studentService: StudentService) {}

  createStudent(student: Student) {
    this.studentService.createStudent(student);
    if ((student.StudentId) && (student.Major) && (student.StudentName)){
      this.goMenu();
    } else {
      this.error = true;
    }
  }

  createCourse(course: Courses) {
    this.studentService.createCourse(course);
    if ((course.DeptCode) && (course.CourseNum) && (course.Title) && (course.CreditHours)){
      this.goMenu();
    } else {
      this.error = true;
    }
  }

  createEnrollment(enrollment: Enrollment) {
    console.log(enrollment);
    this.studentService.createEnrollment(enrollment);
    if ((enrollment.StudentId) && (enrollment.CourseNum) && (enrollment.DeptCode)){
      this.goMenu();
    } else {
      this.error = true;
    }
  }

  // updateContact(contact: Contact): void {
  //   this.contactService.updateContact(contact).then((updatedContact: Contact) => {
  //     this.updateHandler(updatedContact);
  //   });
  // }

  // deleteContact(contactId: string): void {
  //   this.contactService.deleteContact(contactId).then((deletedContactId: string) => {
  //     this.deleteHandler(deletedContactId);
  //   });
  // }

  goMenu(){
    this.menu.emit();
    this.error = false;
  }
}
