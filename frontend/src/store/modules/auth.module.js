import AuthService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        response => {
          if(response && response.token){
            commit('loginSuccess', response);
            return Promise.resolve(response);
          } else {
            commit('loginFailure');
            return Promise.reject(response?.message || 'Falha no login.');
          }
          
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error?.message || 'Erro de comunicação com o servidor.');
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    newItem({ commit }, msg){
      console.log(msg);
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    update({ commit }, user) {
      return AuthService.update(user).then(
        response => {
         // commit('updateSuccess');
          return Promise.resolve(response.data);
        },
        error => {
        //  commit('updateFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    stateToken(state) {
      return state.user.token;
    },
    stateUser(state) {
      return state.user.id;
    },
    loggedUser(state) {
      return state.user;
    },
    isLogged(state) {
      return state.status.loggedIn;
    }
  }
};