<template>
  <main class="view profile">

    <section class="profile-head">
      <strong>Ad: </strong>{{ display_name }}
    </section>

    <section class="posts">
      <div class="post" v-for="post in posts" :key="post._id">
        <img :src="post.image" :alt="post.desc" class="post-image">
      </div>
    </section>

  </main>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      display_name: "",
      posts: []
    }
  },
  methods: {
    getProfile() {
      this.$http.post(this.$store.state.apiUrl + 'user/get-profile', {
        auth_token: localStorage.getItem('jwt')
      })
        .then(({ data }) => {
          this.display_name = data.details.display_name
          this.posts = data.details.posts
        })
    }
  },
  beforeMount() {
    this.getProfile()
  }
}
</script>

