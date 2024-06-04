<template>
  <el-container>
    <el-aside v-if="asideVisible" :width="asideWidth" class="el-aside">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>广告</span>
          </template>
          <el-menu-item index="1-1">
            <router-link to="/advertising/banner">Banner广告</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/advertising/launchAdvertising">启动广告</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-music"></i>
            <span>音乐</span>
          </template>
          <el-menu-item index="2-1">
            <router-link to="/music/album">专辑</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/music/artist">艺术家</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link to="/music/musicList">音乐列表</router-link>
          </el-menu-item>
          <el-menu-item index="2-4">
            <router-link to="/home">音乐主页</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户</span>
          </template>
          <el-menu-item index="3-1">
            <router-link to="/user">用户首页</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const asideVisible = ref(true);

const asideWidth = computed(() => {
  return window.innerWidth > 768 ? '200px' : '100px';
});

window.addEventListener('resize', () => {
  asideVisible.value = window.innerWidth > 768;
});
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

@media screen and (max-width: 768px) {
  .el-aside {
    width: 100px;
  }
}
</style>


