// import { query as queryUsers, queryCurrent } from '../services/user';
import { queryFakeList } from '../services/api';
export default {
  namespace: 'test',

  state: {
    list: [
        title= 'Hello',
        txt= 'World !',
    ],
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
        console.log(payload);
        // const response = yield call(queryFakeList, payload);
        // yield put({
        //   type: 'queryList',
        //   payload: Array.isArray(response) ? response : [],
        // });
      }
  },

  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // },
  },
};
