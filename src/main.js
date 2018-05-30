import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Auth from './components/Auth.vue'
import Catalog from './components/Catalog.vue'
import BookDetail from './components/BookDetail.vue'
import MyBook from './components/Books.vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import axios from 'axios'

const moment = require('moment')
require('moment/locale/es')
Vue.use(require('vue-moment'), {
  moment
})
moment.locale('en')

Vue.use(Router)
Vue.use(Vuex)

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

const base_module = {
  state: {
    url_root: 'http://192.168.137.133:3000'
  }
}

const auth_module = {
  state: {
    token: localStorage.getItem('user-token') || '',
    status: ''
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.status = 'error'
    },
    AUTH_LOGOUT: (state) => {
      state.status = 'logout'
    }
  },
  actions: {
    AUTH_REQUEST: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          url: store.state.base.url_root + '/login',
          data: user,
          method: 'POST'
        })
        .then(resp => {
          const token = resp.data.auth_token
          localStorage.setItem('user-token', token) // store the token in localstorage
          axios.defaults.headers.common['Authorization'] = token
          commit('AUTH_SUCCESS', resp)
          // you have your token, now log in your user :)
          //dispatch('AUTH_REQUEST')
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    AUTH_LOGOUT: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    is_authenticated: state => !!state.token,
    auth_status: state => state.status
  }
}

const store = new Vuex.Store({
  modules: {
    auth: auth_module,
    base: base_module
  }
})

const ifAuthenticated = (to, from, next) => {
  if(store.getters.is_authenticated){
    axios.get(store.state.base.url_root + '/auth').then((response) => {
      // console.log(response.data.message)
      if(response.data.message == 'ok'){
        return true
      }
    }).then((authenticated) => {
      if (authenticated) {
        next()
        return
      }
      store.dispatch('AUTH_LOGOUT')
      next('/auth')
    })
  }else{
    next('/auth')
  }
}

const routes = [
  { 
    path: '/auth', 
    name: "auth", 
    component: Auth
  },
  { 
    path: '/catalog', 
    component: Catalog, 
    // beforeEnter: ifAuthenticated,
    children: [
      { 
        path: "", 
        name: "catalog", 
        component: Catalog
      }
    ]
  },
  { 
    path: '/detail/:id', 
    component: BookDetail,
    // beforeEnter: ifAuthenticated
  },
  { 
    path: '/mybook', 
    component: MyBook, 
    beforeEnter: ifAuthenticated
  },
  { 
    path: '/', 
    redirect: {name: 'catalog'}
  }
]

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')