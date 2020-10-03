import axios from 'axios';
import moment from 'moment';
import { isPast, isFuture } from 'date-fns';

const moduleState = {
  interval: null,
  events: [],
  prior: false,
  nextStop: null,
  lastStop: null,
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
};

const moduleActions = {
  /**
   * Get Events
   * Retrieves and sorts events.
   * @param {Function} context Vuex Context
   */
  async getEvents(context) {
    let { data } = await axios.get('/api/events');
    for (let i = 0; i < data.length; i++) {
      data[i].start.time = (new Date(data[i].start.dateTime)).getTime();
      data[i].end.time = (new Date(data[i].end.dateTime)).getTime();
    }
    await data.sort((a, b) => {
      return a.end.time - b.end.time;
    });
    await context.commit('setEvents', data);
    context.dispatch('setStops');
    if (context.state.interval === null) {
      context.dispatch('startLoop');
    }
  },
  /**
   * Event Expired
   * Removes event following its expiration.
   * @param {Function} context Vuex Context
   */
  async eventExpired(context) {
    context.commit('shiftEvents');
    if (!context.state.events.length) {
      await context.dispatch('getEvents');
    }
  },
  /**
   * Check Event
   * Checks the passing and progress of the event.
   * @param {Function} context Vuex Context
   */
  checkEvent(context) {
    console.log('lmao');
    if (isPast(context.state.events[0].end)) {
      context.dispatch('eventExpired');
    }
    context.dispatch('updateStops');
    context.dispatch('updateTimeTil');
  },
  setStops(context) {
    if (isFuture(context.state.events[0].start)) {
      console.log('Setting stops?');
      context.commit('setLastStop', (new Date()).getTime());
      context.commit('setNextStop', context.state.events[0].start.time);
    } else if (isPast(context.state.events[0].start)) {
      console.log('Setting stops?');
      context.commit('setLastStop', context.state.events[0].start.time);
      context.commit('setNextStop', context.state.events[0].end.time);
    }
  },
  updateStops(context) {
    if (isFuture(context.state.events[0].start) && !context.state.prior) {
      context.commit('setPrior', true);
      context.commit('setNextStop', context.state.events[0].start.time);
    } else if (isPast(context.state.events[0].start) && context.state.prior) {
      context.commit('setPrior', false);
      context.commit('setLastStop', context.state.events[0].start.time);
      context.commit('setNextStop', context.state.events[0].end.time);
    }
  },
  /**
   * Update Time Til
   * Updates time til message on home page.
   * @param {Function} context Vuex Context
   */
  async updateTimeTil(context) {
    console.log(context.rootState);
    if (context.rootState.user.user.textType === 'verbouse') {
      console.log(context.state.nextStop);
      context.commit('setTimeTil', moment(context.state.nextStop).fromNow(true));
    } else if (context.rootState.user.user.textType === 'simple') {
      context.commit('setTimeTil', moment(context.state.nextStop).fromNow(true));
    }
  },
  /**
   * Start Loop
   * @param {Function} context Vuex Context
   */
  async startLoop(context) {
    const interval = setInterval(context.dispatch('checkEvent'), 1000);
    context.commit('setSavedInterval', interval);
  },
  /**
   * End Loop
   * @param {Function} context Vuex Context
   */
  async endLoop(context) {
    clearInterval(context.state.interval);
    context.commit('setSavedInterval', null);
  }
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};