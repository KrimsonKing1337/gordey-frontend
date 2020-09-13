import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/fonts/Ubuntu/stylesheet.css';
import 'reset-css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

Vue.config.productionTip = false;

Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
