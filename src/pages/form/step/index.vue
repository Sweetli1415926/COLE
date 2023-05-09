<template>
  <div>
    <button @click="consolog">test</button>
    <div class="form-step-container">
      <!-- 简单步骤条 -->
      <t-card :bordered="false">
        <t-steps class="step-container" :current="activeForm" status="process">
          <t-step-item title="开设新的培训班" content="已于4月21日提交" />
          <t-step-item title="添加人员信息" content="将所有上课学院导入" />
          <t-step-item title="添加课程、教师、教室信息" content="由教务办公室分配" />
          <t-step-item title="添加物料信息" content="由综合办公室采购" />
          <t-step-item title="开具相关票据" content="由财务办公室收费开票" />
        </t-steps>
      </t-card>
      <!-- 分步表单1 -->
      <div v-show="activeForm === 0" class="rule-tips">
        <t-alert theme="info" title="业务分工细则：" :close="true">
          <template #message>
            <p>1、添加培训班信息之后由教务办公室统一联系老师,安排课程并分配上课教室;</p>
            <p>2、添加物料信息后由综合办公室统一采购,班主任或业务员签字领取</p>
            <p>3、财务办公室将统一收费及开票工作,并上传相关票据</p>
          </template>
        </t-alert>
      </div>
      <t-form
        v-show="activeForm === 0"
        class="step-form"
        :data="formAddNewCourse"
        :rules="addNewCourseRules"
        label-align="right"
        @submit="(result) => onSubmit(result, 1)"
      >
        <t-space>
          <t-form-item label="培训班状态" name="state">
            <t-select v-model="formAddNewCourse.state" :style="{ width: '200px' }" class="demo-select-base" clearable>
              <t-option v-for="(item, index) in courseState" :key="index" :value="item.value" :label="item.label">
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <div style="margin-right: 85px"></div>
          <t-form-item label="培训班名称" name="name">
            <t-input v-model="formAddNewCourse.name" clearable :style="{ width: '300px' }"> </t-input>
          </t-form-item>
        </t-space>
        <div style="margin-bottom: 20px"></div>

        <t-space>
          <t-form-item label="培训时间" name="dateTimeSpan"
            ><t-date-range-picker v-model="DateTimeSpan" :style="{ width: '300px' }" clearable allow-input
          /></t-form-item>
          <t-form-item v-model="formAddNewCourse.company.name" label="对方单位名称" name="companyname">
            <t-input clearable :style="{ width: '300px' }"> </t-input>
          </t-form-item>
        </t-space>
        <div style="margin-bottom: 20px"></div>
        <t-space>
          <t-form-item label="缴费方式" name="payType">
            <t-select v-model="formAddNewCourse.payType" :style="{ width: '200px' }" class="demo-select-base" clearable>
              <t-option v-for="(item, index) in payType" :key="index" :value="item.value" :label="item.label">
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="培训人数" name="PeronCount">
            <t-input-number v-model="personCount" theme="normal" :style="{ width: '60px' }" />
          </t-form-item>
          <div v-if="formAddNewCourse.payType === '每人每天付费'">
            <t-form-item label="每人每天收费" name="perDayPerPersonFee">
              <t-input-number v-model="perDayPerPersonFee" theme="normal" :style="{ width: '100px' }" />
            </t-form-item>
          </div>
          <div v-if="formAddNewCourse.payType === '整班按天付费'">
            <t-form-item label="每班每天收费" name="perDayPerPersonFee">
              <t-input-number v-model="perDayPerPersonFee" theme="normal" :style="{ width: '100px' }" />
            </t-form-item>
          </div>
        </t-space>
        <div style="margin-bottom: 20px"></div>
        <t-collapse>
          <t-collapse-panel header="具体开班信息" :borderless="true">
            <t-space>
              <t-form-item label="是否承担师资费" name="isCompanyPayTeacherCost">
                <t-select
                  v-model="formAddNewCourse.isCompanyPayTeacherCost"
                  :style="{ width: '200px' }"
                  class="demo-select-base"
                  clearable
                >
                  <t-option value="true" label="是"> 是 </t-option>
                  <t-option value="false" label="否"> 否 </t-option>
                </t-select>
              </t-form-item>
              <t-form-item label="是否承担住宿费" name="isCompanyPayHote">
                <t-select
                  v-model="formAddNewCourse.isCompanyPayHote"
                  :style="{ width: '200px' }"
                  class="demo-select-base"
                  clearable
                >
                  <t-option value="true" label="是"> 是 </t-option>
                  <t-option value="false" label="否"> 否 </t-option>
                </t-select>
              </t-form-item>
            </t-space>
            <div style="margin-bottom: 20px"></div>
            <t-space>
              <t-form-item label="培训天数" name="traningDay">
                <t-input-number v-model="traningDay" theme="normal" :style="{ width: '60px' }" />
              </t-form-item>
              <t-form-item label="付费天数" name="payDay">
                <t-input-number v-model="payDay" theme="normal" :style="{ width: '60px' }" /> </t-form-item
              ><t-form-item label="合计收费金额" name="TotalIncome">
                <t-input-number v-model="formAddNewCourse.totalIncome" theme="normal" :style="{ width: '110px' }" />
              </t-form-item>
            </t-space>
            <div style="margin-bottom: 20px"></div>
            <t-space> </t-space>
            <t-space>
              <t-form-item label="需备注的内容" name="notes">
                <t-textarea :style="{ width: '600px' }" />
              </t-form-item>
            </t-space>
          </t-collapse-panel>
        </t-collapse>

        <div style="margin-bottom: 20px"></div>
        <t-form-item>
          <div style="margin-right: 500px"></div>
          <t-button theme="primary" type="submit" size="large"> 创建培训班级 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单2 -->
      <t-form
        v-show="activeForm === 1"
        class="step-form"
        :data="formData2"
        :rules="addNewCourseRules"
        label-align="left"
        @reset="onReset(0)"
        @submit="(result) => onSubmit(result, 2)"
      >
        <t-form-item label="发票抬头" name="title">
          <t-input v-model="formData2.title" :style="{ width: '480px' }" placeholder="请输入发票抬头" />
        </t-form-item>
        <t-form-item label="纳税人识别号" name="taxNum">
          <t-input v-model="formData2.taxNum" :style="{ width: '480px' }" placeholder="请输入纳税人识别号" />
        </t-form-item>
        <t-form-item label="单位地址" name="address">
          <t-input v-model="formData2.address" :style="{ width: '480px' }" placeholder="请输入单位地址" />
        </t-form-item>
        <t-form-item label="开户行" name="bank">
          <t-input v-model="formData2.bank" :style="{ width: '480px' }" placeholder="请输入开户行" />
        </t-form-item>
        <t-form-item label="银行账号" name="bankAccount">
          <t-input v-model="formData2.bankAccount" :style="{ width: '480px' }" placeholder="请输入银行账号" />
        </t-form-item>
        <t-form-item label="通知邮箱" name="email">
          <t-input v-model="formData2.email" :style="{ width: '480px' }" placeholder="请输入通知邮箱" />
        </t-form-item>
        <t-form-item label="通知手机" name="tel">
          <t-input v-model="formData2.tel" :style="{ width: '480px' }" placeholder="请输入通知手机" />
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base"> 上一步 </t-button>
          <t-button theme="primary" type="submit"> 下一步 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单3 -->
      <t-form
        v-show="activeForm === 2"
        class="step-form"
        :data="formData3"
        :rules="addNewCourseRules"
        label-align="left"
        @reset="onReset(1)"
        @submit="(result) => onSubmit(result, 6)"
      >
        <t-form-item label="收货人" name="consignee">
          <t-input v-model="formData3.consignee" :style="{ width: '480px' }" placeholder="请输入收货人" />
        </t-form-item>
        <t-form-item label="手机号码" name="mobileNum">
          <t-input v-model="formData3.mobileNum" :style="{ width: '480px' }" placeholder="请输入手机号码" />
        </t-form-item>
        <t-form-item label="收货地址" name="deliveryAddress">
          <t-select
            v-model="formData3.deliveryAddress"
            :style="{ width: '480px' }"
            placeholder="请选择收货地址"
            class="demo-select-base"
            clearable
          >
            <t-option v-for="(item, index) in ADDRESS_OPTIONS" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="详细地址" name="fullAddress">
          <t-textarea v-model="formData3.fullAddress" :style="{ width: '480px' }" placeholder="请输入详细地址" />
        </t-form-item>
        <t-form-item>
          <t-button type="reset" theme="default" variant="base"> 上一步 </t-button>
          <t-button theme="primary" type="submit"> 下一步 </t-button>
        </t-form-item>
      </t-form>

      <!-- 分步表单4 -->
      <div v-show="activeForm === 6" class="step-form-4">
        <t-icon name="check-circle-filled" style="color: green" size="52px" />
        <p class="text">完成开票申请</p>
        <p class="tips">预计1～3个工作日会将电子发票发至邮箱，发票邮寄请耐心等待</p>
        <div class="button-group">
          <t-button theme="primary" @click="onReset(0)"> 再次申请 </t-button>
          <t-button variant="base" theme="default" @click="complete"> 查看进度 </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormStep',
};
</script>

<script setup lang="ts">
import { Data, DateRangeValue, SubmitContext } from 'tdesign-vue-next';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import {
  addNewCourseRules,
  ADDRESS_OPTIONS,
  courseState,
  formcourse,
  INITIAL_DATA2,
  INITIAL_DATA3,
  payType,
} from './constants';

const formAddNewCourse = ref({ ...formcourse });
const formData2 = ref({ ...INITIAL_DATA2 });
const formData3 = ref({ ...INITIAL_DATA3 });
const activeForm = ref(0);
// 不提交表单的数据
const perDayPerPersonFee = ref('');
const personCount = ref('');
const payDay = ref('');
const traningDay = ref('');
// 把DateSpan转换为两个日期
const DateTimeSpan = ref([] as DateRangeValue);
const onSubmit = (result: SubmitContext<Data>, val: number) => {
  if (result.validateResult === true) {
    activeForm.value = val;
  }
};
const consolog = () => {
  console.log(formAddNewCourse.value.payType);
};
// const watchtime = () => {
//   console.log(DateTimeSpan);
// };
const onReset = (val: number) => {
  activeForm.value = val;
};
const complete = () => {
  const router = useRouter();
  router.replace({ path: '/detail/advanced' });
};

watch(
  DateTimeSpan,
  (newValue) => {
    formAddNewCourse.value.startTime = new Date(newValue[0]);
    formAddNewCourse.value.endTime = new Date(newValue[1]);
  },
  { deep: true },
);
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
