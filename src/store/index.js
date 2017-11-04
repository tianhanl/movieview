import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  pageList: [],
  currPage: 1,
  totalPage: 1,
};

const getters = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
