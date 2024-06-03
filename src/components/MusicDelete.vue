<template>
  <div>
    <h2>删除音乐</h2>
    <v-list>
      <v-list-item v-for="(music, index) in musics" :key="music.title">
        <v-list-item-content>
          <v-list-item-title>{{ music.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ music.artist }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="red" @click="deleteMusic(index)">删除</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'MusicDelete',
  props: {
    musics: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteMusic(index) {
      this.$emit('delete-music', index);
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
}
</style>
