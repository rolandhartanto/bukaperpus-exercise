import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Auth from './components/Auth.vue'
import Catalog from './components/Catalog.vue'
import BookDetail from './components/BookDetail.vue'
import MyBook from './components/Books.vue'
// import Register from './components/Register.vue'

Vue.use(Router)

Vue.config.productionTip = false

const routes = [
  { path: '/auth', component: Auth},
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
  render: h => h(App)
}).$mount('#app')