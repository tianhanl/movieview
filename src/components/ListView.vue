<template>
    <div>
        <h2>Top Rated Movie</h2>
        <mu-flexbox>
            <mu-flexbox-item v-for="movie in movieList" :key="movie.id">
                {{movie.title}}
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-pagination :totla="totalPage" :current="currPage" @pageChange="handlePageChange"></mu-pagination>
    </div>
</template>
<script>
    import api from '../api';
    import anime from 'animejs';
    import MuFlexboxItem from "../../node_modules/muse-ui/src/flexbox/flexboxItem.vue";
    export default {
      components: {MuFlexboxItem},
      name: 'list-view',
      data() {
        return {
          movieList: [],
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
       this.updatePage();
      },
      methods: {
        handlePageChange(nextIndex) {
            this.$router.push({
              name: 'list',
              params: {
                page: nextIndex
              }
            })
        },
        updatePage: function () {
          this.$store.commit('setCurrPage', Number.parseInt(this.$route.params.page));
          if(this.$store.state.pageList[this.currPage]) {
                this.movieList = this.$store.state.pageList[this.currPage];
          } else {
            console.log(this.currPage);
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
        }
      }
    }

</script>
<style>

</style>