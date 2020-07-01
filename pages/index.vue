<template>
  <div>
    <b-card title="Current US Covid Totals">
      <b-table-simple table-condensed>
        <b-thead>
          <b-tr class="text-center">
            <b-th>Positive</b-th>
            <b-th>Negative</b-th>
            <b-th>Pending</b-th>
            <b-th>Hospitalized (current)</b-th>
            <b-th>Hospitalized (total)</b-th>
            <b-th>ICU (current)</b-th>
            <b-th>ICU (total)</b-th>
            <b-th>Ventilator (current)</b-th>
            <b-th>Recovered</b-th>
            <b-th>Deaths</b-th>
            <b-th>Positive Increase</b-th>
            <b-th>Negative Increase</b-th>
            <b-th>Total Tests</b-th>
            <b-th>Total Results</b-th>
            <b-th>Total Result Increase</b-th>
            <b-th>Death Increase</b-th>
            <b-th>Hospitalized Increase</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="total in totals" :key="total.hash" class="text-center">
            <b-td>{{ Number(total.positive).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.negative).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.pending).toLocaleString() }}</b-td>
            <b-td>{{
              Number(total.hospitalizedCurrently).toLocaleString()
            }}</b-td>
            <b-td>{{
              Number(total.hospitalizedCumulative).toLocaleString()
            }}</b-td>
            <b-td>{{ Number(total.inIcuCurrently).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.inIcuCumulative).toLocaleString() }}</b-td>
            <b-td>{{
              Number(total.onVentilatorCurrently).toLocaleString()
            }}</b-td>
            <b-td>{{ Number(total.recovered).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.death).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.positiveIncrease).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.negativeIncrease).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.total).toLocaleString() }}</b-td>
            <b-td>{{ Number(total.totalTestResults).toLocaleString() }}</b-td>
            <b-td>
              {{ Number(total.totalTestResultsIncrease).toLocaleString() }}
            </b-td>
            <b-td>{{ Number(total.deathIncrease).toLocaleString() }}</b-td>
            <b-td>{{
              Number(total.hospitalizedIncrease).toLocaleString()
            }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
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
import Vue from 'vue'
import LineChart from '@/components/Chart.vue'
import CovidService from '@/services/CovidService.js'

export default Vue.extend({
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartData: {},
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
    apiData: [],
    totals: [],
  }),
  async mounted() {
    await this.asyncData()
    this.fillData('positives')
  },
  methods: {
    parseDateString(dateString: String) {
      return (
        dateString.substring(4, 6) +
        '-' +
        dateString.substring(6, 8) +
        '-' +
        dateString.substring(0, 4)
      )
    },
    selectData(dataType: String, el: any, dataEl: any) {
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
    fillData(dataType: String) {
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
    async asyncData() {
      try {
        const { data } = await CovidService.getAllUsData()
        this.apiData = data
        this.totals = [data[0]]
      } catch (e) {
        console.error(e)
      }
    },
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
