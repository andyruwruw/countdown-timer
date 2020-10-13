import axios from 'axios';
import moment from 'moment';
import { isPast } from 'date-fns';

const defaultState = () => ({
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

  /**
   * 
   */
  remainingIntervals: {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
});

const moduleState = defaultState();

const moduleMutations = {
  setSavedInterval(state, interval) {
    state.interval = interval;
  },
  setEvents(state, events) {
    state.events = events;
  },
  shiftEvents(state) {
    state.events.shift();
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
  setRemainingIntervals(state, data) {
    state.remainingIntervals = data;
  },
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const moduleGetters = {
  events: state => state.events,
  event: (state) => state.events.length ? state.events[0] : null,
  nextStop: state => state.nextStop,
  lastStop: state => state.lastStop,
  prior: state => state.prior,
  timeTil: state => state.timeTil,
  remainingIntervals: state => state.remainingIntervals,
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

    let stops = [];
    const now = (new Date()).getTime();

    let first = null;
    let startRetrieved = true;

    for (let i = 0; i < data.length; i++) {
      const start = new Date(data[i].start.dateTime);

      if (start.getTime() > now) {
        stops.push({
          id: data[i].id,
          name: data[i].summary,
          href: data[i].htmlLink,
          time: start,
          start: true,
        });
        startRetrieved = true;
      } else {
        startRetrieved = false;
      }
      
      const end = new Date(data[i].end.dateTime);

      if (end.getTime() > now) {
        stops.push({
          id: data[i].id,
          name: data[i].summary,
          href: data[i].htmlLink,
          time: end,
          start: false,
        });

        if (stops.length === 1 && !startRetrieved) {
          first = {
            id: data[i].id,
            name: data[i].summary,
            href: data[i].htmlLink,
            time: start,
            start: true,
          };
        }
      }
    }

    stops.sort((a, b) => {
      return a.time.getTime() - b.time.getTime();
    });

    await commit('setEvents', stops);
    await dispatch('setStops', first);
    
    if (state.interval === null) {
      dispatch('startLoop');
    }
  },

  /**
   *  Sets next stops.
   */
  setStops({ dispatch, state, commit}, first) {
    commit('setPrior', state.events[0].start);
    commit('setLastStop', state.events[0].start ? new Date() : first.time);
    commit('setNextStop', state.events[0].time);

    dispatch('updateTimeTil');
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

    commit('setPrior', state.events[1].start);
    await commit('setLastStop', state.nextStop);
    commit('setNextStop', state.events[1].time);

    commit('shiftEvents');
  },

  /**
   * Updates time til message on home page.
   * 
   * @param {Function} context Vuex Context
   */
  async updateTimeTil({ rootState, state, commit }) {
    let remaining = (new Date(state.events[0].time)).getTime() - (new Date()).getTime();

    if (rootState.user.user.textType === 'verbouse') {
      const year = Math.floor(remaining / 31556952000);
      remaining %= 31556952000;
      const month = Math.floor(remaining / 2629746000);
      remaining %= 2629746000;
      const week = Math.floor(remaining / 604800000);
      remaining %= 604800000;
      const day = Math.floor(remaining / 86400000);
      remaining %= 86400000;
      const hour = Math.floor(remaining / 3600000);
      remaining %= 3600000;
      const minute = Math.floor(remaining / 60000);
      remaining %= 60000;
      const second = Math.floor(remaining / 1000);

      commit(
        'setRemainingIntervals',
        {
          year,
          month,
          week,
          day,
          hour,
          minute,
          second,
        },
      );
    } else {
      if (remaining <= 60000) {
        commit(
          'setTimeTil',
          `${Math.ceil(remaining / 1000)} seconds`,
        );
      } else {
        commit(
          'setTimeTil',
          moment(new Date(state.events[0].time)).toNow(true),
        );
      }
    }
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

  resetState({ commit }) {
    commit('reset');
  },
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};