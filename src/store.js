import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000/',
    isAuthenticated: false,
    feed: [
      {
        id: 0,
        display_name: 'Ferhat Demir',
        user_id: 0,
        desc: 'Description 1',
        image: 'https://images.unsplash.com/photo-1612831660296-0cd5841b89fb?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        timestamp: 1613692800000
      },
      {
        id: 1,
        display_name: 'Hatice Ellialtıoğlu',
        user_id: 1,
        desc: 'Description 2',
        image: 'https://images.unsplash.com/photo-1613687528267-a5e8dff89f39?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        timestamp: 1613692800000
      },
      {
        id: 2,
        display_name: 'Jale Yerdelen',
        user_id: 2,
        desc: 'Description 2',
        image: 'https://images.unsplash.com/photo-1613679654638-802d32d771ac?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        timestamp: 1613692800000
      }
    ]
  },
  mutations: {
    isAuthenticated(state) {
      if (localStorage.getItem('jwt') !== null) {
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
      }
    },
    login(state, token) {
      state.isAuthenticated = true
      localStorage.setItem('jwt', token)
      this.$router.push('/')
    },
    logout(state) {
      state.isAuthenticated = false
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    }
  },
  actions: {}
})
