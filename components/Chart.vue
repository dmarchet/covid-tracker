<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],

  watch: {
    chartData() {
      this.$data._chart.update()
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>
