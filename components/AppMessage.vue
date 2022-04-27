<template>
  <div
    v-if="message"
    class="my-2 fixed container bottom-0 bg-gray-200 rounded-lg z-50"
    :class="{'text-red-400': typeError, 'text-green-500': typeInfo, 'text-yellow-500': typeWarning, }"
  >
    <p class="py-2 px-4 font-bold text-2xl">
      {{ message.value }}
    </p>
  </div>
</template>

<script>
export default {
  // компонент для оповещения о событиях (ошибки, успешные запросы и т.д.)
  computed: {
    message () {
      return this.$store.getters.error
    },
    typeError () {
      return this.$store.getters.error.type === 'error'
    },
    typeInfo () {
      return this.$store.getters.error.type === '' || this.$store.getters.error.type === 'info'
    },
    typeWarning () {
      return this.$store.getters.error.type === 'warning'
    }
  }
}
</script>
