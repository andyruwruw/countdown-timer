import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user';
import event from './modules/event';
import calendar from './modules/calendar';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    calendar,
  },
})
