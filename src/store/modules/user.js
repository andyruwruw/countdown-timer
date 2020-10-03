import axios from 'axios';
import { colorThemes } from '../../utils/colors';

const moduleState = {
  user: null,
};

const moduleMutations = {
  setUser(state, user) {
    console.log(user);
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
    if (state.user) {
      return colorThemes[state.user.colors].dark;
    }
    return false;
  },
  colors: () => colorThemes,
}

const moduleActions = {
  defineUser(context, payload) {
    context.commit('setUser', payload);
  },
  async getUser(context) {
    const { data } = await axios.get('/api/user');
    context.commit('setUser', data);
  },
  async authenticate(context, code) {
    let { data } = await axios.post('/api/authenticate', { code: code });
    context.commit('setUser', data);
  },
  async login() {
    let { data } = await axios.post('/api/auth-url');
    window.location.href = data;
  },
  async logout(context) {
    await axios.post('/api/logout');
    context.commit('setUser', null);
  },
  async checkStatus() {
    let { data } = await axios.post('/api/auth-check');
    return data.valid;
  },
  async changePreferences(context, payload) {
    let { data } = await axios.post('/api/preferences', payload);
    await context.commit('setUser', data);
  }
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};