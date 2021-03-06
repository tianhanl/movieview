<template>
        <div class="list-view">
            <transition :name="transition" mode="out-in">
                <transition-group class="list-container" tag="ul" name="staggered-fade"
                                  :css="false"
                                  v-on:enter="enter"
                                  :key="currPage">
                    <movie-card class="list-item"
                                v-for="(movie, index) in movieList"
                                :movieID="movie.id"
                                :movieName="movie.title"
                                :movieDate="movie.release_date"
                                :movieGenres="movie.genre_ids"
                                :movieDescription="movie.overview"
                                :imageSrc="movie.poster_path"
                                :key="movie.id"
                                :data-index="index">
                        {{movie.title}}
                    </movie-card>
                </transition-group>
            </transition>
            <mu-pagination class="list-pagination" :total="totalMovie" :pageSize="pageSize" :current="currPage" @pageChange="handlePageChange" ></mu-pagination>
        </div>
</template>
<script>
  import api from '../api';
  import anime from 'animejs';
  import MuFlexboxItem from "../../node_modules/muse-ui/src/flexbox/flexboxItem.vue";
  import MovieCard from './MovieCard.vue'
  import loading from './loading.vue'
  export default {
    components: {
      MuFlexboxItem,
      MovieCard,
      loading
    },
    name: 'list-view',
    data() {
      return {
        movieList:  [],
        received: false,
        transition: 'slide-right',
        pageSize: 12
      };
    },
    computed: {
      currPage: function () {
        return this.$store.state.currPage;
      },
      totalMovie: function() {
        return this.$store.state.totalMovie;
      }
    },
    created() {
      this.updatePage(this.$route.params.page);
    },
    beforeRouteUpdate(to, from, next) {
      // called when the route that renders this component has changed,
      // but this component is reused in the new route.
      // For example, for a route with dynamic params `/foo/:id`, when we
      // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
      // will be reused, and this hook will be called when that happens.
      // has access to `this` component instance.
      this.updatePage(to.params.page);
      // move the page back to top.
      window.scrollTo(0, 0);
      this.transition = to.params.page>from.params.page?'slide-left':'slide-right';
      next();
    },
    methods: {
      handlePageChange(nextIndex) {
        this.$router.push({
          name: 'list',
          params: {
            page: nextIndex
          }
        });
      },
      updatePage: function (page) {
        this.$store.commit('setCurrPage', Number.parseInt(page));
        if(this.$store.state.pageList[this.currPage]) {
          // If the page has been cached, just use it to save time.
          this.movieList = this.$store.state.pageList[this.currPage];
          this.received = true;
        } else {
          api.getTopRatedMovies(this.currPage)
            .then(({data}) => {
            // use destructing to simplify the code
              this.movieList = data.results;
              this.$store.commit('setTotalMovie', data.total_results);
              this.$store.commit('addPageList', {
                pos: this.currPage,
                list: data.results,
              });
              this.received = true;
            }).catch(e => {
            console.log(e);
          })
        }
      }, enter: function (el, done) {
//          anime({
//            targets: el,
//            opacity: [0,1],
//            duration: 150,
//            delay: function(target, index) {
//              return el.dataset.index * 30;
//            },
//            easing: [.4, .0, .2, 1],
//            complete: done
//          });
//        let delay = el.dataset.index * 30;
//        setTimeout(function() {
//          el.classList.add('active');
//          done();
//        }, delay)
      }
    }
  }
</script>
<style lang="scss">
    $acceleration-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
    $deceleration-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
    $standard-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
    .list-view {
        padding: 1em 1em;
        max-width: 980px;
        margin: auto;
        overflow: hidden;
        @media screen and (max-width: 768px) {
            padding:0;
        }
        ul {
            margin: 0;
        }
    }

    .list-title {
        font-size: 2.5em;
    }
    .list-pagination {
        overflow: hidden;
        width: fit-content;
        margin: auto;
    }
    .list-container {
        min-height: 80vh;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 1em 0;
        padding: 1em 0;
        @media screen and (max-width: 768px) {
            justify-content: space-around;
            align-items: center;
            align-content: center;
        }
    }
    .list-item {
        flex: 0 0 280px;
        margin: 1em;
        /*opacity: 0;*/
        transition: all .2s $standard-timing-function;
        @media screen and (max-width: 768px) {
            margin: 1em 0.5em;
            flex: 0 0 300px;
        }
        &:hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
    }
    .list-item.active {
        /*opacity: 1;*/
    }
    .mu-pagination {
        @media screen and (max-width: 768px) {
            font-size: 0.3em;
        }
    }

    .slide-left-enter {
        transition: all .2s $deceleration-timing-function;
        opacity: 0;
        transform: translateX(30px);
    }
    .slide-right-leave-to {
        transition: all .2s $acceleration-timing-function;
        opacity: 0;
        transform: translateX(30px);
    }
    .slide-left-leave-to {
        transition: all .2s $acceleration-timing-function;
        opacity: 0;
        transform: translateX(-30px);
    }
    .slide-right-enter {
        transition: all .2s $deceleration-timing-function;
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s $standard-timing-function;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .mu-pagination-svg-icon {
        @media screen and (max-width: 575px){
            /*width: 18px;*/
            /*height: 18px;*/
            margin: 0;
        }
    }

    .mu-pagination-item {
        @media screen and (max-width: 575px){
            font-size: 0.9rem;
            height: 1.5rem;
            min-width: 1.5rem;
            padding-left: 6px;
            padding-right: 6px;
            line-height: 1.5rem;
            margin: 0 5px;
        }
    }
</style>