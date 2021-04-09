<template>
  <div>
    <v-card-text v-html='cardData.content'></v-card-text>
  </div>
</template>

<script>
export default {
  name: 'CardContentCustom',
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
}
</script>
