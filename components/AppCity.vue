<template>
  <div class="group md:w-1/3 w-full  p-2 overflow-hidden">
    <div v-if="data" class="p-4 pr-28 bg-white rounded-md h-40 shadow-md relative">
      <div class="font-bold text-2xl mb-2">{{ data.name }} ({{ data.sys.country }})</div>
      <div
        class="font-bold text-3xl mb-2"
        :class="{'text-blue-500': isCold, 'text-yellow-500': !isCold }"
      >{{ temp }} &#8451;</div>
      <div v-if="data.weather">
        <div v-for="item in data.weather" :key="item.id">
          <span>{{ item.main }}</span>
          <img class="absolute right-4 top-4"
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
  props: {
    data: Object
  },
  data () {
    return {
    }
  },
  computed: {
    temp () {
      return Math.round(this.data.main.temp)
    },
    isCold () {
      return this.temp < 0
    }
  },
  methods: {
    remove () {
      this.$emit('remove')
    }
  }
}
</script>
