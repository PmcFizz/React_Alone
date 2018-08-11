import {
  findAllNews,
  findAllArticles,
  findAllOrders,
  findAllProducts,
  findAllUsers,
  findAllContacts,
} from '../services/api'

export default {
  namespace: 'bioregis',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * findAllNews ({payload}, {call, put}) {
      const response = yield call(findAllNews, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * findAllArticles ({payload}, {call, put}) {
      const response = yield call(findAllArticles, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * findAllOrders ({payload}, {call, put}) {
      const response = yield call(findAllOrders, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * findAllProducts ({payload}, {call, put}) {
      const response = yield call(findAllProducts, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * findAllUsers ({payload}, {call, put}) {
      const response = yield call(findAllUsers, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
    * findAllContacts ({payload}, {call, put}) {
      const response = yield call(findAllContacts, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    },
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        data: action.payload,
      }
    },
  },
}
