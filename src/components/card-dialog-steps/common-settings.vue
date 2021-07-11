<template>
  <div>
    <v-text-field
      v-model="cardTitle"
      label="Card Title">
    </v-text-field>

    <v-text-field
      v-model="cardSubtitle"
      label="Card Subtitle">
    </v-text-field>

    <v-select
      :items="cardTypeList"
      v-model="cardType"
      label="Card Type">
    </v-select>
  </div>
</template>

<script>
import { CARD_TYPES } from '../../constants/app-constants'

export default {
  name: 'CommonSettings',
  computed: {
    cardTitle: {
      get () {
        return this.$store.state.createCardData.title
      },
      set (sTitle) {
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          title: sTitle
        })
      }
    },
    cardSubtitle: {
      get () {
        return this.$store.state.createCardData.subtitle
      },
      set (sSubtitle) {
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          subtitle: sSubtitle
        })
      }
    },
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
      cardTypeList: Object.values(CARD_TYPES)
    }
  }
}
</script>
