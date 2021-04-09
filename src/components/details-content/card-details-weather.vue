<template>
  <div>
    <v-text-field
      class="mb-3"
      v-model="url"
      label="Source URL"
      hint="Only 7timer.info and goweather.herokuapp.com is supported as of the moment."
      persistent-hint>
    </v-text-field>
    <h4> Response Structure </h4>
    <v-text-field
      v-model="temperatureResponsePath"
      label="Temperature (separated by '.')">
    </v-text-field>
    <v-text-field
      v-model="weatherNameResponsePath"
      label="Weather Name (separated by '.')">
    </v-text-field>
    <v-text-field
      v-model="windSpeedResponsePath"
      label="Wind Speed (separated by '.')">
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'CardDetailsWeather',
  computed: {
    url: {
      get () {
        return this.$store.state.createCardData.dataSource.url
      },
      set (sDomain) {
        let aDataSource = this.$store.state.createCardData.dataSource
        aDataSource = { ...aDataSource, url: sDomain }
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: aDataSource
        })
      }
    },
    temperatureResponsePath: {
      get () {
        return this.$store.state.createCardData.dataSource.temperatureResponsePath
      },
      set (sPath) {
        let aDataSource = this.$store.state.createCardData.dataSource
        aDataSource = { ...aDataSource, temperatureResponsePath: sPath }
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: aDataSource
        })
      }
    },
    weatherNameResponsePath: {
      get () {
        return this.$store.state.createCardData.dataSource.weatherNameResponsePath
      },
      set (sPath) {
        let aDataSource = this.$store.state.createCardData.dataSource
        aDataSource = { ...aDataSource, weatherNameResponsePath: sPath }
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: aDataSource
        })
      }
    },
    windSpeedResponsePath: {
      get () {
        return this.$store.state.createCardData.dataSource.windSpeedResponsePath
      },
      set (sPath) {
        let aDataSource = this.$store.state.createCardData.dataSource
        aDataSource = { ...aDataSource, windSpeedResponsePath: sPath }
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: aDataSource
        })
      }
    }
  }
}
</script>
