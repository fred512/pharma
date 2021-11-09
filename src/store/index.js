import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) 
export default new Vuex.Store({
  state:{
    patients:[],
  },
  getters:{
  },
  mutations:{
    setPatients(state,result){
      state.patients=result
    },
  }
})