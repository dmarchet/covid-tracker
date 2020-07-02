<template>
  <section class="panel">
    <div class="col-xs-12">
      <h1 class="text-center">Totals By State</h1>
      <b-table-simple hover condensed striped>
        <b-thead>
          <b-tr class="text-center">
            <b-th>St</b-th>
            <b-th>Positive</b-th>
            <b-th>Negative</b-th>
            <b-th>Pending</b-th>
            <b-th>Hospitalized (current)</b-th>
            <b-th>Hospitalized (total)</b-th>
            <b-th>ICU (current)</b-th>
            <b-th>ICU (total)</b-th>
            <b-th>Ventilator (current)</b-th>
            <b-th>Recovered</b-th>
            <b-th>Data Grade</b-th>
            <b-th>Last Update</b-th>
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
          <State
            v-for="(state, index) in states"
            :key="state.hash"
            :state="state"
            :data-index="index"
          />
        </b-tbody>
      </b-table-simple>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import State from '@/components/State.vue'
import CovidService from '@/services/CovidService.js'

export default Vue.extend({
  components: {
    State,
  },

  async asyncData({ error }) {
    try {
      const { data } = await CovidService.getTotalsByState()
      return {
        states: data,
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

<style scoped></style>
