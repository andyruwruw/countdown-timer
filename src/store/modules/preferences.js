const moduleState = {
  calendars: {
    primary: true,
  },
  colors: {
    primary: '',
    secondary: '',
  },
  type: 0,
};

const moduleMutations = {
  addCalendar(state, calendar) {
    state.calendars[calendar] = true;
  },
  removeCalendar(state, calendar) {
    state.calendars[calendar] = false;
  },
  setPrimaryColor(state, color) {
    state.colors.primary = color;
  },
  setSecondaryColor(state, color) {
    state.colors.secondary = color;
  },
  setType(state, type) {
    state.type = type;
  }
};

const moduleGetters = {
  calendars: state => state.calendars,
  primaryColor: state => state.colors.primary,
  secondaryColor: state => state.colors.secondary,
  type: state => state.type,
};

const moduleActions = {
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};