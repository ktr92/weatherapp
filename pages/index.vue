<template>
  <div class="flex">
    <div
      v-for="item in cities"
      :key="item.id"
    >
      <app-city :data="item"></app-city>
    </div>
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
  }
}
</script>
