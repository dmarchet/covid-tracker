<template>
  <div style="width: 100%;">
    <div class="row text-center">
      <button @click="fillData('positives')">Positive Cases</button>
      <button @click="fillData('tests')">Tests Completed</button>
      <!-- <button></button> -->
    </div>
    <div class="col-xs-12">
      <line-chart :chart-data="chartData" :options="options" height="170" />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Chart.vue'
import CovidService from '@/services/CovidService.js'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    chartData: null,
    options: {
      // layout: {
      //   padding: {
      //     left: 50,
      //     right: 50,
      //     top: 0,
      //     bottom: 100,
      //   },
      // },
    },
    apiData: null,
  }),
  methods: {
    parseDateString(dateString) {
      return (
        dateString.substring(4, 6) +
        '-' +
        dateString.substring(6, 8) +
        '-' +
        dateString.substring(0, 4)
      )
    },
    selectData(dataType, el, dataEl) {
      if (dataType === 'positives') {
        dataEl.datasets[0].label = 'Positive Cases'
        return el.positiveIncrease
      } else if (dataType === 'tests') {
        dataEl.datasets[0].label = 'Tests Completed'
        return el.totalTestResultsIncrease
      }
    },
    fillData(dataType) {
      const dataEl = {
        labels: [],
        datasets: [{ label: null, data: [] }],
        responsive: true,
      }
      this.apiData.forEach((el) => {
        dataEl.labels.unshift(this.parseDateString(el.date.toString()))
        dataEl.datasets[0].data.unshift(this.selectData(dataType, el, dataEl))
      })
      this.chartData = dataEl
    },
    async fetchApiData() {
      try {
        const { data } = await CovidService.getAllStateData(
          this.$route.params.id.toLowerCase()
        )
        this.apiData = data
      } catch (e) {
        console.error(e)
      }
    },
  },
  async mounted() {
    await this.fetchApiData()
    this.fillData('positives')
  },
}
</script>

<style scoped></style>
