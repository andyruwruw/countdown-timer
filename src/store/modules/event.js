import axios from 'axios';
import moment from 'moment';
import {
  isPast,
  isFuture,
} from 'date-fns';

const moduleState = {
  /**
   * Set Interval Object
   */
  interval: null,

  /**
   * Array of event objects
   */
  events: [],

  /**
   * Prior to event or in event
   */
  prior: false,

  /**
   * End time
   */
  nextStop: null,

  /**
   * Start time
   */
  lastStop: null,

  /**
   * Time til next stop
   */
  timeTil: null,
};

const moduleMutations = {
  setSavedInterval(state, interval) {
    state.interval = interval;
  },
  setEvents(state, events) {
    state.events = events;
  },
  shiftEvents(state) {
    const expired = state.events.shift();
    state.lastStop = expired.end.time;
  },
  setPrior(state, prior) {
    state.prior = prior;
  },
  setNextStop(state, stop) {
    state.nextStop = stop;
  },
  setLastStop(state, stop) {
    state.lastStop = stop;
  },
  setTimeTil(state, data) {
    state.timeTil = data;
  },
};

const moduleGetters = {
  events: state => state.events,
  event: (state) => state.events.length ? state.events[0] : null,
  nextStop: state => state.nextStop,
  lastStop: state => state.lastStop,
  prior: state => state.prior,
  timeTil: state => state.timeTil,
  eventsPresent: state => state.events.length !== 0,
};

const moduleActions = {
  /**
   * Retrieves and sorts events.
   * 
   * @param {Function} context Vuex Context
   */
  async getEvents({ commit, state, dispatch }) {
    let { data } = await axios.get('/api/events');

    for (let i = 0; i < data.length; i++) {
      data[i].start.time = (new Date(data[i].start.dateTime)).getTime();
      data[i].end.time = (new Date(data[i].end.dateTime)).getTime();
    }

    data.sort((a, b) => {
      return a.end.time - b.end.time;
    });

    commit('setEvents', state.events.concat(data));

    if (state.nextStop === null) {
      dispatch('setStops');
    }
    
    if (state.interval === null) {
      dispatch('startLoop');
    }
  },

  /**
   *  Sets next stops.
   */
  setStops({ state, commit}) {
    if (isFuture(state.events[0].start.time)) {
      commit('setPrior', true);
      commit('setLastStop', (new Date()).getTime());
      commit('setNextStop', state.events[0].start.time);
    } else if (isPast(state.events[0].start.time)) {
      commit('setPrior', false);
      commit('setLastStop', state.events[0].start.time);
      commit('setNextStop', state.events[0].end.time);
    }
  },

  /**
   * Checks the passing and progress of the event
   * 
   * @param {Function} context Vuex Context
   */
  checkEvent({ state, dispatch}) {
    if (state.nextStop !== null && isPast(state.nextStop)) {
      dispatch('eventExpired');
    }

    dispatch('updateTimeTil');
  },

  /**
   * Removes event following its expiration
   * 
   * @param {Function} context Vuex Context
   */
  async eventExpired({ commit, dispatch, state }) {
    if (state.events.length <= 1) {
      await dispatch('getEvents');
    }

    if (state.prior) {
      commit('setPrior', false);
      await commit('setLastStop', state.nextStop);
      commit('setNextStop', state.events[0].end.time);
    } else {
      commit('setPrior', true);
      await commit('setLastStop', state.nextStop);
      commit('setNextStop', state.events[1].start.time);
    }

    commit('shiftEvents');
  },

  /**
   * Updates time til message on home page.
   * 
   * @param {Function} context Vuex Context
   */
  async updateTimeTil({ state, commit }) {
    commit(
      'setTimeTil',
      moment(new Date(state.nextStop)).toNow(true),
    );
  },
  /**
   * Start Loop
   * 
   * @param {Function} context Vuex Context
   */
  startLoop({ dispatch, commit }) {
    const interval = setInterval(() => dispatch('checkEvent'), 1000);

    commit('setSavedInterval', interval);
  },
  /**
   * End Loop
   * 
   * @param {Function} context Vuex Context
   */
  async endLoop({ state, commit }) {
    clearInterval(state.interval);

    commit('setSavedInterval', null);
  },
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};