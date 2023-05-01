import { ListCourse } from './courseModel';
import { personModel } from './personModel';

export interface managerModel extends personModel {
  WorkCode: String;
  TelNumber: String;
  Office: String;
  Department: String;
  Courses?: ListCourse;
}
