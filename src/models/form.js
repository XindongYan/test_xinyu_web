import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, pageSave, findCompont, pageDelete, search } from '../services/api';
// import { stat } from 'fs';

export default {
  namespace: 'form',

  state: {
    data: {
      list: [],
      pagination: 5
    },
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    // 新建
    *testPage({payload, callback}, { call }) {
      console.log(payload)
      const response = yield call(pageSave, payload)
      if (callback) callback(response)
    },

    // 后台查询值, payload发送前台参数
    *find({payload}, {call, put}) {
      const response = yield call(findCompont, payload)
      // console.log(response)
      if (!response.error) {
        yield put ({
          type: 'findApp',
          // 获取到所有值
          payload: { ...response },
        })
      }
    },

    // 删除
    *delete({payload, callback}, { call }) {
      const response = yield call(pageDelete, payload)
      if (callback) callback(response)
    },

    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    findApp(state, { payload }) {
      // console.log(state)
      // console.log(payload)
      return {
        ...state,
        data: payload,
      }
    },
  },
};
