const moduleState = {
  user: null,
};

const moduleMutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const moduleGetters = {
  user: state => state.user,
}

const moduleActions = {
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};