import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './Store'; // 导入 Vuex 的 Store

Vue.config.productionTip = false;

new Vue({
  router,
  store, // 注入 Vuex 的 Store 实例
  vuetify,
  render: h => h(App)
}).$mount('#app');
