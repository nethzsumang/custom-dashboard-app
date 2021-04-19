<template>
  <div>
    <v-container fluid>
      <div
        v-if="oDashboardData.cards.length === 0"
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
      <v-row v-for="card in oDashboardData.cards"
        :key="card.name">
        <v-col>
          <DashboardCard :cardData="card" />
        </v-col>
      </v-row>
    </v-container>
    <div class="d-flex justify-center">
      <DashboardAddNewCardDialog />
    </div>
    <v-speed-dial
      v-model="speedDial"
      fixed
      bottom
      right
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="speedDial"
          color="blue darken-2"
          dark
          fab >
          <v-icon v-if="speedDial">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-database
          </v-icon>
        </v-btn>
      </template>

      <v-btn
        fab
        dark
        color="secondary"
        @click="editCards">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="primary"
        @click='saveDashboardData'>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="primary"
        @click='downloadDashboardData'>
        <v-icon>mdi-download</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="primary"
        @click='syncToCloud'>
        <v-icon>mdi-cloud-sync</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        color="danger"
        @click='removeDashboardData'>
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import _ from 'lodash'
import DashboardCard from '../components/dashboard-card'
import DashboardAddNewCardDialog from '../components/dashboard-add-new-card-dialog'
import { saveData, removeDashboardData } from '../libraries/dashboard-data'

export default {
  name: 'Dashboard',
  components: {
    DashboardCard,
    DashboardAddNewCardDialog
  },
  data () {
    return {
      oDashboardData: {},
      speedDial: false,
      downloadButtonHref: ''
    }
  },
  watch: {
    $route: {
      handler: function (newValue) {
        this.oDashboardData = this.getDashboardData(newValue)
      },
      deep: true
    }
  },
  created () {
    this.oDashboardData = this.getDashboardData(this.$route)
  },
  methods: {
    /**
     * Gets dashboard data
     * @return object
     */
    getDashboardData (oRoute) {
      const aDashboardData = this.$store.state.data
      return _.find(aDashboardData, (oValue) => {
        return oValue.path === oRoute.path
      })
    },
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
        cancelButtonText: 'Cancel'
      }).then((isConfirmed) => {
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
