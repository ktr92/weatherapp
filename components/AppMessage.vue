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
    // получаем сообщение из стора
    message () {
      return this.$store.getters.message
    },
    // определяем тип сообщения
    typeError () {
      return this.$store.getters.message.type === 'error'
    },
    typeInfo () {
      return this.$store.getters.message.type === '' || this.$store.getters.message.type === 'info'
    },
    typeWarning () {
      return this.$store.getters.message.type === 'warning'
    }
  }
}
</script>
