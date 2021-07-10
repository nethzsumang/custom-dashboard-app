<template>
  <div>
    <v-card-text>
      <h4> {{ content }}</h4>
      <p>{{ author }}</p>
    </v-card-text>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { QUOTE_API_ENDPOINT } from '../../constants/app-constants'

export default {
  name: 'CardContentQuotes',
  props: {
    cardData: {
      type: Object,
      required: true
    },
    currentStep: {
      type: Number,
      default: () => -1
    }
  },
  data () {
    return {
      content: '',
      author: ''
    }
  },
  async mounted () {
    await this.getRandomQuote()
  },
  watch: {
    'cardData.dataSource.tags': {
      handler: async function (newValue) {
        await this.getRandomQuote()
      }
    }
  },
  methods: {
    async getRandomQuote () {
      const sUrl = this.formatUrl()
      try {
        const { data } = await axios.get(sUrl)
        this.content = data.content
        this.author = data.author
      } catch (e) {
        console.error(e)
      }
    },
    formatUrl () {
      const aTags = _.map(this.cardData.dataSource.tags, 'name')
      return QUOTE_API_ENDPOINT + '?tags=' + aTags.join('|')
    }
  }
}
</script>
