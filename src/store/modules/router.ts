
const state = {
  router: []
}
const mutations = {

  SET_ROUTER: (state, data) => {
    state.router = data
  }

}
const actions = {
  setRouter({ commit }, data) {
    // 给子文章排序
    data.map(e => {
      e.children.sort((a, b) => {
        return a.meta.sort - b.meta.sort
      })
    })
    commit('SET_ROUTER', data)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
