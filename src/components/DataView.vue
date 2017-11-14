<template>
    <mu-paper class="data-view" :zDepth="1">
            <section class="chart-container">
                <h3>Which genre is most popular</h3>
                <genre-chart
                        :chartData="genreData"
                        :options="genreChartOption"></genre-chart>
            </section>
            <section class="chart-container">
                <h3>Which languages do those movies speak</h3>
                <bar-chart :chartData="languageData"
                :options="languageChartOption">

                </bar-chart>
            </section>
    </mu-paper>
</template>
<script>
    import GenreChart from './GenreChart';
    import BarChart from './BarChart.vue'
    export default {
      components: {
        GenreChart,
        BarChart
      },
      data() {
        return {
          genreChartOption: {
            responsive: true,
            maintainAspectRatio: false,
          },
          genreData: { labels:
            [ 'Adventure',
              'Fantasy',
              'Animation',
              'Drama',
              'Horror',
              'Action',
              'Comedy',
              'History',
              'Western',
              'Thriller',
              'Crime',
              'Science Fiction',
              'Mystery',
              'Music',
              'Romance',
              'Family',
              'War',
              'TV Movie' ],
            datasets: [
              { label: 'Top 100',
                backgroundColor: '#F07883',
                data: [ 11, 12, 12, 70, 4, 12, 17, 5, 2, 20, 22, 9, 13, 1, 14, 5, 7, 1 ]
              }
            ]
          },
          languageChartOption: {
            responsive: true,
            maintainAspectRatio: false,
          },
          languageData: { labels: [ 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru' ],
            datasets: [ { label: 'Top 100', backgroundColor: '#F07883', data: [ 58, 1, 6, 1, 11, 15, 3, 3, 2 ] } ] }
        }

      }
    }
</script>
<style lang="scss">
    .data-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        width: 100%;
        max-width: 960px;
        padding: 1em;
        margin: 0 auto;

    }
    .chart-container {
        width: 90%;
        position: relative;
        margin-bottom: 1em;
    }

</style>