<template>
  <section class="panel">
    <div class="col-xs-12">
      <h1 class="text-center">Current US Covid Totals</h1>
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
          <b-tr class="text-center" v-for="total in totals" :key="total.hash">
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
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import CovidService from '@/services/CovidService.js'

export default Vue.extend({
  async asyncData({ error }) {
    try {
      const { data } = await CovidService.getCurrentUsTotals()
      return {
        totals: data,
      }
    } catch (e) {
      error({
        statusCode: 500,
        message: 'API Error, whoops',
      })
    }
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
