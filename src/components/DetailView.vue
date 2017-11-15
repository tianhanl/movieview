<template>
    <div >
        <transition name="fade" mode="out-in">
            <div class="detail-view" v-if="received">
                <div class="detail-view-media">
                    <img class="detail-view-media-poster" :src="posterAddress" alt="poster">
                    <p class="detail-view-media-tag">{{tagline}}</p>
                </div>
                <div class="detail-view-info">
                    <h2 class="detail-view-info-title"><a :href="homepage">{{title}}</a></h2>
                    <p class="detail-view-info-date">{{formattedMovieDate}}</p>
                    <p class="detail-view-info-genre">{{genres.join(', ')}}</p>
                    <p class="detail-view-info-overview">{{overview}}</p>
                    <p class="detail-view-info-score">Score: {{vote}}</p>
                </div>
            </div>
            <loading v-else></loading>
        </transition>
    </div>
</template>
<script>
    import api from '../api';
    import moment from 'moment';
    import loading from './loading.vue';
    export default {
      components: {
        loading
      },
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
            vote: 0,
            received: false
          }
        },
      computed: {
        posterAddress() {
          return 'https://image.tmdb.org/t/p/w500/'+this.imageSrc;
        },
        formattedMovieDate() {
          let preDate = moment(this.date);
          if(preDate.isValid()) {
            return preDate.format("MMM DD, YYYY");
          } else {
            return "N/A"
          }

        }
      },
        created() {
          this.movieID = this.$route.params.id;
          this.updateDetail();
        },
        methods: {
          updateDetail() {
            this.received = false;
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
                this.received = true;
              })
              .catch(err => {
                console.log(err)
              })
          }
      }
    }

</script>
<style lang="scss">
    $acceleration-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
    $deceleration-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
    $standard-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
    .detail-view {
        display: flex;
        justify-content: center;
        position: relative;
        @media (max-width: 768px){
            flex-direction: column;
            align-items: center;
        }
    }
    .detail-view-media {
        flex: 1 1 400px;
        padding: 1em;
        max-width: 500px;
        text-align: center;
    }
    .detail-view-media-poster {
        width: 400px;
        height: auto;
        margin: auto;
        @media (max-width: 767px){
            width: 90%;
        }
    }
    .detail-view-media-tag {
        margin: auto;
        width: 400px;
        font-size: 1.5em;
        @media (max-width:  768px){
            width: 90%;
        }
    }
    .detail-view-info {
        flex: 1 1 400px;
        max-width: 460px;
        padding: 0 1em;
        color: white;
        @media (max-width:  768px){
            width: 90%;
            color:#4A4A4A;
        }
    }
    .detail-view-info-title {
        font-size: 2.5em;
        margin-bottom: 2rem;
        a {
            color: white;
        }
        @media (max-width:  768px){
            a {
                color: #4A4A4A;
            }
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

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s $standard-timing-function;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

</style>