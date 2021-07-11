<template>
  <v-navigation-drawer
    v-model="expandedDrawer"
    app
    temporary
    bottom>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Custom Dashboard App </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      v-for="item in $store.state.routes"
      :key="item.path"
      :to="item.path"
      link >

      <v-list-item-icon>
        <v-icon>mdi-newspaper</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.name + ' Page' }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <template v-slot:append>
      <div class="pa-2">
        <DashboardAddNewDialog />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import DashboardAddNewDialog from './dashboard-add-new-dialog'

export default {
  name: 'DashboardDrawer',
  components: {
    DashboardAddNewDialog
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
  }
}
</script>
