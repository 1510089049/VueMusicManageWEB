<template>
  <v-app>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  components: {
    Home
  }
};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>
