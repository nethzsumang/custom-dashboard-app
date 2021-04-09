<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-icon class="mr-3">mdi-temperature-celsius</v-icon>
          <span>Temperature: </span>
        </v-col>
        <v-col>
          <span>{{ temperature }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-icon class="mr-3">{{ weatherIcon }}</v-icon>
          <span>Weather: </span>
        </v-col>
        <v-col>
          <span>{{ weatherDescription }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-icon class="mr-3">mdi-tailwind</v-icon>
          <span>Wind speed: </span>
        </v-col>
        <v-col>
          <span>{{ windSpeed }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getReadableWeather } from '../../libraries/weather-data'
import axios from 'axios'
import _ from 'lodash'

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
      oWeatherData: null,
      dataFetched: false
    }
  },
  computed: {
    weatherIcon () {
      return 'mdi-weather-cloudy'
    },
    temperature () {
      return this.getDataSourceValue('temperatureResponsePath')
    },
    weatherDescription () {
      return this.getDataSourceValue('weatherNameResponsePath')
    },
    windSpeed () {
      return this.getDataSourceValue('windSpeedResponsePath')
    }
  },
  watch: {
    cardData: {
      handler: async function (newValue, oldValue) {
        if (_.isEqualWith(newValue.dataSource, oldValue.dataSource, this.compareWeatherConfig) === false) {
          await this.getWeatherData()
        }
      },
      deep: true
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
    /**
     * Fetches weather data
     */
    async fetchWeatherData () {
      if (this.dataFetched === true) {
        return
      }

      try {
        const { data } = await axios.get(this.cardData.dataSource.url)
        this.oWeatherData = data
        this.dataFetched = true
      } catch (e) { }
    },
    /**
     * Compares weather config
     */
    compareWeatherConfig (objValue, othValue) {
      if (Object.keys(objValue).length !== Object.keys(othValue).length) {
        return false
      }

      return _.isEqual(objValue, othValue)
    },
    /**
     * Iterate through data to fetch the result
     */
    getDataSourceValue (sKey) {
      const responsePath = this.cardData.dataSource[sKey]
      if (responsePath === undefined) {
        return ''
      }

      const aPath = responsePath.split('.')

      // default to whole data then iterate through the response path
      if (this.oWeatherData === null) {
        return 'loading...'
      }

      let value = { ...this.oWeatherData }
      for (let path of aPath) {
        if (Number.isInteger(path) === true) {
          path = parseInt(path, 10)
        }
        value = value[path]
      }
      return getReadableWeather(value)
    }
  }
}
</script>
