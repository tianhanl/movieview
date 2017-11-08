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
        <mu-pagination class="list-pagination" :total="totalPage" :current="currPage" @pageChange="handlePageChange"></mu-pagination>
    </div>
</template>
<script>
  import api from '../api';
  import anime from 'animejs';
  import MuFlexboxItem from "../../node_modules/muse-ui/src/flexbox/flexboxItem.vue";
  import MovieCard from './MovieCard.vue'
  export default {
    components: {
      MuFlexboxItem,
      MovieCard
    },
    name: 'list-view',
    data() {
      return {
        movieList:  [],
        transition: 'slide-right',
      };
    },
    computed: {
      currPage: function () {
        return this.$store.state.currPage;
      },
      totalPage: function() {
        return this.$store.state.totalPage;
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
          this.movieList = this.$store.state.pageList[this.currPage];
        } else {
          api.getTopRatedMovies(this.currPage)
            .then(response => {
              let data = response.data;
              this.movieList = data.results;
              this.$store.commit('setTotalPage', data.total_pages);
              this.$store.commit('addPageList', {
                pos: this.currPage,
                list: data.results,
              });
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
        let delay = el.dataset.index * 30;
        setTimeout(function() {
          el.classList.add('active');
          done();
        }, delay)
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
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 1em 0 1em;
            padding: 0;
            width: 100%;
        }
        .list-item {
            flex: 0 0 300px;
            margin-right: 1em;
            /*opacity: 0;*/
            transition: all .2s $standard-timing-function;
        }
        .list-item.active {
            /*opacity: 1;*/
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
</style>