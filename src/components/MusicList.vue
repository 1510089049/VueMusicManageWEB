<template>
    <v-container>
      <v-row v-for="(music, index) in musics" :key="index">
        <v-col cols="1">
          <!-- 这里放专辑图片 -->
        </v-col>
        <v-col cols="11">
          <!-- 音乐信息 -->
          <div>{{ music.title }}</div>
          <div>{{ music.artist }}</div>
          <!-- 其他音乐信息 -->
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      musics: Array
    }
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加样式来美化专辑图片 */
  </style>
  