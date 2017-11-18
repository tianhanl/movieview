<template>
    <mu-card v-on:click.native="handlePosterClick" class="movie-card">
        <mu-card-media>
            <progressive-img :src="posterAddress"
                             :placeholder="lowPosterAddress"
                             :aspect-ratio="1.5"
            />
            <!--<p class="movie-card-description">-->
                <!--{{movieDescription}}-->
            <!--<p/>-->
        </mu-card-media>
        <mu-card-title :title="movieName" />
        <!--<mu-card-text>-->
            <!--<p class="movie-card-date">-->
                <!--{{movieDate}}-->
            <!--</p>-->
            <!--<p class="movie-card-genres">-->
                <!--{{displayGenres}}-->
            <!--</p>-->

        <!--</mu-card-text>-->
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
        },
        lowPosterAddress() {
          return 'https://image.tmdb.org/t/p/w92/'+this.imageSrc;
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
        border-radius: 6px;
        overflow: hidden;
    }
    .mu-card-media {
        overflow: hidden;
        position: relative;
        figure {
            margin: 0;
            padding: 0;
        }
        img {
            height: 441px;
        }
    }

    .mu-card-title {
        text-align: center;
        margin-bottom: 0.5em;
        min-height: 3em;
    }

</style>