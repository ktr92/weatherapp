export const state = () => ({
  MESSAGE_CODE: {
    fail: 'Ошибка! Что-то пошло не так',
    notfound: 'Такой город не найден!',
    exist: 'Такой город уже был добавлен!',
    empty: 'Введите название города!',
    geo: 'Не удалось определить местоположениe',
    loading: 'Загрузка...',
    success: 'Город успешно добавлен',
    remove: 'Город успешно удален!'
  },
  message: {
    value: 'Добро пожаловать!',
    type: 'info'
  }
})

export const actions = {
  // добавление сообщения об ошибке, и удаление через 5 сек
  setMessage ({ commit }, message) {
    commit('setMessage', message)
    setTimeout(() => {
      commit('clearMessage')
    }, 5000)
  }
}

export const mutations = {
  setMessage (state, message) {
    state.message = message
  },
  clearMessage (state) {
    state.message = null
  }
}

export const getters = {
  message: state => state.message,
  code: state => state.MESSAGE_CODE
}
