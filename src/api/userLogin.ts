import type { LoginUser } from '@/api/model/userLogin';
import { request } from '@/utils/request';

const Api = {
  userlogin: '/Login/Login',
  test: '/Login/Test',
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
