import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @Input()
  contact: Contact;

  @Input()
  // tslint:disable-next-line: ban-types
  createHandler: any;
  @Input()
  updateHandler: any;
  @Input()
  deleteHandler: any;

  constructor(private contactService: ContactService) {}

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: string): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: string) => {
      this.deleteHandler(deletedContactId);
    });
  }
}
