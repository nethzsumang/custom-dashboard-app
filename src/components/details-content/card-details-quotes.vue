<template>
  <div>
    <v-data-table
      v-model="selectedRows"
      :headers="headers"
      :items="items"
      show-select
      :loading="isLoading"
      item-key="name">
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'CardDetailsQuotes',
  data () {
    return {
      isLoading: false,
      items: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Count', value: 'quoteCount' }
      ]
    }
  },
  computed: {
    selectedRows: {
      get () {
        const aTags = this.$store.state.createCardData.dataSource.tags
        if (aTags === undefined || aTags === null) {
          return []
        }
        return aTags
      },
      set (aSelected) {
        let newDataSource = { ...this.$store.state.createCardData.dataSource }
        newDataSource.tags = aSelected
        newDataSource = {
          ...this.$store.state.createCardData.dataSource,
          ...newDataSource
        }

        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: newDataSource
        })
      }
    }
  },
  async mounted () {
    await this.getTags()
  },
  methods: {
    async getTags () {
      try {
        const { data } = await axios.get('https://api.quotable.io/tags')
        this.items = _.sortBy(data, 'quoteCount').reverse()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
