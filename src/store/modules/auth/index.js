import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
const AuthModule = {
  state: {
    tokenExpiration: null,
    userId: null,
    token: null,
    isLogin: false,
    email: null,
    password: null,
    isLoaded: false,
    didAutoLogout: false,
  },
  getters,
  actions,
  mutations,
};
export default AuthModule;
