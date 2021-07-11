<template>
  <v-app>
    <DashboardDrawer />

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="expandedDrawer = !expandedDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name + ' Dashboard'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$store.state.editCardToggle"
        elevation="0"
        color="accent"
        @click="handleDoneEditingClick">
        DONE EDITING
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import DashboardDrawer from './dashboard-drawer.vue'

export default {
  name: 'DashboardApplication',
  components: {
    DashboardDrawer
  },
  computed: {
    expandedDrawer: {
      get () {
        return this.$store.state.expandedDrawer
      },
      set (bIsExpanded) {
        this.$store.dispatch('setExpandedDrawer', bIsExpanded)
      }
    }
  },
  methods: {
    /**
     * Handles done editing click event
     */
    handleDoneEditingClick () {
      this.$store.dispatch('setEditCardToggle', false)
      this.$store.dispatch('setCardIdToEdit', null)
    }
  }
}
</script>

<style lang="sass">

</style>
