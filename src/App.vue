<template>
  <div id="app">
    <header>
      <h1><router-link to="/">Noir</router-link></h1>
      <h2><router-link to="/data">data</router-link></h2>
    </header>
    <router-view class="full-page-content"></router-view>
    <footer>
      Developed by <a href="https://github.com/tianhanl">TL</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  header {
    background: #4A4A4A;
    text-align: center;
    h1 {
      font-size: 3em;
    }
    a {
      color: #FFF;
    }
  }

  footer {
    text-align: center;
    padding: 1em;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .full-page-content {
      flex: 1 0 90%;
    }
  }

</style>
