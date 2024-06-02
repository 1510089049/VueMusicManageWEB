<template>
  <div class="container" :style="{ backgroundColor: isPlaying ? '#f0f0f0' : 'transparent' }">
    <v-container v-if="selectedMusic">
      <v-row>
        <v-col>
          <v-btn @click="handleBackClick">返回</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="album-container">
          <img :src="encodeURL(selectedMusic.albumImage)" alt="专辑图片" class="rotating-album" @load="updateLyricsHeight" />
        </v-col>
        <v-col cols="6" class="lyrics-container" :style="{ height: lyricsHeight, overflowY: 'auto' }">
          <pre>{{ selectedMusic.lyrics || '加载中...' }}</pre>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <audio :src="encodeURL(selectedMusic.url)" controls autoplay @play="handlePlay" @pause="handlePause"></audio>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-list dense>
        <v-list-item v-for="(music, index) in musics" :key="index" @click="handleMusicClick(music)">
          <v-list-item-avatar>
            <img :src="encodeURL(music.albumImage)" alt="专辑图片" @load="updateLyricsHeight" />
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
      selectedMusic: null,
      lyricsHeight: '400px',
      isPlaying: false,
      loadedLyrics: {} // Track loaded lyrics for each song
    };
  },
  methods: {
    handleMusicClick(music) {
      this.selectedMusic = music;
      if (!this.loadedLyrics[music.title]) {
        this.loadLyrics(music.title);
      }
    },
    async loadLyrics(title) {
      try {
        const response = await fetch(`../POM/${title}.txt`);
        const lyrics = await response.text();
        this.$set(this.loadedLyrics, title, lyrics); // Use Vue.set to add new property to reactive object
      } catch (error) {
        console.error('Failed to load lyrics:', error);
        this.$set(this.loadedLyrics, title, '暂无歌词'); // Set a default message or handle the error
      }
    },
    handleBackClick() {
      this.selectedMusic = null;
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    encodeURL(url) {
      return encodeURIComponent(url).replace(/%2F/g, '/').replace(/%3A/g, ':');
    },
    updateLyricsHeight(event) {
      const imageHeight = event.target.clientHeight;
      this.lyricsHeight = `${imageHeight}px`;
    }
  }
};
</script>

<style scoped>
.container {
  transition: background-color 0.3s ease;
}

.album-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-album {
  width: 100%;
  height: auto;
  border-radius: 100%;
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
