<template>
    <div v-if="music">
      <v-card>
        <v-card-title>{{ music.title }} - {{ music.artist }}</v-card-title>
        <v-card-actions>
          <audio :src="music.url" controls></audio>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      music: {
        type: Object,
        default: null
      }
    }
  };
  </script>
  