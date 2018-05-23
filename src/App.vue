<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue App"/>
    <div>
      <ul>
        <li v-for="user in users">
          {{user.firstname}} {{user.lastname}}
        </li>
      </ul>
    </div>
    <div>
      <div>Change the text </div>
      <input v-model="teks" placeholder="What's on your mind?" />
      <div>Test Output: 
        <span v-text="teks"></span>
      </div>
    </div>
    <div>
      <button v-on:click="count++">You've Clicked this Button {{ count }} times!</button>
      <button v-on:click="inc()">You've clicked this button {{ count2 }} times</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data () {
    return {
      teks: '',
      users: [
        {firstname: 'Sebastian', lastname: 'Eschweiler'},
        {firstname: 'Bill', lastname: 'Smith'},
        {firstname: 'John', lastname: 'Porter'}
      ],
      count: 0,
      count2:0
    }
  },
  methods:{
    inc() {
      this.count2+=1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
