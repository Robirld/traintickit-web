import { getTokenFromCookie } from '@/utils/cookie'

const user = {
  state: {
    token: getTokenFromCookie(),
    user: {}
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    delToken: (state) => {
      state.token = null;
    },
    delUser: (state) => {
      state.user = {};
    }
  }
}

export default user
