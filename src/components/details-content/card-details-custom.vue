<template>
  <div>
    <h3 class="mb-3"> Custom Card Content </h3>
    <vue-editor v-model="cardContent" :editorToolbar='editorToolbar' />
  </div>
</template>

<script>
export default {
  name: 'CardDetailsCustom',
  computed: {
    cardContent: {
      get () {
        return this.$store.state.createCardData.content
      },
      set (sContent) {
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          content: sContent
        })
      }
    }
  },
  data () {
    return {
      editorToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
      ]
    }
  }
}
</script>
