<template>
    <div class="loading">
        <vue-loading :type="type" :color="color" :size="size"></vue-loading>
    </div>
</template>
<script>
  import vueLoading from 'vue-loading-template'
  export default {
    name: 'loading',
    components: {
      vueLoading
    },
    data() {
      return {
        type: 'spin',
        color: '#F07883',
        size: {
          width: '50px',
          height: '50px'
        }
      }
    }
  }
</script>
<style>
    .loading {
        position: relative;
        margin: auto;
        display: flex;
        height: 80vh;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
</style>

