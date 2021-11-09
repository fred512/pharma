<template>
  <div class="cabecalho">
    <div class="logo">
      <img alt="Pharma logo" src="../assets/logoPharma3.png">
      <span>
        {{titulo }}
      </span>
    </div>
    <i class="fa fa-user-md fa-3x" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "cabecalho",
  props:[''],
  data: function() {
    return {
    }
  },
  created(){
    this.titulo="Pharma Inc."
    if (window.innerWidth) this.titulo="Pharma"
  },
  computed(){
    return this.$store.state.patients
  }

}
</script>

<style>
.cabecalho{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.cabecalho>i{
  margin-right: 10px;
}
.cabecalho>.logo>img{
  width: 50px;  
  height: 50px;
}
.logo{
  display: flex;
  align-content: center;
}
.logo>span{
  font-size: 2.4rem;
  color: #fff;
}
</style>