import type { LoginUser } from '@/api/model/loginUser';
import { request } from '@/utils/request';

import { managerModel } from './model/managerModel';

const Api = {
  userlogin: '/Login/Login',
  test: '/Login/Test',
  ManagerInfo: '/Manager/',
};

export function Login(user: LoginUser) {
  return request.post({
    url: Api.userlogin,
    data: user,
  });
}
export function Test() {
  return request.get({
    url: Api.test,
  });
}
export function GetMangerInfo() {
  return request.get<managerModel>({
    url: Api.ManagerInfo,
  });
}
