<template>
    <div>
      <v-card elevation="2">
        <v-card-title>{{ cardData.title }}</v-card-title>
        <v-card-subtitle>{{ cardData.subtitle }}</v-card-subtitle>
        <v-card-text v-html='cardData.content'>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass">

</style>
