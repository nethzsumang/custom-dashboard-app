<template>
    <v-app>
        <v-navigation-drawer app permanent>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="title">
                    Custom Dashboard App
                </v-list-item-title>
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

        <v-app-bar app color="primary">
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

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
import DashboardAddNewDialog from './dashboard-add-new-dialog'

export default {
  name: 'DashboardApplication',
  components: {
    DashboardAddNewDialog
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
