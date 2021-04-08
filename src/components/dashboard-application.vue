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
                v-for="item in $router.options.routes"
                :key="item.path"
                link >
                <v-list-item-content>
                    <v-list-item-title>{{ item.name + ' Page' }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>

        <v-app-bar app color="primary">
            <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
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
export default {
  name: 'DashboardApplication'
}
</script>

<style lang="sass">

</style>
