import { search } from '../services/api'

export default {
    namespace: 'search',

    state: {
        data: {
          list: [],
        },
      },

    effects: {
        *value({ payload }, {call, put}) {
            const response = yield call(search, payload);
            alert(response);
            if (!response.error) {
                yield put({
                    type: 'search',
                    payload: { ...response }
                })
            }
        },

    },

    reducers: {
        search(state, { payload }) {
            return {
              ...state,
              data: payload,
            }
          },
    }
}
