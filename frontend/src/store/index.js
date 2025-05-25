import { defineStore } from 'pinia'
import axios from 'axios'

export const AuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    user: {
      id: null,
      name: null,
      email: null,
      gender: null,
      dateOfBirth: null
    }
  }),

  getters: {
    
  },

  actions: {
    async register({ name, email, password, gender, dateOfBirth }) {
      try {
        await axios.post('http://localhost:3000/register', {
          name,
          email,
          password,
          gender,
          dateOfBirth
        })
        return true
      } catch (err) {
        return false
      }
    },

    async login(email, password) {
      try {
        const res = await axios.post('http://localhost:3000/login', {
          email,
          password
        })
    
        const token = res.data.token
        const decoded = JSON.parse(atob(token.split('.')[1]))
    
        this.token = token
        localStorage.setItem('token', token)
    
        this.user.email = email
        this.user.id = decoded.id

        await this.fetchProfile()
    
        this.isAuthenticated = true
        return true
      } catch (err) {
        return false
      }
    },

    async fetchProfile() {
      try {
        const res = await axios.get('http://localhost:3000/profile', {
          headers: {
            'x-access-token': this.token
          }
        })

        this.user = {
          name: res.data.name,
          email: res.data.email,
          gender: res.data.gender,
          dateOfBirth: res.data.dateOfBirth
        }
        this.isAuthenticated = true
        return true
      } catch (err) {
        this.logout()
        return false
      }
    }
  }
})
