import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Huyadam' },
    categories: ['sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    }
    ,
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event);
      commit('ADD_EVENT', event);
    },
  },
  modules: {
  },
  getters: {
    getEventById: (state) => (id) => state.events.find((event) => event.id === id),
  },
});
