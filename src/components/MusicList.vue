<template>
  <v-container>
    <v-list dense>
      <v-list-item v-for="(music, index) in musics" :key="index" @click="handleMusicClick(music)">
        <v-list-item-avatar>
          <img :src="music.albumImage" alt="专辑图片" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ music.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ music.artist }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: {
    musics: Array
  },
  methods: {
    handleMusicClick(music) {
      // 在这里处理点击事件，例如播放音乐或者打开详情页
      console.log('点击了音乐:', music);
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加样式来美化列表项 */
</style>
