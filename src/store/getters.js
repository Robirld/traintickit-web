const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  index: state => state.nav.index
}

export default getters