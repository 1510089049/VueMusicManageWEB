<template>
  <v-container fluid>
    <v-row>
      <!-- Left Navigation Bar -->
      <v-col cols="2" class="nav-column">
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
          url: 'D:/vue/MusicWeb/MusicRef/David Darling - Lugu Lugu Kan-Ibi (Diligent Child).mp3',
          albumImage: 'D:/vue/MusicWeb/MusicRef/example1.jpg' // Album image path
        },
        {
          title: 'Sensitive',
          artist: '陳梦嘉',
          url: 'D:/vue/MusicWeb/MusicRef/陳梦嘉 - Sensitive.mp3',
          albumImage: 'D:/vue/MusicWeb/MusicRef/example2.jpg' // Album image path
        },
        {
          title: 'Just the Two of Us (Album Version)',
          artist: 'Grover Washington, Jr.,Withers,MacDonald',
          url: 'D:/vue/MusicWeb/MusicRef/Grover Washington, Jr.,Withers,MacDonald - Just the Two of Us (Album Version).mp3',
          albumImage: 'D:/vue/MusicWeb/MusicRef/example3.jpg' // Album image path
        }
        // Other music information
      ],
      currentMusic: null,
      currentView: 'view'
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
    }
  }
};
</script>

<style scoped>
.nav-column {
  background-color: #3f51b5; /* Navigation bar background color */
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* Evenly distribute the buttons */
  align-items: center;
  padding: 10px 0; /* Padding for top and bottom */
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
  background-color: #ffffff; /* Functional area background color */
  height: 100vh;
  overflow-y: auto;
}

.music-item {
  border-bottom: 1px solid #e0e0e0; /* Divider color */
}

.album-image {
  width: 100%;
  height: auto;
}
</style>


<!-- musics: [
{
  title: 'Lugu Lugu Kan-Ibi (Diligent Child)',
  artist: 'Artist 1',
  url: 'D:/vue/MusicWeb/MusicRef/David Darling - Lugu Lugu Kan-Ibi (Diligent Child).mp3',
  albumImage: 'D:/vue/MusicWeb/MusicRef/example1.jpg' // 添加专辑图片路径
},
{
  title: 'Sensitive',
  artist: '陳梦嘉',
  url: 'D:/vue/MusicWeb/MusicRef/陳梦嘉 - Sensitive.mp3',
  albumImage: 'D:/vue/MusicWeb/MusicRef/example2.jpg' // 添加专辑图片路径
},
{
  title: 'Just the Two of Us (Album Version)',
    artist: 'Grover Washington, Jr.,Withers,MacDonald',
    url: 'D:/vue/MusicWeb/MusicRef/Grover Washington, Jr.,Withers,MacDonald - Just the Two of Us (Album Version).mp3',
    albumImage: 'D:/vue/MusicWeb/MusicRef/example3.jpg' // 添加专辑图片路径
}
// 其他音乐信息
], -->