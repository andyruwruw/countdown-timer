import axios from 'axios';

const defaultState = () => ({
  calendars: [],
});

const moduleState = defaultState();

const moduleMutations = {
  setCalendars(state, calendars) {
    state.calendars = calendars;
  },
  reset(state) {
    const newState = defaultState();
    for (let key of newState) {
      state[key] = newState[key];
    }
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