import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import store from './store';
import '@/common/ts/config/antDesign';

import '@/common/sass/index.scss';

import lottie from 'vue-lottie';
Vue.component('lottie', lottie);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

