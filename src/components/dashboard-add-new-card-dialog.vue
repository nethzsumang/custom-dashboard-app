<template>
    <div>
      <v-dialog
        v-model="dialogState"
        width="800">

        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="2"
            color="primary"
            rounded
            v-bind="attrs"
            v-on="on">
              Add a Card
          </v-btn>
        </template>

        <v-card>
          <v-card-title> Add New Card </v-card-title>

          <v-card-text>
            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step :step="1" editable> Common Settings </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :step="2" editable> Edit Details </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :step="3" editable> Preview </v-stepper-step>
              </v-stepper-header>

              <v-stepper-content :step="1">
                <CommonSettings />
              </v-stepper-content>

              <v-stepper-content :step="2">
                <CustomSettings />
              </v-stepper-content>

              <v-stepper-content :step="3">
                <CardPreview
                  :step="step"
                  @saveCreateCardData="saveCreateCardData"
                  @resetCreateCardData="resetCreateCardData" />
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { CARD_TYPES, DEFAULT_CARD_DATA } from '../constants/app-constants'
import CommonSettings from './card-dialog-steps/common-settings'
import CustomSettings from './card-dialog-steps/custom-settings'
import CardPreview from './card-dialog-steps/card-preview.vue'
import _ from 'lodash'

export default {
  name: 'DashboardAddNewCardDialog',
  components: {
    CommonSettings,
    CustomSettings,
    CardPreview
  },
  data () {
    return {
      step: 1,
      cardTypes: CARD_TYPES
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.$store.state.editDialogToggle
      },
      set (bToggle) {
        this.$store.dispatch('setEditDialogToggle', bToggle)
      }
    }
  },
  methods: {
    /**
     * Reset create card data
     */
    resetCreateCardData () {
      this.$store.dispatch('setCreateCardData', { ...DEFAULT_CARD_DATA })
      this.$store.dispatch('setCardIdToEdit', null)
      this.dialogState = false
      this.step = 1
    },
    /**
     * Save create card data
     */
    saveCreateCardData () {
      let aDashboardData = [...this.$store.state.data]
      const sCurrentRoute = this.$route.path
      aDashboardData = _.map(aDashboardData, (oValue) => {
        if (sCurrentRoute === oValue.path) {
          if (this.$store.state.cardIdToEdit === null) {
            oValue.cards.push({
              title: this.$store.state.createCardData.title,
              subtitle: this.$store.state.createCardData.subtitle,
              type: this.$store.state.createCardData.type,
              content: this.$store.state.createCardData.content,
              id: oValue.cards.length + 1,
              dataSource: this.$store.state.createCardData.dataSource
            })
          } else {
            oValue.cards = _.map(oValue.cards, (oCard) => {
              if (this.$store.state.cardIdToEdit === oCard.id) {
                oCard = {
                  title: this.cardTitle,
                  subtitle: this.cardSubtitle,
                  type: this.cardType,
                  content: this.cardContent,
                  dataSource: this.$store.state.createCardData.dataSource
                }
              }
              return oCard
            })
          }
        }
        return oValue
      })
      this.$store.dispatch('setDashboardData', aDashboardData)
      this.dialogState = false
      this.step = 1
      this.resetCreateCardData()
    }
  }
}
</script>

<style lang="sass">

</style>
