export const state = () => ({
})

export const actions = {
  async getWeather ({ dispatch }, formData) {
    try {
      const uri = `https://api.openweathermap.org/data/2.5/weather?q=${formData}&appid=6becd2fb6d50d754170af86e6c22c3a0&units=metric`
      return await this.$axios.$get(uri)
    } catch (error) {
      dispatch('setMessage', { value: error.message, type: 'error' }, { root: true })
    }
  }
}

export const mutations = {}

export const getters = {}
