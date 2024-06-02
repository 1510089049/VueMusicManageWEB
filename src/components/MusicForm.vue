<template>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="title" label="音乐标题" required></v-text-field>
      <v-text-field v-model="artist" label="艺术家" required></v-text-field>
      <v-text-field v-model="url" label="音乐URL" required></v-text-field>
      <v-btn type="submit" color="primary">{{ editMode ? '保存' : '提交' }}</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      music: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        title: this.music ? this.music.title : '',
        artist: this.music ? this.music.artist : '',
        url: this.music ? this.music.url : '',
        editMode: !!this.music
      };
    },
    methods: {
      submit() {
        const newMusic = {
          title: this.title,
          artist: this.artist,
          url: this.url
        };
        if (this.editMode) {
          this.$emit('edit-music', newMusic);
        } else {
          this.$emit('add-music', newMusic);
        }
        this.title = '';
        this.artist = '';
        this.url = '';
      }
    },
    watch: {
      music: {
        handler(newMusic) {
          this.title = newMusic ? newMusic.title : '';
          this.artist = newMusic ? newMusic.artist : '';
          this.url = newMusic ? newMusic.url : '';
          this.editMode = !!newMusic;
        },
        deep: true
      }
    }
  };
  </script>
  