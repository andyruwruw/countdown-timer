import axios from 'axios';

const moduleState = {
  calendars: [],
};

const moduleMutations = {
  setCalendars(state, calendars) {
    state.calendars = calendars;
  },
};

const moduleGetters = {
  calendars: state => state.calendars,
  calendarsPresent: state => state.calendars.length !== 0,
}

const moduleActions = {
  async getCalendars(context) {
    let { data } = await axios.get('/api/calendars');
    context.commit('setCalendars', data);
  },
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};