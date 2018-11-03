<template>
  <div id="app">
    <img src="./assets/logo.png">
    <PaperTable />
  </div>
</template>

<script>
import PaperTable from './components/PaperTable.vue'

export default {
  name: 'app',
  components: {
      PaperTable
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
