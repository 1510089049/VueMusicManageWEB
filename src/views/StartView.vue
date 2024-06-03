<template>
  <div class="auth-container">
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  name: 'StartView',
  components: {
    Login
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>