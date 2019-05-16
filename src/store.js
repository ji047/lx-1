import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",
    role:"",
    roleList:[],
    search_stdInfo:{}
  },
  mutations: {
    setResult(state,data){
      state.search_stdInfo = data
    }
  },
  actions: {

  }
})
