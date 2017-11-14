import { HorizontalBar, mixins } from 'vue-chartjs';

export default {
  extends: HorizontalBar,
  name: 'genre-chart',
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
