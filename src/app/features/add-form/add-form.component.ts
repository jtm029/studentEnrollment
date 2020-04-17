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


  constructor(private contactService: StudentService) {}

  createStudent(student: Student) {
    this.contactService.createStudent(student);
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
  }
}
