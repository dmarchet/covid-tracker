<template>
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
    <b-row>
      <b-col>
        <line-chart
          v-if="loaded"
          :chart-data="chartData"
          :options="options"
          height="170"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LineChart from '@/components/Chart.vue'

const ChartContainerProps = Vue.extend({
  props: {
    apiData: Array,
  },
})

@Component({
  components: { LineChart },
})
export default class ChartContainer extends ChartContainerProps {
  // data
  loaded = false
  chartData = {}
  options = {}
  defaultData = {
    labels: [],
    datasets: [{ backgroundColor: '#17a2b8', label: null, data: [] }],
    responsive: true,
  }

  // methods
  parseDateString(dateString: String): String {
    return (
      dateString.substring(4, 6) +
      '-' +
      dateString.substring(6, 8) +
      '-' +
      dateString.substring(0, 4)
    )
  }

  selectData(dataType: String, el: any, dataEl: any): Number {
    let val
    if (dataType === 'positives') {
      dataEl.datasets[0].label = 'Positive Cases'
      val = el.positiveIncrease
    } else if (dataType === 'tests') {
      dataEl.datasets[0].label = 'Tests Completed'
      val = el.totalTestResultsIncrease
    } else if (dataType === 'deaths') {
      dataEl.datasets[0].label = 'Deaths'
      val = el.deathIncrease
    }
    return val
  }

  fillData(dataType: String): void {
    this.loaded = false
    const dataEl = {
      labels: [],
      datasets: [{ backgroundColor: '#17a2b8', label: null, data: [] }],
      responsive: true,
    }
    this.apiData.forEach((el: any) => {
      dataEl.labels.unshift(this.parseDateString(el.date.toString()))
      dataEl.datasets[0].data.unshift(this.selectData(dataType, el, dataEl))
    })
    this.chartData = dataEl
    this.loaded = true
  }

  mounted() {
    this.fillData('positives')
  }
}
</script>

<style scoped></style>