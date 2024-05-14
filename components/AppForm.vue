<template>
  <div class="group  lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2 ">
    <div class="flex items-center justify-center bg-white p-4 h-40 rounded-md border-gray-500 border-dashed hover:border-solid border-2 shadow-md relative">
      <div class="absolute transition duration-300 w-full opacity-100 z-1 group-hover:opacity-0 group-hover:-z-1 l-0 r-0 m-auto flex justify-center">
        <svg class="w-16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><g><g><path fill="#d1d5db" d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z M8,14c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S11.309,14,8,14z" /><polygon fill="#d1d5db" points="9,4 7,4 7,7 4,7 4,9 7,9 7,12 9,12 9,9 12,9 12,7 9,7 " /></g></g><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /><g /></svg>
      </div>
      <div class=" w-full opacity-0 z-0 transition duration-300 group-hover:opacity-100">
        <form class="relative  w-full" @submit.prevent="onSubmit">
          <label for="" class="w-full mb-4 text-gray-500">Введите название города</label>
          <vue-dadata
            v-model="formCity"
            :token="dadataOptions.token"
            :from-bound="fromBound"
            :to-bound="toBound"
            :bounds="dadataOptions.bounds"
            class="w-full   my-2"
            :on-change="onChange"
          />

          <button class="bg-green-500 shadow-md 00 rounded-full py-2 px-6 text-white font-bold">
            Добавить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueDadata from 'vue-dadata'

export default {
  components: {
    'vue-dadata': VueDadata
  },
  data () {
    return {
      formCity: '',
      fromBound: 'city',
      toBound: 'city',
      data: null,
      coordinates: {
        latitude: '',
        longitude: ''
      },
      myObjectFull: {},
      dadataOptions: {
        token: 'f85c9c6cc9fec551b71deb8d0a6e95683262df12',
        type: 'ADDRESS',
        hint: false,
        geoLocation: false,
        bounds: 'city-settlement'
      }
    }
  },
  methods: {
    onChange (suggestion) {
      this.formCity = suggestion.data.city
    },
    // форма простая, поэтому достаточно сделать упрощенную валидацию на непустое поле
    async onSubmit () {
      if (this.formCity) {
        this.$store.dispatch('setMessage', { value: this.$store.getters.code.loading, type: 'warning' })
        // получаем погодные данные для указанного города
        this.data = await this.$store.dispatch('weather/getWeather', this.formCity)
        if (this.data) {
          // добавляем город, если данные получены успешно
          this.$store.dispatch('setMessage', { value: this.$store.getters.code.success, type: 'info' })
          this.$store.dispatch('weather/addCity', this.data)
        }
      } else {
        // если не ввели город, выводим сообщение
        this.$store.dispatch('setMessage', { value: this.$store.getters.code.empty, type: 'error' })
      }
    }
  }
}
</script>

<style scoped>
input.vue-dadata__input {
background: transparent !important;
border: none !important;
width: 100%;

}
</style>
