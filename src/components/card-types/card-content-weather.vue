<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardContentWeather',
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      oWeatherData: {}
    }
  },
  async mounted () {
    await this.getWeatherData()
  },
  methods: {
    /**
     * Gets weather data
     * @returns object
     */
    async getWeatherData () {
      await this.fetchWeatherData()
    },
    async fetchWeatherData () {
      try {
        const { data } = await axios.get(this.cardData.dataSource.url)
        this.oWeatherData = data
      } catch (e) { }
    }
  }
}
</script>
