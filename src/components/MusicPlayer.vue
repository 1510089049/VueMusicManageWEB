<template>
  <div class="container" :style="{ backgroundColor: isPlaying ? '#f0f0f0' : 'transparent' }">
    <transition name="fade">
      <v-container v-if="selectedMusic">
        <!-- 播放页面的内容 -->
        <v-row>
          <v-col>
            <v-btn @click="handleBackClick">返回</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="album-container">
            <img ref="albumImage" :src="encodeURL(selectedMusic.albumImage)" alt="专辑图片" class="rotating-album" @load="updateLyricsHeight" />
          </v-col>
          <v-col cols="6" class="lyrics-container" :style="{ height: lyricsHeight, overflowY: 'auto' }">
            <pre>{{ lyricsContent }}</pre>
            <div v-if="loadingLyrics" class="loading-spinner"></div>
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
              <img :src="encodeURL(music.albumImage)" alt="专辑图片" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ music.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ music.artist }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </transition>
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
      loadingLyrics: false,
      lyricsContent: ''
    };
  },
  methods: {
    handleMusicClick(music) {
      this.selectedMusic = music;
      this.loadLyrics(music.title);
    },
    async loadLyrics(title) {
      this.loadingLyrics = true;
      try {
        const response = await fetch(`../POM/${title}.txt`);
        const lyrics = await response.text();
        this.lyricsContent = lyrics || '暂无歌词';
      } catch (error) {
        console.error('Failed to load lyrics:', error);
        this.lyricsContent = '暂无歌词'; // Set a default message or handle the error
      } finally {
        this.loadingLyrics = false;
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
    updateLyricsHeight() {
      const imageHeight = this.$refs.albumImage.clientHeight;
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

.loading-spinner {
  background-color: transparent;
  border: 4px solid #ccc;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
