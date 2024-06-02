<template>
  <div v-if="selectedMusic">
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="handleBackClick">返回</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="album-container">
          <img :src="selectedMusic.albumImage" alt="专辑图片" class="rotating-album" />
        </v-col>
        <v-col cols="6" class="lyrics-container">
          <div v-if="selectedMusic.lyrics">
            <pre>{{ selectedMusic.lyrics }}</pre>
          </div>
          <div v-else>
            纯音乐，请欣赏
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <audio :src="selectedMusic.url" controls autoplay></audio>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
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
  </div>
</template>

<script>
export default {
  props: {
    musics: Array
  },
  data() {
    return {
      selectedMusic: null
    };
  },
  methods: {
    handleMusicClick(music) {
      this.selectedMusic = music;
    },
    handleBackClick() {
      this.selectedMusic = null;
    }
  }
};
</script>

<style scoped>
.album-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-album {
  width: 100%;
  height: auto;
  border-radius: 50%; /* Makes the image circular */
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.lyrics-container {
  padding: 20px;
  font-size: 1.2em;
  white-space: pre-wrap;
}
</style>
