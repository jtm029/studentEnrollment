import { Injectable } from '@angular/core';
import { Contact, Student, Courses, Enrollment } from './models';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class StudentService {
    private studentsUrl = '/api/students';
    private coursesUrl = '/api/courses';
    private enrollmentsUrl = '/api/enrollments';

    constructor(private http: Http) {}

    // get("/api/students")
    getStudents(): Promise<void | Student[]> {
      return this.http.get(this.studentsUrl)
                 .toPromise()
                 .then(response => response.json() as Student[])
                 .catch(this.handleError);
    }

    // get("/api/enrollments")
    getEnrollments(): Promise<void | Enrollment[]> {
      return this.http.get(this.enrollmentsUrl)
                 .toPromise()
                 .then(response => response.json() as Enrollment[])
                 .catch(this.handleError);
    }

    // post("/api/students")
    createStudent(newStudent: Student): Promise<void | Student> {
      return this.http.post(this.studentsUrl, newStudent)
                 .toPromise()
                 .then(response => response.json() as Student)
                 .catch(this.handleError);
    }

     // post("/api/courses")
     createCourse(newCourse: Courses): Promise<void | Courses> {
      return this.http.post(this.coursesUrl, newCourse)
                 .toPromise()
                 .then(response => response.json() as Courses)
                 .catch(this.handleError);
    }

      // post("/api/enrollments")
      createEnrollment(newEnrollment: Enrollment): Promise<void | Enrollment> {
        return this.http.post(this.enrollmentsUrl, newEnrollment)
                   .toPromise()
                   .then(response => response.json() as Enrollment)
                   .catch(this.handleError);
      }

      // get("/api/enrollments/:id")
    getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
      return this.http.get(this.enrollmentsUrl + '/' + studentId)
                 .pipe(
                 map(response => response.json() as Enrollment[]));
    }

    // get("/api/courses/:id/:code")
    getCoursesByCourseNum(courseNum: string, deptCode: string): Promise<void | Courses> {
      return this.http.get(this.coursesUrl + '/' + courseNum + '/' + deptCode)
                 .toPromise()
                 .then(response => response.json() as Courses)
                 .catch(this.handleError);
    }

    // get("/api/courses/:code")
    getCoursesByDeptCode(deptCode: string): Promise<void | Courses[]> {
      return this.http.get(this.coursesUrl + '/' + deptCode)
                 .toPromise()
                 .then(response => response.json() as Courses[])
                 .catch(this.handleError);
    }

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
