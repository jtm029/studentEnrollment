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
   StudentId: string;
   StudentName: string;
   Major: string;
  }

export class Courses {
   DeptCode: string;
   CourseNum: string;
   Title: string;
   CreditHours: number;
  }

export class Enrollment {
  StudentId: string;
  DeptCode: string;
  CourseNum: string;
}
