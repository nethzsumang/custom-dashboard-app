<template>
  <div>
    <h3 class="mb-3"> Preview </h3>
    <DashboardCard
      :cardData='$store.state.createCardData'
      :previewOnly='true'
      :currentStep='step' />

    <div class="d-flex justify-center mt-3">
      <v-btn
        color="danger"
        class="mr-5"
        @click='resetCreateCardData'>
        Cancel
      </v-btn>

      <v-btn
        color="primary"
        @click='saveCreateCardData'>
        Save
      </v-btn>
    </div>
  </div>
</template>

<script>
import DashboardCard from '../../components/dashboard-card'

export default {
  name: 'CardPreview',
  components: {
    DashboardCard
  },
  props: {
    step: {
      required: true
    }
  },
  methods: {
    /**
     * Save create card data button click event
     * @param e
     */
    saveCreateCardData (e) {
      this.$emit('saveCreateCardData', e)
    },
    /**
     * Reset create card data button click event
     * @param e
     */
    resetCreateCardData (e) {
      this.$emit('resetCreateCardData', e)
    }
  }
}
</script>
