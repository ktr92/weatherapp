export const state = () => ({
  cities: []
})

export const actions = {
  addCity ({ state, commit, dispatch }, payload) {
    if (!state.cities.filter(item => item.id === payload.id).length) {
      commit('addOne', payload)
    } else {
      dispatch('setMessage', { value: 'Такой город уже добавлен!', type: 'warning' }, { root: true })
    }
  },
  removeCity ({ state, commit }, payload) {
    commit('removeOne', payload)
  }
}

export const mutations = {
  addOne (state, payload) {
    state.cities.push(payload)
  },
  removeOne (state, payload) {
    console.log(payload)
    state.cities = state.cities.filter(item => item.id !== payload.id)
  }
}

export const getters = {
  cities: state => state.cities
}
