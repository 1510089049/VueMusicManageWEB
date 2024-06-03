<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" v-if="!loading">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loggedIn" class="success">Login successful!</div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loggedIn: false,
      loading: false // 添加 loading 状态
    };
  },
  methods: {
    async login() {
      this.loading = true; // 开始登录时设置 loading 状态为 true
      try {
        // 实际应用中应该使用 API 调用进行登录验证
        const isAuthenticated = await this.checkLoginStatus();
        if (isAuthenticated) {
          this.loggedIn = true;
          this.$emit('login', this.username);
          this.$router.push({ name: 'Home' }); // 使用路由名称来导航
        } else {
          this.error = 'Invalid credentials';
        }
      } catch (error) {
        console.error('Login error:', error);
        this.error = 'An error occurred while logging in';
      } finally {
        this.loading = false; // 登录结束后重置 loading 状态为 false
      }
    },
    async checkLoginStatus() {
      // 在实际应用中应该调用后端 API 进行登录验证
      // 这里模拟异步验证过程，1秒后返回 true 表示验证成功
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true); // 模拟登录验证成功
        }, 1000);
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}

.loading {
  color: blue;
}
</style>