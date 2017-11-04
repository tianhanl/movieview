/* eslint-disable no-param-reassign */
const addPageList = function (state, payload) {
  state.pageList[payload.pos] = payload.list;
};

const setCurrPage = function (state, currPage) {
  state.currPage = currPage;
};

const setTotalPage = function (state, total) {
  state.totalPage = total;
};

const mutations = {
  addPageList,
  setCurrPage,
  setTotalPage,
};

export default mutations;
