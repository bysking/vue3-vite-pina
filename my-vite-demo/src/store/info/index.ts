const infoStore = {
  state: () => ({ infoCount: 1 }),
  mutations: {
    commitInfoCount(state) {
      state.infoCount += 1;
    },
  },
  actions: {
    actionInfoCount(context) {
      context.commit("commitInfoCount");
    },
  },
  getters: {
    gettersInfoCount(state) {
      return state.infoCount + "kkkk";
    },
  },
};

export default infoStore;
