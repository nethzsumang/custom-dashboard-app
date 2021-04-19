<template>
  <div class='pl-3 pt-5 pb-5'>
    <h1>{{ time }}</h1>
    <h4>{{ date }}</h4>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment-timezone'

export default {
  name: 'CardContentDatetime',
  props: {
    cardData: {
      type: Object,
      required: true
    },
    currentStep: {
      type: Number,
      default: () => -1
    }
  },
  data () {
    return {
      date: null,
      time: null,
      interval: 0
    }
  },
  mounted () {
    this.updateDatetime()
    this.interval = setInterval(this.updateDatetime, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    updateDatetime () {
      const oMoment = moment().tz(this.cardData.dataSource.datetime.timezone)
      let sTimeFormat = 'HH:mm:ss'
      if (this.cardData.dataSource.datetime.twentyFourFormat === false) {
        sTimeFormat = 'hh:mm:ss a'
      }
      this.date = oMoment.format('MMMM DD, YYYY')
      this.time = oMoment.format(sTimeFormat)
    }
  }
}
</script>
