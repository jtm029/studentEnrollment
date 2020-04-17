import { Injectable } from '@angular/core';
import { Contact, Student } from './models';
import { Http, Response } from '@angular/http';

@Injectable()
export class StudentService {
    private studentsUrl = '/api/students';

    constructor(private http: Http) {}

    // get("/api/students")
    getStudents(): Promise<void | Student[]> {
      return this.http.get(this.studentsUrl)
                 .toPromise()
                 .then(response => response.json() as Student[])
                 .catch(this.handleError);
    }

    // post("/api/students")
    createStudent(newStudent: Student): Promise<void | Student> {
      return this.http.post(this.studentsUrl, newStudent)
                 .toPromise()
                 .then(response => response.json() as Student)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    // deleteContact(delContactId: string): Promise<void | string> {
    //   return this.http.delete(this.contactsUrl + '/' + delContactId)
    //              .toPromise()
    //              .then(response => response.json() as string)
    //              .catch(this.handleError);
    // }

    // put("/api/contacts/:id")
    // updateContact(putContact: Contact): Promise<void | Contact> {
    //   const putUrl = this.contactsUrl + '/' + putContact._id;
    //   return this.http.put(putUrl, putContact)
    //              .toPromise()
    //              .then(response => response.json() as Contact)
    //              .catch(this.handleError);
    // }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
