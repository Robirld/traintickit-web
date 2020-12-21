const nav = {
  state: {
    index: 1
  },
  mutations: {
    setIndex: (state, index) => {
      state.index = index;
    },
    delIndex: (state) => {
      state.index = 1;
    }
  }
}

export default nav