<template>
  <div ref="background" class="background-container">
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="formData.title" label="音乐标题" required></v-text-field>
      <v-text-field v-model="formData.artist" label="艺术家" required></v-text-field>
      <v-text-field v-model="formData.url" label="音乐URL" required></v-text-field>
      <v-text-field v-model="formData.albumImage" label="专辑封面URL" required></v-text-field>
      <v-btn type="submit" color="primary">{{ editMode ? '保存' : '提交' }}</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: '',
        artist: '',
        url: '',
        albumImage: ''
      },
      editMode: false
    };
  },
  mounted() {
    this.initHaloEffect();
  },
  methods: {
    initHaloEffect() {
      const container = this.$refs.background;
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const colors = ['#6e00ff', '#6e00ff', '#6e00ff']; // Halo colors
      const numParticles = 500;
      const particles = [];

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.radius = Math.random() * 8 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      };

      Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx = -this.vx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy = -this.vy;
        }

        this.draw();
      };

      function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.update();
        });
      }

      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }

      animate();
    },
    submitForm() {
      const formDataCopy = { ...this.formData }; // 创建 formData 的副本，避免直接修改数据
      this.$emit('add-music', formDataCopy); // 触发自定义事件将数据传递给父组件
      this.resetForm(); // 重置表单数据
    },
    resetForm() {
      this.formData = {
        title: '',
        artist: '',
        url: '',
        albumImage: ''
      };
    }
  }
};
</script>

<style>
.background-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
