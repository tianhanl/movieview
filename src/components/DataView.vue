<template>
    <div class="data-view">
        <div class="chart-container">
            <genre-chart
                    :chartData="genreData"
                    :options="genreChartOption"></genre-chart>
        </div>
    </div>
</template>
<script>
    import GenreChart from './GenreChart';
    export default {
      components: {
        GenreChart
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
          }
        }
      }
    }
</script>
<style lang="scss">
    .data-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .chart-container {
            width: 900px;
            position: relative;
        }
    }

</style>