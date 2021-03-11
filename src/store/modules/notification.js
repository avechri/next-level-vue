// eslint-disable-next-line import/prefer-default-export
export const namespaced = true;

export const state = {
  notifications: [],
};

let nextId = 1;

export const mutations = {
  // eslint-disable-next-line no-shadow
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId += 1,
    });
  },
  // eslint-disable-next-line no-shadow
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id,
    );
  },
};

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification);
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove);
  },
};
