<template>
  <v-container fluid>
    <v-row>
      <!-- Left Navigation Bar -->
      <v-col cols="2" class="nav-column" id="nav-column">
        <v-list-item link @click="currentView = 'add'" class="nav-item">
          <v-list-item-title class="nav-item-title">添加音乐</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="currentView = 'delete'" class="nav-item">
          <v-list-item-title class="nav-item-title">删除音乐</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="currentView = 'edit'" class="nav-item">
          <v-list-item-title class="nav-item-title">编辑音乐</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="currentView = 'view'" class="nav-item">
          <v-list-item-title class="nav-item-title">查看音乐</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="currentView = 'play'" class="nav-item">
          <v-list-item-title class="nav-item-title">播放音乐</v-list-item-title>
        </v-list-item>
      </v-col>

      <!-- Right Functional Area -->
      <v-col cols="10" class="main-content">
        <component :is="currentViewComponent" :musics="musics" :current-music="currentMusic"
                   @add-music="addMusic" @delete-music="deleteMusic" @edit-music="editMusic" @select-music="setCurrentMusic" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MusicForm from '@/components/MusicForm.vue';
import MusicList from '@/components/MusicList.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';

export default {
  name: 'HomeView',
  components: {
    MusicForm,
    MusicList,
    MusicPlayer
  },
  data() {
    return {
      musics: [
        {
          title: 'Lugu Lugu Kan-Ibi (Diligent Child)',
          artist: 'Artist 1',
          url: '../public/music/David Darling - Lugu Lugu Kan-Ibi (Diligent Child).mp3',
          albumImage: '../images/example1.jpg'
        },
        {
          title: 'Sensitive',
          artist: '陳梦嘉',
          url: '../music/MusicWeb/MusicRef/陳梦嘉 - Sensitive.mp3',
          albumImage: '../images/example2.jpg'
        },
        {
          title: 'Just the Two of Us (Album Version)',
          artist: 'Grover Washington, Jr.,Withers,MacDonald',
          url: '../music/MusicWeb/MusicRef/Grover Washington, Jr.,Withers,MacDonald - Just the Two of Us (Album Version).mp3',
          albumImage: '../images/example3.jpg'
        }
      ],
      currentMusic: null,
      currentView: 'view',
      hue: 0
    };
  },
  computed: {
    currentViewComponent() {
      switch (this.currentView) {
        case 'add':
          return MusicForm;
        case 'delete':
        case 'edit':
        case 'view':
          return MusicList;
        case 'play':
          return MusicPlayer;
        default:
          return MusicList;
      }
    }
  },
  mounted() {
    this.animateBackground();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  },
  methods: {
    addMusic(music) {
      this.musics.push(music);
    },
    deleteMusic(index) {
      this.musics.splice(index, 1);
    },
    editMusic(index, music) {
      this.$set(this.musics, index, music);
    },
    setCurrentMusic(music) {
      this.currentMusic = music;
    },
    animateBackground() {
      const navColumn = document.getElementById('nav-column');
      const updateBackground = () => {
        this.hue = (this.hue + 0.5) % 360; // Slowly change hue
        const nextHue = (this.hue + 30) % 360;
        navColumn.style.background = `linear-gradient(to right, hsl(${this.hue}, 100%, 50%), hsl(${nextHue}, 100%, 50%))`;
        this.animationFrameId = requestAnimationFrame(updateBackground);
      };
      updateBackground();
    }
  }
};
</script>

<style scoped>
.nav-column {
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
}

.nav-item {
  width: 100%;
  text-align: center;
}

.nav-item-title {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #ffffff;
}

.main-content {
  background-color: #ffffff;
  height: 100vh;
  overflow-y: auto;
}

.music-item {
  border-bottom: 1px solid #e0e0e0;
}

.album-image {
  width: 100%;
  height: auto;
}
</style>
