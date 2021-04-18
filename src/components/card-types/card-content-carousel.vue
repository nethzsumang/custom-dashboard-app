<template>
  <div class="m-5">
    <v-carousel>
      <v-carousel-item
        v-if="cardData.dataSource.carousel === undefined || cardData.dataSource.carousel.images === 0">
        <v-sheet
          color="blue"
          height="100%"
          tile>
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              No images.
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item
        v-else
        v-for="image in cardData.dataSource.carousel.images"
        :key="image.src"
        :src="image.src"
        transition="fade-transition">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'CardContentCarousel',
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
}
</script>
