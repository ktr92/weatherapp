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
  async asyncData () {},
  computed: {
    cities () {
      return this.$store.getters['cities/cities']
    }
  },
  methods: {
    remove (item) {
      this.$store.dispatch('cities/removeCity', item)
    }
  }
}
</script>
