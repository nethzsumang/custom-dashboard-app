<template>
  <div>
    <h3> Image Links </h3>
    <v-textarea
      v-model="imageSources"
      label="Image Links (separated by newline)">
    </v-textarea>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'CardDetailsCarousel',
  computed: {
    imageSources: {
      get () {
        // let data = { ...this.$store.state.createdData.dataSource }
        // let images =
        return ''
      },
      set (text) {
        let data = text.split('\n')
        data = _.map(data, (value) => {
          if (value.length !== 0) {
            return { src: value }
          }
          return null
        })
        data = _.reject(data, _.isNull)

        // set data source
        const oldDataSource = { ...this.$store.state.createCardData.dataSource }
        const newDataSource = {
          ...oldDataSource,
          carousel: { images: data }
        }
        this.$store.dispatch('setCreateCardData', {
          ...this.$store.state.createCardData,
          dataSource: newDataSource
        })
      }
    }
  }
}
</script>
