<template>
  <div class="group lg:w-1/4 md:w-1/3 sm:w-1/2 w-full  p-2 overflow-hidden">
    <div v-if="city" class="p-4 pr-28 bg-white rounded-md h-40 shadow-md relative">
      <div class="font-bold text-2xl mb-2">{{ city.name }} ({{ city.sys.country }})</div>
      <div
        class="font-bold text-3xl mb-2"
        :class="{'text-blue-500': isCold, 'text-yellow-500': !isCold }"
      >{{ temp }} &#8451;</div>
      <div v-if="city.weather">
        <div v-for="item in city.weather" :key="item.id">
          <span>{{ item.main }}</span>
          <img
            class="absolute right-4 top-4"
            :src="`http://openweathermap.org/img/wn/${item.icon}@2x.png`"
          >
        </div>
      </div>
      <button class="absolute right-0 -top-2 border-0 text-black text-4xl leading-0 text-red-400" @click="remove">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  // на входе получаем 1 город
  props: {
    city: Object
  },
  data () {
    return {
    }
  },
  computed: {
    temp () {
      // округляем градусы до целых
      return Math.round(this.city.main.temp)
    },
    isCold () {
      // цвет шрифта температуры будет синим, если холодно. И желтый, если тепло
      return this.temp < 0
    }
  },
  methods: {
    remove () {
      // событие удаления города, эмит на родителя
      this.$emit('remove')
    }
  }
}
</script>
