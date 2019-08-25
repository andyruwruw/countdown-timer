import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    counters: null,
    current: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCounters(state, counters) {
      state.counters = counters;
    },
    setCurrent(state, current) {
      state.current = current;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
      } catch (error) {
        return "";
      }
    },
    async getCounters(context) {
      try {
        let counters = await axios.get("/api/counters/");
        context.commit('setCounters', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    changeCurrent(context, payload) {
      if (payload.reset == true)
      {
        context.commit('setCurrent', null);
      }
      else {
        context.commit('setCurrent', payload.index);
      }
    },
    async deleteCounter(context, payload) {
      try {
        let response = await axios.delete("/api/counters/" + payload.title);
      } catch (error) {
        console.log(error);
      }
    },
    async editCounter(context, payload) {
      try {
        let response = await axios.put("/api/counters/" + payload.oldtitle, payload);
        let counters = await axios.get("/api/counters/");
        context.commit('setCounters', response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
})
