<template>
  <nuxt-link
    :to="{ name: 'state-id', params: { id: state.state } }"
    tag="b-tr"
    class="text-center"
  >
    <b-td>{{ state.state || '--' }}</b-td>
    <b-td>{{ Number(state.positive).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.negative).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.pending).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.hospitalizedCurrently).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.hospitalizedCumulative).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.inIcuCurrently).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.inIcuCumulative).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.onVentilatorCurrently).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.recovered).toLocaleString() }}</b-td>
    <b-td>{{ state.dataQualityGrade || '--' }}</b-td>
    <b-td>{{ state.lastUpdateEt || '--' }}</b-td>
    <b-td>{{ Number(state.death).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.positiveIncrease).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.negativeIncrease).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.total).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.totalTestResults).toLocaleString() }}</b-td>
    <b-td>
      {{ Number(state.totalTestResultsIncrease).toLocaleString() }}
    </b-td>
    <b-td>{{ Number(state.deathIncrease).toLocaleString() }}</b-td>
    <b-td>{{ Number(state.hospitalizedIncrease).toLocaleString() }}</b-td>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

const StateProps = Vue.extend({
  props: {
    state: {
      type: Object,
      default() {
        return {}
      },
    },
  },
})

@Component
export default class State extends StateProps {
  beautifyNumber(str: any): String {
    return Number(str).toLocaleString()
  }
}
</script>

<style scoped></style>
