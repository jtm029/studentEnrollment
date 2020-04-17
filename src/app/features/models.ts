export class Contact {
    // tslint:disable-next-line: variable-name
    _id?: string;
    name: string;
    email: string;
    phone: {
      mobile: string;
      work: string;
    };
  }

export class Student {
  // tslint:disable-next-line: variable-name
  _id?: string;
   StudentId: string;
   StudentName: string;
   Major: string;
  }

export class Courses {
   // tslint:disable-next-line: variable-name
   _id?: string;
   DeptCode: string;
   CourseNum: string;
   Title: string;
   CreditHours: number;
  }

export class Enrollment {
  // tslint:disable-next-line: variable-name
  _id?: string;
  StudentId: string;
  DeptCode: string;
  CourseNum: string;
}
