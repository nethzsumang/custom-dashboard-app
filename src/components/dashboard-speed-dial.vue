<template>
  <v-speed-dial
    v-model="speedDial"
    fixed
    bottom
    right
    direction="top"
    :open-on-hover="false"
    transition="slide-y-reverse-transition" >

    <template v-slot:activator>
      <v-btn
        v-model="speedDial"
        color="blue darken-2"
        :disabled="$store.state.editCardToggle"
        dark
        fab >

        <v-icon v-if="speedDial"> mdi-close </v-icon>
        <v-icon v-else> mdi-database </v-icon>
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
</template>

<script>
export default {
  name: 'DashboardSpeedDial',
  props: {
    editCards: {
      type: Function,
      required: true
    },
    saveDashboardData: {
      type: Function,
      required: true
    },
    downloadDashboardData: {
      type: Function,
      required: true
    },
    syncToCloud: {
      type: Function,
      required: true
    },
    removeDashboardData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      speedDial: false
    }
  }
}
</script>
