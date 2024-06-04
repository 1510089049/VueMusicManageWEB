import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './Store'; // 导入 Vuex 的 Store

Vue.config.productionTip = false;
Vue.use(ElementUI)
new Vue({
  router,
  store, // 注入 Vuex 的 Store 实例
  render: h => h(App)
}).$mount('#app');
