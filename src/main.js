/* eslint-disable no-new */
import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(MuseUI);

new Vue({
  router,
  store,
  render: h => h(App),
  // you have to use $mount when using vue-router
}).$mount('#app');
