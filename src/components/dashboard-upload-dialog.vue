<template>
  <v-dialog
    v-model="dialogState"
    persistent
    width="800"
    @click:outside="false">

    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        color="primary"
        v-bind="attrs"
        v-on="on">
        <v-icon>mdi-upload</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title> Upload Dashboard Data </v-card-title>

      <v-card-text>
        <v-file-input
          label="Upload dashboard data"
          accept="application/json"
          truncate-length="50"
          @change="changeFileInput"
        ></v-file-input>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DashboardUploadDialog',
  data () {
    return {
      dialogState: false
    }
  },
  methods: {
    changeFileInput (files) {
      console.log(files)
    }
  }
}
</script>
