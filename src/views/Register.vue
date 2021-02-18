<template>
  <div class="register-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Register</h4>
    </header>
    <main class="form-group">
      <input
        type="text"
        v-model="forename"
        placeholder="Forename"
      >
      <input
        type="text"
        v-model="surname"
        placeholder="Surname"
      >
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="(hasErrors) ? 'err' : ''"
      >
      <input
        type="password"
        v-model="password"
        placeholder="Password"
      >
      <button
        class="register-btn"
        @click="register"
      >
        Sing up
      </button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
    </main>
    <footer>
      <p>
        Already registered?
        <router-link class="link" to="/login">Register</router-link>
        .
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      forename: "",
      surname: "",
      email: "",
      password: "",
      hasErrors: false,
      error: ""
    }
  },
  methods: {
    register() {
      let api_url = this.$store.state.apiUrl
      if (this.forename === "" || this.surname === "" || this.email === "" || this.password === "") return alert("Please fill in all fields")

      this.$http.post(api_url + 'user/register', {
        forename: this.forename,
        surname: this.surname,
        email: this.email,
        password: this.password,
      })
        .then(res => {
          if (res.data.auth) {
            localStorage.setItem('jwt', res.data.token)
            this.$router.push('/')
          } else {
            this.error = res.data.msg
            this.hasErrors = true
          }
        })
        .catch(err => {
          this.hasErrors = true
          this.error = err
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;

  header {
    padding: 15px 25px;

    h3 {
      color: #171717;
      font-size: 28px;
      text-align: center;
      font-family: 'Roboto', Helvetica, sans-serif;
      font-weight: 900;
      margin: 0;

      span {
        font-weight: 300;
      }
    }

    h4 {
      color: #888;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }
  }

  .form-group {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-flow: column;
    padding: 25px;

    input {
      width: 100%;
      height: 30px;
      border: 1px solid #ddd;
      margin-bottom: 15px;
      text-indent: 5px;
      background-color: #eee;
      outline: none;

      &.err {
        background: rgba(255, 0, 0, .2);
        border: 1px solid #af1e2d;
      }

      &:focus {
        border: 1px solid #aaa;
      }
    }

    button {
      width: 100%;
      height: 30px;
      background-color: #ffce00;
      appearance: none;
      border: none;
      outline: none;
      border-radius: 8px;
      color: #171717;
      font-size: 15px;
      font-weight: 700;

      &:hover {
        cursor: pointer;
      }
    }

    .error_msg {
      margin: 15px 0px;
      padding: 10px;
      background-color: rgba(200, 0, 0, .4);
      color: #171717;
      font-weight: 700;
      border-radius: 8px;
    }
  }

  footer {
    width: calc(100% - 50px);
    height: 15px;
    background-color: #eee;
    box-shadow: 0px -1px 3px rgba(0, 0, 0, .2);
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #888;
      font-size: 16px;
      padding: 0;
      margin: 0;
      text-align: center;
    }

    .link {
      color: #e35205;
      font-weight: 700;
      text-decoration: none;
    }
  }
}
</style>
