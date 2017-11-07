<template>
    <div class="detail-view">
        <div class="detail-view-media">
            <img class="detail-view-media-poster" :src="posterAddress" alt="poster">
            <p class="detail-view-media-tag">{{tagline}}</p>
        </div>
        <div class="detail-view-info">
            <h2 class="detail-view-info-title"><a :href="homepage">{{title}}</a></h2>
            <p>{{date}}</p>
            <p>{{genres.join(',')}}</p>
            <p>overview</p>
            <p>Score: {{vote}}</p>
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

</style>