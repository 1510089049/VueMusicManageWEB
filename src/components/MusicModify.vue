<template>
  <div>
    <h2>编辑音乐</h2>
    <v-list>
      <v-list-item v-for="(music, index) in musics" :key="music.title" @click="editMusic(index)">
        <v-list-item-content>
          <v-list-item-title>{{ music.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ music.artist }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="blue" @click="editMusic(index)">编辑</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑音乐</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="标题" v-model="editData.title" required></v-text-field>
            <v-text-field label="艺术家" v-model="editData.artist" required></v-text-field>
            <v-file-input label="音乐文件" v-model="editData.url"></v-file-input>
            <v-file-input label="专辑图片" v-model="editData.albumImage"></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveEdit">保存</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MusicModify',
  props: {
    musics: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editIndex: -1,
      editData: {
        title: '',
        artist: '',
        url: '',
        albumImage: ''
      }
    };
  },
  methods: {
    editMusic(index) {
      this.editIndex = index;
      this.editData = { ...this.musics[index] };
      this.dialog = true;
    },
    saveEdit() {
      if (this.editIndex !== -1) {
        this.$emit('edit-music', this.editIndex, this.editData);
        this.dialog = false;
      }
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 16px;
}
</style>
