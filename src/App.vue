<template>
  <div id="app">
    <header>
      <nav>
        <h1><router-link to="/">Noir</router-link></h1>
        <ul>
          <li><router-link to="/list/1">Movies</router-link></li>
          <li><router-link to="/data">Data</router-link></li>
        </ul>
      </nav>
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
    text-align: start;
    position: relative;
    padding: 0 2em;
    h1 {
      display: inline-block;
      font-size: 3em;
      margin-right: 2em;
    }
    a {
      color: #FFF;
    }
    nav {
      margin: 0 auto;
      display: block;
      max-width: 960px;
    }
    ul {
      display: inline-block;
      padding: 0
    }
    li {
      margin-right: 1em;
      font-size: 1.5em;
      display: inline-block;
    }
    &::after {
      content: '.';
      height: 50vh;
      width: 100%;
      position: absolute;
      background: #4A4A4A;
      bottom: -49vh;
      left: 0;
    }

    @media screen and (max-width: 768px) {
      h1 {
        margin-right: 1.5em;
      }
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
  }

  .full-page-content {
    flex: 1 0 90%;
    padding: 0;
    margin: 0;
    position: relative;
  }

</style>
