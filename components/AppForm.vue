<template>
  <div class="group w-1/3 rounded border-gray-500 border-dashed hover:border-solid border-2 shadow-lg overflow-hidden">
    <div class="md:flex items-center justify-center bg-white  p-4">
      <div class="absolute opacity-100 group-hover:opacity-0">
        <svg class="w-16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><g><g><path fill="#6b7280" d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z M8,14c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S11.309,14,8,14z"/><polygon fill="#6b7280" points="9,4 7,4 7,7 4,7 4,9 7,9 7,12 9,12 9,9 12,9 12,7 9,7 "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      </div>
      <div class="opacity-0 group-hover:opacity-100">
        <form @submit.prevent="onSubmit">
          <label for="" class="w-full mb-4 text-gray-500">Введите название города</label>
          <input
            v-model="formCity"
            type="text"
            class="w-full bg-gray-200 mb-4 py-2 px-4 outline-none border-none rounded">
          <button class="bg-green-500 shadow-md 00 rounded-full py-2 px-6 text-white font-bold">
            Добавить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formCity: '',
      data: null
    }
  },
  methods: {
    // форма простая, поэтому делаем упрощенную валидацию без спец. плагинов
    async onSubmit () {
      if (this.formCity) {
        this.$store.dispatch('setMessage', { value: 'Загружаем...', type: 'warning' })
        this.data = await this.$store.dispatch('weather/getWeather', this.formCity)
        if (this.data) {
          this.$store.dispatch('setMessage', { value: 'Данные успешно получены!', type: 'info' })
          console.log(this.data)
          this.$store.dispatch('cities/addCity', this.data)
        }
      } else {
        this.$store.dispatch('setMessage', { value: 'Нужно ввести название города!', type: 'error' })
      }
    }
  }
}
</script>
