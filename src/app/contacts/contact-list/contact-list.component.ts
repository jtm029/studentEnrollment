import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;
  @Output() addData: EventEmitter<any> = new EventEmitter();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        console.log('con', contacts);
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            };
          }
          return contact;
        });
      });
  }

  private getIndexOfContact = (contactId: string) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
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
 onAdd(){
   this.addData.emit();
 }
  deleteContact = (contactId: string) => {
    const idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    const idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
}
