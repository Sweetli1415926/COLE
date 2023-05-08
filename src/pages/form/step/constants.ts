import { FormRule } from 'tdesign-vue-next';

import { course } from '@/api/model/course';

export const addNewCourseRules: Record<string, FormRule[]> = {
  name: [{ required: true, message: '请输入培训班名称', type: 'error' }],
  startTime: [{ required: true, message: '请输入开始日期', type: 'error' }],
  endTime: [{ required: true, message: '请输入截止日期', type: 'error' }],
  state: [{ required: true, message: '请输入培训班状态', type: 'error' }],
  dateTimeSpan: [{ required: true, message: '请输入培训班状态', type: 'error' }],
  companyname: [{ required: true, message: '请输入对方单位名称', type: 'error' }],
};

export const courseState = [
  { label: '意向课程', value: '意向课程' },
  { label: '预定课程', value: '预定课程' },
  { label: '上课中', value: '上课中' },
  { label: '已完成', value: '已完成' },
];
export const payType = [
  { label: '整班按天付费', value: '整班按天付费' },
  { label: '每人每天付费', value: '每人每天付费' },
];

export const TYPE_OPTIONS = [
  { label: '类型A', value: '1' },
  { label: '类型B', value: '2' },
  { label: '类型C', value: '3' },
];

export const ADDRESS_OPTIONS = [
  { label: '广东省深圳市南山区', value: '1' },
  { label: '北京市海淀区', value: '2' },
  { label: '上海市徐汇区', value: '3' },
  { label: '四川省成都市高新区', value: '4' },
  { label: '广东省广州市天河区', value: '5' },
  { label: '陕西省西安市高新区', value: '6' },
];

export const formcourse: course = {
  company: {
    name: '',
  },
} as course;

export const INITIAL_DATA2 = {
  title: '',
  taxNum: '',
  address: '',
  bank: '',
  bankAccount: '',
  email: '',
  tel: '',
};

export const INITIAL_DATA3 = {
  consignee: '',
  mobileNum: '',
  deliveryAddress: '',
  fullAddress: '',
};
