<template>
  <div id="app">
    <Cabecalho/>
    <Lista/> 
  </div>
</template>

<script>
import Cabecalho from './components/cabecalho.vue'
import Lista from './components/lista.vue'
export default {
  name: 'App',
  components: {
    Lista,
    Cabecalho
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #004d40 ;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
