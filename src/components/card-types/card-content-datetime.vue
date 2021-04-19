<template>
  <div></div>
</template>

<script>
export default {
  name: 'CardContentDatetime',
  props: {
    cardData: {
      type: Object,
      required: true
    },
    currentStep: {
      type: Number,
      default: () => -1
    }
  }
}
</script>
