import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Auth from './components/Auth.vue'
import Catalog from './components/Catalog.vue'
import BookDetail from './components/BookDetail.vue'
import MyBook from './components/Books.vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
// import Register from './components/Register.vue'

Vue.use(Router)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    url_root: 'http://192.168.137.133:3000'
  }
})

const routes = [
  { path: '/auth', name: "auth", component: Auth},
  { path: '/catalog', component: Catalog, children: [
    { path: "", name: "catalog", component: Catalog}
  ]},
  { path: '/detail/:id', component: BookDetail},
  { path: '/mybook', component: MyBook},
  { path: '/', redirect: {name: 'catalog'}}
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