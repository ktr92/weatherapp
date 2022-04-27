<template>
  <div class="flex flex-wrap md:-mx-2 w-full">
    <app-city
      v-for="item in cities"
      :key="item.id"
      :data="item"
      @remove="remove(item)"></app-city>
    <app-form></app-form>
  </div>
</template>

<script>
export default {
  asyncData () {},
  computed: {
    cities () {
      return this.$store.getters['cities/cities']
    }
  },
  mounted () {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const current = await this.$store.dispatch('weather/getByCoord', position.coords)
        if (current) {
          this.$store.dispatch('cities/addCity', current)
        }
      },
      (error) => {
        this.$store.dispatch('setMessage', { value: error.message, type: 'error' })
      }
    )
  },
  methods: {
    remove (item) {
      this.$store.dispatch('cities/removeCity', item)
    }
  }
}
</script>
