<template>
    <mu-card class="movie-card">
        <mu-card-media>
            <img  :src="posterAddress" alt="movie poster"/>
            <p v-on:click="handlePosterClick" class="movie-card-description">
                {{movieDescription}}
            <p/>
        </mu-card-media>
        <mu-card-title :title="movieName" />
        <mu-card-text>
            <p class="movie-card-date">
                {{movieDate}}
            </p>
            <p class="movie-card-genres">
                {{displayGenres}}
            </p>

        </mu-card-text>
    </mu-card>
</template>
<script>
    export default {
      name: 'movie-card',
      props: {
        movieID: Number,
        movieName: String,
        movieDate: String,
        movieGenres: Array,
        movieDescription: String,
        imageSrc: String,
      },
      computed: {
        displayGenres() {
          return this.movieGenres.join(',');
        },
        posterAddress() {
          return 'https://image.tmdb.org/t/p/w500/'+this.imageSrc;
        }
      },
      methods: {
        handlePosterClick: function() {
          console.log('clicked');
            this.$router.push({name: 'detail', params: {
              id:this.movieID
          }})
        }
      }
    }
</script>
<style lang="scss">
    .movie-card {
        margin: 0.5em 0;

        .mu-card-media {
            overflow: hidden;
            position: relative;
        }

        .movie-card-description {
            position: absolute;
            top: 0;
            left:0;
            right:0;
            bottom: 0;
            opacity: 0;
        }
    }

</style>