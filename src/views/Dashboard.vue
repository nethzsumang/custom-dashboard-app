<template>
  <div>
    <v-container fluid>
      <div
        v-if="cards.length === 0"
        class="d-flex justify-center">
        <v-container fluid>
          <v-row>
            <v-col>
              <div class="text-center">Feels lonely in here...</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="text-center">Please click the button below to Add a new Card here.</div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <draggable
        :list="cards"
        v-bind="dragOptions">
        <div
          v-for="card in cards"
          :key="card.name">
          <v-row>
            <v-col>
              <DashboardCard :cardData="card" />
            </v-col>
          </v-row>
        </div>
      </draggable>
    </v-container>
    <div class="d-flex justify-center">
      <DashboardAddNewCardDialog />
    </div>
    <DashboardSpeedDial
      :editCards="editCards"
      :saveDashboardData="saveDashboardData"
      :downloadDashboardData="downloadDashboardData"
      :syncToCloud="syncToCloud"
      :removeDashboardData="removeDashboardData" />
  </div>
</template>

<script>
import _ from 'lodash'
import DashboardCard from '../components/dashboard-card'
import DashboardAddNewCardDialog from '../components/dashboard-add-new-card-dialog'
import DashboardSpeedDial from '../components/dashboard-speed-dial'
import { saveData, removeDashboardData } from '../libraries/dashboard-data'
import draggable from 'vuedraggable'

export default {
  name: 'Dashboard',
  components: {
    DashboardCard,
    DashboardAddNewCardDialog,
    DashboardSpeedDial,
    draggable
  },
  data () {
    return {
      downloadButtonHref: ''
    }
  },
  computed: {
    dragOptions () {
      return {
        disabled: !this.$store.state.editCardToggle
      }
    },
    cards: {
      get () {
        const oDashboardData = this.$store.state.data
        const oFilteredData = _.find(oDashboardData, (oValue) => {
          return oValue.path === this.$route.path
        })
        return oFilteredData.cards
      },
      set (aCards) {
        let oDashboardData = this.$store.state.data
        oDashboardData = _.map(oDashboardData, (oValue) => {
          if (oValue.path === this.$route.path) {
            oValue.cards = aCards
          }
          return oValue
        })

        this.$store.dispatch('setDashboardData', oDashboardData)
      }
    }
  },
  methods: {
    /**
     * Save dashboard data
     */
    saveDashboardData () {
      saveData(this.$store.state.data)
      this.$swal({
        text: 'Successfully saved the dashboard data.',
        icon: 'success'
      })
    },
    /**
     * Syncs to cloud (not yet supported)
     */
    syncToCloud () {
      this.$swal({
        text: 'This function is not yet supported in this version.',
        icon: 'info'
      })
    },
    /**
     * Removes dashboard data
     */
    removeDashboardData () {
      this.$swal({
        text: 'You will not be able to recover your dashboard data. Do you wish to continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          removeDashboardData()
          this.$swal({
            text: 'Successfully deleted your dashboard data.',
            icon: 'success'
          }).then(() => {
            window.location.reload()
          })
        }
      })
    },
    /**
     * Sets edit card toggle
     */
    editCards () {
      this.dragOptions.disabled = false
      this.$store.dispatch('setEditCardToggle', true)
    },
    /**
     * Download dashboard data
     */
    downloadDashboardData () {
      const fileDownload = require('js-file-download')
      fileDownload(
        JSON.stringify(this.$store.state.data),
        'dashboardData.json'
      )
    }
  }
}
</script>
