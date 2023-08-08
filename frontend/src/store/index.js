import { createStore } from 'vuex'
import { auth } from './modules/auth.module'


export default createStore({
  modules: {
    auth,
  },
  state: {
    back_api: 'http://localhoost:8686/'
  }
})