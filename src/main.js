import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
  created() {
    // 在 Vue 实例创建时检查用户登录状态并根据情况进行重定向
    const isLoggedIn = this.$store.state.isLoggedIn; // 假设登录状态保存在 Vuex 的状态管理中
    if (isLoggedIn) {
      this.$router.push({ name: 'home' }); // 用户已登录，跳转到 home 页面
    } else {
      this.$router.push({ name: 'start' }); // 用户未登录，跳转到 start 页面
    }
  }
}).$mount('#app');
