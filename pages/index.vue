<template>
  <div>
    <b-card title="Current US Covid Totals">
      <b-table-simple condensed responsive>
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
    <b-row>
      <b-col>
        <ChartContainer :api-data="apiData" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ChartContainer from '@/components/ChartContainer.vue'
import CovidService from '@/services/CovidService.js'

export default Vue.extend({
  components: { ChartContainer },

  async asyncData() {
    try {
      const { data } = await CovidService.getAllUsData()
      return { apiData: data, totals: [data[0]] }
    } catch (e) {
      console.error(e)
    }
  },
})
</script>

<style></style>
