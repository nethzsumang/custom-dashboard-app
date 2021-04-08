<template>
    <div>
      <v-card elevation="2">
        <v-card-title>{{ cardData.title }}</v-card-title>
        <v-card-subtitle>{{ cardData.subtitle }}</v-card-subtitle>
        <v-card-text v-html='cardData.content'></v-card-text>
        <v-card-actions v-if='$store.state.editCardToggle && previewOnly === false'>
          <div class="d-flex justify-center">
            <v-btn
              color="secondary"
              class="mr-5 ml-2"
              @click="editCard">
              Edit
            </v-btn>
            <v-btn
              color="danger"
              @click="deleteCard">
              Delete
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DashboardCard',
  props: {
    cardData: {
      type: Object,
      required: true
    },
    previewOnly: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    /**
     * Edit card
     */
    editCard () {
      this.$store.dispatch('setCreateCardData', _.omit(this.cardData, ['id']))
      this.$store.dispatch('setCardIdToEdit', this.cardData.id)
      this.$store.dispatch('setEditDialogToggle', true)
    },
    /**
     * Delete card
     */
    deleteCard () {
      this.$swal({
        text: 'Are you sure you want to delete this card?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then((isConfirmed) => {
        if (isConfirmed) {
          let aDashboardData = this.$store.state.data
          const sCurrentRoute = this.$route.path
          aDashboardData = _.map(aDashboardData, (oValue) => {
            if (sCurrentRoute === oValue.path) {
              oValue.cards = _.map(oValue.cards, (oCard) => {
                if (oCard.id === this.cardData.id) {
                  return undefined
                }
                return oCard
              })
              oValue.cards = _.compact(oValue.cards)
            }
            return oValue
          })
          this.$store.dispatch('setDashboardData', aDashboardData)
        }
      })
    }
  }
}
</script>

<style lang="sass">

</style>
