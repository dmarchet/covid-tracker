<template>
  <div style="width: 100%;">
    <b-col>
      <ChartContainer :api-data="apiData" />
    </b-col>
  </div>
</template>

<script>
import Vue from 'vue'
import ChartContainer from '@/components/ChartContainer.vue'
import CovidService from '@/services/CovidService.js'

export default Vue.extend({
  name: 'StateContainer',
  components: { ChartContainer },

  async asyncData({ params }) {
    try {
      const { data } = await CovidService.getAllStateData(
        params.id.toLowerCase()
      )
      return { apiData: data }
    } catch (e) {
      console.error(e)
    }
  },
})
</script>

<style scoped></style>
