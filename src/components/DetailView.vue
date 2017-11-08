<template>
    <div class="detail-view">
        <div class="detail-view-media">
            <img class="detail-view-media-poster" :src="posterAddress" alt="poster">
            <p class="detail-view-media-tag">{{tagline}}</p>
        </div>
        <div class="detail-view-info">
            <h2 class="detail-view-info-title"><a :href="homepage">{{title}}</a></h2>
            <p class="detail-view-info-date">{{date}}</p>
            <p class="detail-view-info-genre">{{genres.join(', ')}}</p>
            <p class="detail-view-info-overview">{{overview}}</p>
            <p class="detail-view-info-score">Score: {{vote}}</p>
        </div>
    </div>
</template>
<script>
    import api from '../api';
    export default {
        data() {
          return {
            movieID: 0,
            imageSrc: '',
            title: '',
            date: '',
            genres: [],
            homepage: '',
            overview: '',
            revenue: 0,
            tagline: '',
            vote: 0
          }
        },
      computed: {
        posterAddress() {
          return 'https://image.tmdb.org/t/p/w500/'+this.imageSrc;
        }
      },
        created() {
          this.movieID = this.$route.params.id;
          this.updateDetail();
        },
        methods: {
          updateDetail() {
            api.getMovieDetail(this.movieID)
              .then(response => {
                let data = response.data;
                this.imageSrc = data.poster_path;
                this.title = data.title;
                this.date = data.release_date;
                this.vote = data.vote_average;
                this.overview = data.overview;
                this.tagline = data.tagline;
                this.genres = data.genres.map(element => element.name);
                this.homepage = data.homepage;
                this.revenue = data.revenue;
              })
              .catch(err => {
                console.log(err)
              })
          }
      }
    }

</script>
<style lang="scss">
    .detail-view {
        display: flex;
        justify-content: center;
        position: relative;
    }
    .detail-view-media {
        flex: 1 0 400px;
        padding: 1em;
        max-width: 500px;
        text-align: center;
        .detail-view-media-poster {
            width: 400px;
            height: auto;
        }
        .detail-view-media-tag {
            margin: auto;
            width: 400px;
            font-size: 1.5em;
        }
    }
    .detail-view-info {
        flex: 1 0 400px;
        max-width: 460px;
        padding: 0 0.5em;
        .detail-view-info-title {
            font-size: 2.5em;
            margin-bottom: 2rem;
            a {
                color: #4A4A4A;
            }
        }
        .detail-view-info-date {
            font-size: 1.5em;
            margin: 0;
        }
        .detail-view-info-genre {
            font-size: 1.5em;
            margin: 0;
        }
        .detail-view-info-overview {
            margin-top: 1em;
        }
        .detail-view-info-score {
            font-size: 1.5em;
        }
    }

</style>