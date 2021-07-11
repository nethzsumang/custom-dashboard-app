<template>
  <div>
    <CardDetailsCustom v-if="cardType === cardTypes.CUSTOM" />
    <CardDetailsWeather v-if="cardType === cardTypes.WEATHER" />
    <CardDetailsCarousel v-if="cardType === cardTypes.PICTURE_CAROUSEL" />
    <CardDetailsDatetime v-if="cardType === cardTypes.DATETIME" />
    <CardDetailsQuotes v-if="cardType === cardTypes.QUOTES" />
  </div>
</template>

<script>
import { CARD_TYPES } from '../../constants/app-constants'
import CardDetailsCustom from '../details-content/card-details-custom'
import CardDetailsWeather from '../details-content/card-details-weather'
import CardDetailsCarousel from '../details-content/card-details-carousel'
import CardDetailsDatetime from '../details-content/card-details-datetime'
import CardDetailsQuotes from '../details-content/card-details-quotes'

export default {
  name: 'CustomSettings',
  components: {
    CardDetailsCustom,
    CardDetailsWeather,
    CardDetailsCarousel,
    CardDetailsDatetime,
    CardDetailsQuotes
  },
  computed: {
    cardType: {
      get () {
        return this.$store.state.createCardData.type
      },
      set (sType) {
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          type: sType
        })
      }
    }
  },
  data () {
    return {
      cardTypes: CARD_TYPES
    }
  }
}
</script>
