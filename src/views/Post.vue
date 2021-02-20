<template>
  <main class="view post">
    <section class="stream">
      <video ref="video" id="video" width="100%" height="300" autoplay :class="(!captured) ? 'show' : 'hide'"></video>
      <div class="post-btns">
        <button @click="capture" class="capture-btn" v-if="!captured">Capture</button>
        <button @click="cancel" class="cancel-btn" v-if="captured">Cancel</button>
        <button @click="upload" class="upload-btn" v-if="captured">Upload</button>
      </div>
    </section>
    <section :class="(captured) ? 'show' : 'hide'">
      <canvas ref="canvas" id="canvas" width="100%" height="300"></canvas>
      <label for="desc">Description</label>
      <input type="text" v-model="desc" id="desc" name="desc">
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      video: {},
      canvas: {},
      constraints: {},
      cap: "",
      desc: "",
      captured: false
    }
  },
  methods: {
    capture() {
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.width)
      this.cap = this.canvas.toDataURL("image/png")
      this.captured = true
    },
    cancel() {
      this.captured = false
    },
    upload() {
      let api_url = this.$store.state.apiUrl

      this.$http.post(`${api_url}post/newpost`, {
        auth_token: localStorage.getItem('jwt'),
        image: this.cap,
        desc: this.desc
      })
        .then(() => {
          this.captured = false
          this.cap = ""
          this.desc = ""
        })
        .catch(err => {
          if (err) console.log(err)
        })
    }
  },
  mounted() {
    this.video = this.$refs.video
    this.video.width = window.innerWidth
    this.video.height = window.innerHeight - 80
    this.constraints = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    if (this.$refs.canvas) {
      this.canvas = this.$refs.canvas
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerWidth
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: this.constraints
      })
        .then(stream => {
          this.video.srcObject = stream
          this.video.play()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.post-btns {
  position: absolute;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
}

.show {
  display: block;
}

.hide {
  display: none;
}

.image {
  width: 100%;
  height: auto;
}
</style>
