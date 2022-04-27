export const state = () => ({
  cities: []
})

export const actions = {
  addCity ({ commit }, payload) {
    commit('addOne', payload)
  }
}

export const mutations = {
  addOne (state, payload) {
    state.cities.push(payload)
  },
  removeOne (state, payload) {
    state.cities.filter(item => item.id !== payload.id)
  }
}

export const getters = {
  cities: state => state.cities
}
