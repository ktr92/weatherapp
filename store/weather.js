export const state = () => ({
  API_KEY: '6becd2fb6d50d754170af86e6c22c3a0',
  API_URI: 'https://api.openweathermap.org/data/2.5/weather',
  API_UNITS: 'metric',
  cities: [],
  citiesList: []
})

export const actions = {
  // получение погодных данных для города из формы
  async getWeather ({ state, dispatch }, formData) {
    try {
      const uri = `${state.API_URI}?q=${formData}&appid=${state.API_KEY}&units=${state.API_UNITS}`
      return await this.$axios.$get(uri)
    } catch (error) {
      dispatch('setMessage', { value: error.message, type: 'error' }, { root: true })
    }
  },
  // получение погодных данных на основе координат клиента
  async getByCoord ({ state, dispatch }, position) {
    try {
      const uri = `${state.API_URI}?lat=${position.latitude}&lon=${position.longitude}&appid=${state.API_KEY}&units=${state.API_UNITS}`
      return await this.$axios.$get(uri)
    } catch (error) {
      dispatch('setMessage', { value: error.message, type: 'error' }, { root: true })
    }
  },

  // добавление города
  addCity ({ state, commit, dispatch, rootGetters }, payload) {
    // проверяем, не добавлен ли такой город ранее
    if (!state.cities.filter(item => item.id === payload.id).length) {
      commit('addOne', payload)
      // обновляем локальное хранилище
      if (process.client) {
        localStorage.setItem('cities', JSON.stringify(state.citiesList))
      }
    } else {
      dispatch('setMessage', { value: rootGetters.code.exist, type: 'warning' }, { root: true })
    }
  },
  // удаление города
  removeCity ({ state, commit }, payload) {
    commit('removeOne', payload)
    // обновляем локальное хранилище
    if (process.client && localStorage.getItem('cities').length) {
      // если удаляется последний город, то удаляем хранилище (чтобы при следующем входе вновь добавился город по координатам клиента )
      state.citiesList.length > 0 ? localStorage.setItem('cities', JSON.stringify(state.citiesList)) : localStorage.removeItem('cities')
    }
  },
  // инициализация из локального хранилища
  async initCities ({ commit, dispatch }) {
    if (process.client) {
      const cities = JSON.parse(localStorage.getItem('cities'))
      for (const item in cities) {
        const city = await dispatch('getWeather', cities[item])
        commit('addOne', city)
      }
    }
  }
}

export const mutations = {
  addOne (state, payload) {
    state.cities.push(payload)
    state.citiesList.push(payload.name)
  },
  removeOne (state, payload) {
    state.cities = state.cities.filter(item => item.id !== payload.id)
    state.citiesList = state.citiesList.filter(item => item !== payload.name)
  },
  initAll (state, payload) {
    state.cities = payload
  }
}

export const getters = {
  cities: state => state.cities,
  citiesList: state => state.citiesList
}
