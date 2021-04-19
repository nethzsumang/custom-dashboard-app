<template>
  <div>
    <h3 class="mb-3"> Datetime Content Settings </h3>
    <v-select
      :items="TIMEZONE_LIST"
      v-model="timezone"
      label="Timezone">
    </v-select>
    <v-checkbox
      v-model="twentyFourFormat"
      label='Use 24-hour format?'>
    </v-checkbox>
  </div>
</template>

<script>
import { DATETIME_OPTIONS } from '../../constants/app-constants'

export default {
  name: 'CardDetailsDatetime',
  data () {
    return {
      TIMEZONE_LIST: DATETIME_OPTIONS.TIMEZONES
    }
  },
  computed: {
    twentyFourFormat: {
      get () {
        if (this.$store.state.createCardData.dataSource.datetime === undefined) {
          return false
        }
        return this.$store.state.createCardData.dataSource.datetime.twentyFourFormat
      },
      set (bValue) {
        let newDataSource = { ...this.$store.state.createCardData.dataSource }
        newDataSource.datetime = {
          ...(newDataSource.datetime || {}),
          twentyFourFormat: bValue
        }
        newDataSource = {
          ...this.$store.state.createCardData.dataSource,
          ...newDataSource
        }

        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: newDataSource
        })
      }
    },
    timezone: {
      get () {
        if (this.$store.state.createCardData.dataSource.datetime === undefined) {
          return this.TIMEZONE_LIST[0]
        }
        return this.$store.state.createCardData.dataSource.datetime.timezone
      },
      set (value) {
        let newDataSource = { ...this.$store.state.createCardData.dataSource }
        newDataSource.datetime = {
          ...(newDataSource.datetime || {}),
          timezone: value
        }
        newDataSource = {
          ...this.$store.state.createCardData.dataSource,
          ...newDataSource
        }

        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: newDataSource
        })
      }
    }
  },
  created () {
    if (this.$store.state.cardIdToEdit === null) {
      this.timezone = this.TIMEZONE_LIST[0]
      this.twentyFourFormat = false
    }
  }
}
</script>
