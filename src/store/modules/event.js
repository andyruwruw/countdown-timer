import axios from 'axios';
import { isPast } from 'date-fns'

const moduleState = {
  events: [],
};

const moduleMutations = {
  setEvents(state, events) {
    state.events = events;
  },
};

const moduleGetters = {
  events: state => state.events,
  nextEvent: (state) => {
    if (state.events.length) {
      return state.events[0];
    }
    return null;
  },
  nextStop: (state) => {
    if (state.events.length) {
      const start = new Date(state.events[0].start.time);
      if (isPast(start)) {
        return new Date(state.events[0].end.time);
      } else {
        return start;
      }
    }
    return null;
  },
  eventActive: (state) => {
    if (state.events.length) {
      const start = new Date(state.events[0].start.time);
      return isPast(start);
    }
    return null;
  }
}

const moduleActions = {
  async getEvents(context) {
    let { data } = await axios.get('/api/events');

    for (let i = 0; i < data.length; i++) {
      data[i].start.time = (new Date(data[i].start.dateTime)).getTime();
      data[i].end.time = (new Date(data[i].end.dateTime)).getTime();
    }

    await data.sort((a, b) => {
      return a.end.time - b.end.time;
    });

    context.commit('setEvents', data);
  }
};

export default {
  namespaced: true,
  state: moduleState,
  mutations: moduleMutations,
  getters: moduleGetters,
  actions: moduleActions,
};