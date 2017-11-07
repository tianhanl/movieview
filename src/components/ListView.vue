<template>
    <div class="list-view">

        <h2 class="list-title">Top Rated Movie</h2>
        <transition :name="transition" mode="out-in">
            <div class="list-container" :key="currPage">
                <movie-card class="list-item"
                            v-for="movie in movieList"
                            :movieID="movie.id"
                            :movieName="movie.title"
                            :movieDate="movie.release_date"
                            :movieGenres="movie.genre_ids"
                            :movieDescription="movie.overview"
                            :imageSrc="movie.poster_path"
                            :key="movie.id">
                    {{movie.title}}
                </movie-card>
            </div>
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
        console.log(this.transition);
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
        },
      }
    }

</script>
<style lang="scss">
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
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 1em 0 1em;
            width: 100%;
        }
        .list-item {
            flex: 0 0 300px;
            margin-right: 1em;
        }
    }

    .slide-left-enter, .slide-right-leave-to {
        transition: all .3s cubic-bezier(.55,0,.1,1);
        opacity: 0;
        transform: translateX(30px);
    }
    .slide-left-leave-to, .slide-right-enter {
        transition: all .5s cubic-bezier(.55,0,.1,1);
        opacity: 0;
        transform: translateX(-30px);
    }

</style>