import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact, Student } from '../models';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [StudentService]
})

export class MenuComponent implements OnInit {
  selectedContact: Contact;
  show = true;
  showResult = false;
  cols: any;
  studentData: Student[];

  @Output() addData: EventEmitter<any> = new EventEmitter();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
  }

  // private getIndexOfContact = (contactId: string) => {
  //   return this.contacts.findIndex((contact) => {
  //     return contact._id === contactId;
  //   });
  // }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    this.show = false;
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

  createNewContact() {
    const contact: Contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  // deleteContact = (contactId: string) => {
  //   const idx = this.getIndexOfContact(contactId);
  //   if (idx !== -1) {
  //     this.contacts.splice(idx, 1);
  //     this.selectContact(null);
  //   }
  //   return this.contacts;
  // }

  // addContact = (contact: Contact) => {
  //   this.contacts.push(contact);
  //   this.selectContact(contact);
  //   return this.contacts;
  // }

  // updateContact = (contact: Contact) => {
  //   const idx = this.getIndexOfContact(contact._id);
  //   if (idx !== -1) {
  //     this.contacts[idx] = contact;
  //     this.selectContact(contact);
  //   }
  //   return this.contacts;
  // }
}
