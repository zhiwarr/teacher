export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.email = payload.email;
    state.token = payload.token;
    state.password = payload.password;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
