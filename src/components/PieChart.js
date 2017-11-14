import { Pie } from 'vue-chartjs';

export default Pie.extend({
  mounted() {
    this.renderChart(
      {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        dataset: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16',
            ],
            data: [40, 20, 80, 10],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
      },
    );
  },
});
