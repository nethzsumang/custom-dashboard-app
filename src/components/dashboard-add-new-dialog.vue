<template>
    <div>
      <v-dialog
        v-model="dialogState"
        width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="2"
            color="primary"
            block
            v-bind="attrs"
            v-on="on">
              Add Dashboard
          </v-btn>
        </template>

        <v-card>
          <v-card-title> Add New Dashboard </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="dashboardPath"
              label="Dashboard Path">
            </v-text-field>

            <v-text-field
              v-model="dashboardName"
              label="Dashboard Name">
            </v-text-field>

            <div class="d-flex justify-center mt-3">
              <v-btn
                color="danger"
                class="mr-5"
                @click='resetCreateDashboardData'>
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                @click='saveCreateDashboardData'>
                Save
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { DEFAULT_DASHBOARD_DATA } from '../constants/app-constants'
import Dashboard from '../views/Dashboard'

export default {
  name: 'DashboardAddNewDialog',
  computed: {
    dialogState: {
      get () {
        return this.$store.state.editDashboardDialogToggle
      },
      set (bToggle) {
        this.$store.dispatch('setEditDashboardDialogToggle', bToggle)
      }
    },
    dashboardPath: {
      get () {
        return this.$store.state.createDashboardData.path
      },
      set (sPath) {
        this.$store.dispatch('setCreateDashboardData', {
          ...this.$store.state.createDashboardData,
          path: sPath
        })
      }
    },
    dashboardName: {
      get () {
        return this.$store.state.createDashboardData.name
      },
      set (sName) {
        this.$store.dispatch('setCreateDashboardData', {
          ...this.$store.state.createDashboardData,
          name: sName
        })
      }
    }
  },
  methods: {
    /**
     * Reset data
     */
    async resetCreateDashboardData () {
      await this.$store.dispatch('setCreateDashboardData', { ...DEFAULT_DASHBOARD_DATA })
      this.dialogState = false
    },
    /**
     * Save data
     */
    async saveCreateDashboardData () {
      const aDashboardData = [...this.$store.state.data]
      const aData = {
        id: aDashboardData.length + 1,
        path: this.dashboardPath,
        name: this.dashboardName,
        cards: []
      }
      const oRoute = {
        path: (aData.path[0] !== '/') ? '/' + aData.path : aData.path,
        name: aData.name,
        component: Dashboard
      }
      aDashboardData.push(aData)
      await this.$store.dispatch('setDashboardData', aDashboardData)
      await this.$store.dispatch('setRoutes', [
        ...this.$store.state.routes,
        oRoute
      ])
      await this.$router.addRoute(oRoute)
      await this.resetCreateDashboardData()
    }
  }
}
</script>

<style lang="sass">

</style>
