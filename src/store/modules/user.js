import axios from 'axios';
import { colorThemes } from '../../utils/colors';

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
  backgroundColor: (state) => {
    if (state.user) {
      return colorThemes[state.user.colors].background;
    }
    return colorThemes[0].background;
  },
  primaryColor: (state) => {
    if (state.user) {
      return colorThemes[state.user.colors].primary;
    }
    return colorThemes[0].primary;
  },
  secondaryColor: (state) => {
    if (state.user) {
      return colorThemes[state.user.colors].secondary;
    }
    return colorThemes[0].secondary;
  },
  colorIndex: (state) => {
    if (state.user) {
      return state.user.colors;
    }
    return 0;
  },
  dark: (state) => {
    if (state.user !== null) {
      return colorThemes[state.user.colors].dark;
    }
    return false;
  },
  colors: () => colorThemes,
}

const moduleActions = {
  defineUser({ commit }, payload) {
    commit('setUser', payload);
  },
  async getUser({ commit }) {
    const { data } = await axios.get('/api/user');
    commit('setUser', data);
  },
  async authenticate({ commit }, code) {
    let { data } = await axios.post('/api/authenticate', { code: code });
    commit('setUser', data);
  },
  async login() {
    let { data } = await axios.post('/api/auth-url');
    window.location.href = data;
  },
  async logout({ commit, dispatch }) {
    await axios.post('/api/logout');
    commit('setUser', null);
    dispatch('event/endLoop', null, { root: true });
    dispatch('event/resetState', null, { root: true });
    dispatch('calendar/resetState', null, { root: true });
  },
  async checkStatus() {
    let { data } = await axios.post('/api/auth-check');
    return data.valid;
  },
  async changePreferences({ commit }, payload) {
    let { data } = await axios.post('/api/preferences', payload);
    await commit('setUser', data);
  },
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};