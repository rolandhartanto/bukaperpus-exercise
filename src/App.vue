<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Router from 'vue-router'
export default {
  name: 'app',
  components: {
    Navbar
  },
  mounted(){
    this.Router.push("http://localhost:8080/catalog")
  }
}
</script>

<!-- style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style -->
