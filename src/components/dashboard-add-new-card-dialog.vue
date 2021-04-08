<template>
    <div>
      <v-dialog
        v-model="dialogState"
        width="800"
      >
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
                <v-stepper-step step="1" editable>
                  Common Settings
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" editable>
                  Edit Details
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" editable>
                  Preview
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-content step="1">
                <v-text-field
                  v-model="cardTitle"
                  label="Card Title"
                ></v-text-field>

                <v-text-field
                  v-model="cardSubtitle"
                  label="Card Subtitle"
                ></v-text-field>

                <v-select
                  :items="cardTypeList"
                  v-model="cardType"
                  label="Card Type">
                </v-select>
              </v-stepper-content>

              <v-stepper-content step="2">
                <div v-if="cardType === cardTypes.CUSTOM">
                  <h3 class="mb-3"> Custom Card Content </h3>
                  <vue-editor v-model="cardContent" :editorToolbar='editorToolbar' />
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <h3 class="mb-3"> Preview </h3>
                <DashboardCard
                  :cardData='$store.state.createCardData'
                  :previewOnly='true' />
                <div class="d-flex justify-center mt-3">
                  <v-btn
                    color="danger"
                    class="mr-5"
                    @click='resetCreateCardData'>
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click='saveCreateCardData'>
                    Save
                  </v-btn>
                </div>
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { CARD_TYPES, DEFAULT_CARD_DATA } from '../constants/app-constants'
import DashboardCard from '../components/dashboard-card'
import _ from 'lodash'

export default {
  name: 'DashboardAddNewCardDialog',
  components: {
    DashboardCard
  },
  data () {
    return {
      step: 1,
      cardTypeList: Object.values(CARD_TYPES),
      cardTypes: CARD_TYPES,
      editorToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
      ]
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
    },
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
    },
    cardContent: {
      get () {
        return this.$store.state.createCardData.content
      },
      set (sContent) {
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          content: sContent
        })
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
      let aDashboardData = { ...this.$store.state.data }
      const sCurrentRoute = this.$route.path
      aDashboardData = _.map(aDashboardData, (oValue) => {
        if (sCurrentRoute === oValue.path) {
          if (this.$store.state.cardIdToEdit === null) {
            oValue.cards.push({
              title: this.cardTitle,
              subtitle: this.cardSubtitle,
              type: this.cardType,
              content: this.cardContent,
              id: oValue.cards.length + 1
            })
          } else {
            oValue.cards = _.map(oValue.cards, (oCard) => {
              if (this.$store.state.cardIdToEdit === oCard.id) {
                oCard = {
                  title: this.cardTitle,
                  subtitle: this.cardSubtitle,
                  type: this.cardType,
                  content: this.cardContent
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
