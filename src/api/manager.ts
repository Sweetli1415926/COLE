import { request } from '@/utils/request';

import { manager } from './model/manager';

const Api = {
  ManagerInfo: '/Manager/GetManagerInfo',
};

export function GetMangerInfo() {
  return request.get<manager>({
    url: Api.ManagerInfo,
  });
}
