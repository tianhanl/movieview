/* eslint-disable no-param-reassign */
const addPageList = function (state, payload) {
  state.pageList[payload.pos] = payload.list;
};

const setCurrPage = function (state, currPage) {
  state.currPage = currPage;
};

const setTotalMovie = function (state, total) {
  state.totalMovie = total;
};

const mutations = {
  addPageList,
  setCurrPage,
  setTotalMovie,
};

export default mutations;
