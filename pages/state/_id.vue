<template>
  <div style="width: 100%;">
    <div>
      <b-tabs content-class="mt-3" align="center">
        <b-tab
          title="Positive Cases"
          active
          @click="fillData('positives')"
        ></b-tab>
        <b-tab title="Deaths" @click="fillData('deaths')"></b-tab>
        <b-tab title="Tests Completed" @click="fillData('tests')"></b-tab>
      </b-tabs>
    </div>
    <b-col>
      <line-chart
        v-if="loaded"
        :chart-data="chartData"
        :options="options"
        height="170"
      />
    </b-col>
  </div>
</template>

<script>
import LineChart from '@/components/Chart.vue'
import CovidService from '@/services/CovidService.js'

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
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
  async mounted() {
    await this.fetchApiData()
    this.fillData('positives')
  },
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
      } else if (dataType === 'deaths') {
        dataEl.datasets[0].label = 'Deaths'
        return el.deathIncrease
      }
    },
    fillData(dataType) {
      this.loaded = false
      const dataEl = {
        labels: [],
        datasets: [{ backgroundColor: '#17a2b8', label: null, data: [] }],
        responsive: true,
      }
      this.apiData.forEach((el) => {
        dataEl.labels.unshift(this.parseDateString(el.date.toString()))
        dataEl.datasets[0].data.unshift(this.selectData(dataType, el, dataEl))
      })
      this.chartData = dataEl
      this.loaded = true
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
}
</script>

<style scoped></style>
