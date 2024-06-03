<template>
  <v-container fluid>
    <v-row>
      <!-- Left Navigation Bar -->
      <v-col cols="2" class="nav-column" id="nav-column" @wheel="handleScroll">
        <!-- Loop through views and create a list item for each -->
        <v-list-item
            v-for="(view, index) in views"
            :key="index"
            link
            @click="currentView = view"
            :class="['nav-item', { active: currentView === view }]"
        >
          <v-list-item-title class="nav-item-title">{{ viewTitles[view] }}</v-list-item-title>
        </v-list-item>
      </v-col>

      <!-- Right Functional Area -->
      <v-col cols="10" class="main-content">
        <!-- Dynamically load the current view component -->
        <component
            :is="currentViewComponent"
            :musics="musics"
            :current-music.sync="currentMusic"
            @add-music="addMusic"
            @delete-music="deleteMusic"
            @edit-music="editMusic"
            @select-music="setCurrentMusic"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MusicForm from '@/components/MusicForm.vue';
import MusicList from '@/components/MusicList.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import MusicDelete from '@/components/MusicDelete.vue';
import MusicModify from '@/components/MusicModify.vue';

export default {
  name: 'HomeView',
  components: {
    MusicForm,
    MusicList,
    MusicPlayer,
    MusicDelete,
    MusicModify,
  },
  data() {
    return {
      musics: [
        {
          title: 'Lugu Lugu Kan-Ibi (Diligent Child)',
          artist: 'David Darling',
          url: '../music/LuguLuguKan.mp3',
          albumImage: '../images/example1.jpg',
        },
        {
          title: 'Sensitive',
          artist: '陳梦嘉',
          url: '../music/Sensitive.mp3',
          albumImage: '../images/example2.jpg',
        },
        {
          title: 'Just the Two of Us (Album Version)',
          artist: 'Grover Washington, Jr., Withers, MacDonald',
          url: '../music/JustTheTwoOfUs.mp3',
          albumImage: '../images/example3.jpg',
        },
      ],
      currentMusic: null, // Current selected music
      currentView: 'view', // Default view
      hue: 0, // Used for background animation
      animationFrameId: null, // Stores the animation frame id
      views: ['add', 'delete', 'edit', 'view', 'play'], // Available views
      viewTitles: {
        add: '添加音乐',
        delete: '删除音乐',
        edit: '编辑音乐',
        view: '查看音乐',
        play: '播放音乐',
      },
    };
  },
  computed: {
    // Dynamically determine the component to render based on the current view
    currentViewComponent() {
      switch (this.currentView) {
        case 'add':
          return MusicForm;
        case 'delete':
          return MusicDelete;
        case 'edit':
          return MusicModify;
        case 'view':
          return MusicList;
        case 'play':
          return MusicPlayer;
        default:
          return MusicList;
      }
    },
  },
  mounted() {
    this.animateBackground();
  },
  beforeDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    addMusic(music) {
      try {
        this.musics.push(music);
      } catch (error) {
        console.error('Failed to add music:', error);
      }
    },
    deleteMusic(index) {
      try {
        this.musics.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete music:', error);
      }
    },
    editMusic(index, music) {
      try {
        this.$set(this.musics, index, music);
      } catch (error) {
        console.error('Failed to edit music:', error);
      }
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
    },
    handleScroll(event) {
      const delta = event.deltaY;
      const currentIndex = this.views.indexOf(this.currentView);
      if (delta > 0) {
        // Scroll down
        this.currentView = this.views[(currentIndex + 1) % this.views.length];
      } else if (delta < 0) {
        // Scroll up
        this.currentView = this.views[(currentIndex - 1 + this.views.length) % this.views.length];
      }
    },
  },
};
</script>

<style scoped>
.nav-column {
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: lightgray;
  border-radius: 20px;
  /* Custom scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: darkgray lightgray;
}
.nav-column::-webkit-scrollbar {
  width: 8px;
}
.nav-column::-webkit-scrollbar-thumb {
  background-color: darkgray;
  border-radius: 10px;
}
.nav-column::-webkit-scrollbar-track {
  background-color: lightgray;
  border-radius: 10px;
}
.main-content {
  height: 100vh;
  overflow-y: auto;
  background-color: white;
  padding: 16px;
}
.nav-item {
  cursor: pointer;
  padding: 10px 0;
  transition: transform 0.1s ease, background-color 0.3s ease;
}
.nav-item:hover {
  transform: scale(1.02);
}
.nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  color: #000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(213, 77, 77, 0.2);
}
.nav-item-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
