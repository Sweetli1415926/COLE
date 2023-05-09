import { request } from '@/utils/request';

import { course } from './model/course';

const Api = {
  AddOrUpdateCourse: '/Course/AddOrUpdateCourse',
  // test: '/Login/Test',
  // ManagerInfo: '/Manager/',
};

export function AddOrUpdateCourse(Course: course) {
  return request.post({
    url: Api.AddOrUpdateCourse,
    data: Course,
  });
}
// export function Test() {
//   return request.get({
//     url: Api.test,
//   });
// }
