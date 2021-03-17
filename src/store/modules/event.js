/* eslint-disable import/prefer-default-export,no-shadow */
import EventService from '@/services/EventService';

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'error',
          message: 'Your event has been created!',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${error.message}`,
        };
        dispatch('notification/add', notification, { root: true });
        throw error;
      });
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data);
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count'], 10));
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`,
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  // eslint-disable-next-line consistent-return
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event;
    }
    return EventService.getEvent(id)
      .then((response) => {
        commit('SET_EVENT', response.data);
        return response.data;
      });
  },
};

export const getters = {
  getEventById: (state) => (id) => state.events.find((event) => event.id === id),
};
