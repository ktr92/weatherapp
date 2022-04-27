export const state = () => ({
  error: {
    value: 'Добро пожаловать!',
    type: 'info'
  }
})

export const actions = {
  setMessage ({ commit }, message) {
    commit('setError', message)
    setTimeout(() => {
      commit('clearError')
    }, 5000)
  }
}

export const mutations = {
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}

export const getters = {
  error: state => state.error
}
