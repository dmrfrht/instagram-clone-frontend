<template>
  <div class="login-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Login</h4>
    </header>
    <main class="form-group">
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="(emailError) ? 'err' : ''"
      >
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        :class="(passwordError) ? 'err' : ''"
      >
      <button
        class="login-btn"
        @click="login"
      >
        Log in
      </button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
    </main>
    <footer>
      <p>
        Don't have an account?
        <router-link class="link" to="/register">Sign up</router-link>
        .
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: "",
      password: "",
      hasErrors: false,
      error: "",
      emailError: false,
      passwordError: false
    }
  },
  methods: {
    login() {
      let api_url = this.$store.state.apiUrl
      if (this.email === "" || this.password === "") return alert("Please fill in all fields")

      this.$http.post(api_url + 'user/login', {
        email: this.email,
        password: this.password
      })
        .then(res => {
          if (res.data.auth) {
            this.$store.commit('login', res.data.token)
          } else {
            if (res.data.mailError) {
              this.emailError = true

              setTimeout(() => {
                this.emailError = false
              }, 2500)
            } else this.emailError = false

            if (res.data.passError) {
              this.passwordError = true

              setTimeout(() => {
                this.passwordError = false
              }, 2500)
            } else this.passwordError = false

            this.error = res.data.msg
            this.hasErrors = true

            setTimeout(() => {
              this.hasErrors = false
            }, 2500)
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
