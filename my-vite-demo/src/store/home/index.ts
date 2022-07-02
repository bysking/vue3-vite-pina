const homeStore = {
  state: () => ({ count: 1 }),
  mutations: {
    commitUpdateCount(state, data) {
      state.count += data;
    },
  },
  actions: {
    actionUpdateCount(context, data) {
      context.commit("commitUpdateCount", data);
    },
  },
  getters: {
    gettersCoune(state) {
      return state.count + "kkkk";
    },
  },
};

export default homeStore;
