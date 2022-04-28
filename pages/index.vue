<template>
  <div>
    <AppLoader v-if="loading" />
    <div v-else class="flex flex-wrap md:-mx-2 w-full">
      <AppCity
        v-for="item in cities"
        :key="item.id"
        :city="item"
        @remove="remove(item)"
      />
      <AppForm />
    </div>
  </div>
</template>

<script>
export default {
  asyncData () {},
  data () {
    return {
      init: [],
      loading: true
    }
  },
  computed: {
    // получаем актуальный список городов. Если есть данные в vuex, то берем их, иначе из локальноо хранилища
    cities () {
      return this.$store.getters['weather/cities'] || this.init
    }
  },
  async mounted () {
    // если в хранилище есть города, грузим данные для них
    this.init = await this.$store.dispatch('weather/initCities')
    // если в хранилище ничего нет, получаем координаты клиента, и если данные получены, то добавляем его город первым
    if (!this.cities.length) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const current = await this.$store.dispatch('weather/getByCoord', position.coords)
          if (current) {
            this.$store.dispatch('weather/addCity', current)
          }
        },
        () => {
          this.$store.dispatch('setMessage', { value: this.$store.getters.code.geo, type: 'error' })
        }
      )
    }
    this.loading = false
  },
  methods: {
    // событие для удаления города
    remove (item) {
      this.$store.dispatch('weather/removeCity', item)
    }
  }
}
</script>
