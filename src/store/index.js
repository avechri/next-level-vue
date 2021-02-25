import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam' },
    categories: ['sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'],
    events: [],
    eventsTotal: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENT(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => commit('ADD_EVENT', event));
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count'], 10));
          commit('SET_EVENT', response.data);
        })
        .catch((error) => {
          console.log(`There was an error:${error.response}`);
        });
    },
  },
  modules: {
  },
  getters: {
    getEventById: (state) => (id) => state.events.find((event) => event.id === id),
    getEventsTotal: (state) => state.eventsTotal,
  },
});
