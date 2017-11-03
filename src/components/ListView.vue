<template>
    <div>
        <h2>Top Rated Movie</h2>
        <mu-flexbox>
            <mu-flexbox-item>

            </mu-flexbox-item>
        </mu-flexbox>
    </div>
</template>
<script>
    import api from '../api';
    import anime from 'animejs';
    export default {
      name: 'list-view',
      data() {
        return {
          movieList: []
        };
      },
    }

</script>
<style>

</style>