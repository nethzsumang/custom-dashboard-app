<template>
  <div>
    <v-select
      :items="aWeatherItems"
      v-model="oDataSource.source">
    </v-select>
    <div v-if="oDataSource.source === WEATHER_SOURCES.GOWEATHER">
      <v-text-field
        v-model="oDataSource.city"
        label="City">
      </v-text-field>
    </div>
    <div v-if="oDataSource.source === WEATHER_SOURCES.SEVEN_TIMER">
      <v-text-field
        v-model="oDataSource.lat"
        label="Latitude">
      </v-text-field>
      <v-text-field
        v-model="oDataSource.long"
        label="Longitude">
      </v-text-field>
    </div>
  </div>
</template>

<script>
import { WEATHER_SOURCES } from '../../constants/app-constants'

export default {
  name: 'CardDetailsWeather',
  data () {
    return {
      WEATHER_SOURCES: WEATHER_SOURCES,
      aWeatherItems: Object.values(WEATHER_SOURCES),
      oDataSource: {
        source: null,
        city: null,
        lat: null,
        long: null
      }
    }
  },
  watch: {
    oDataSource: {
      handler: async function (newValue) {
        let aDataSource = this.$store.state.createCardData.dataSource
        if (newValue.source === WEATHER_SOURCES.GOWEATHER) {
          const sUrl = 'https://goweather.herokuapp.com/weather/' + this.oDataSource.city
          aDataSource = {
            ...aDataSource,
            url: sUrl,
            temperatureResponsePath: 'temperature',
            weatherNameResponsePath: 'description',
            windSpeedResponsePath: 'wind'
          }
        }

        if (newValue.source === WEATHER_SOURCES.SEVEN_TIMER) {
          let sUrl = 'https://www.7timer.info/bin/civil.php?ac=0&unit=metric&output=json&tzshift=0'
          sUrl += '&lat=' + newValue.lat + '&long=' + newValue.long
          aDataSource = {
            ...aDataSource,
            url: sUrl,
            temperatureResponsePath: 'dataseries.0.temp2m',
            weatherNameResponsePath: 'dataseries.0.weather',
            windSpeedResponsePath: 'dataseries.0.wind10m.speed'
          }
        }

        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: aDataSource
        })
      },
      deep: true
    }
  },
  mounted () {
    this.oDataSource = {
      ...this.oDataSource,
      source: WEATHER_SOURCES.GOWEATHER,
      city: 'Manila',
      lat: 14.6,
      long: 121
    }
  }
}
</script>
