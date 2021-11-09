<template>
  <div class="lista">
    <p class="loren">Opus igitur est dicere possuit dura moni specie."Tu autem in specie, non vicentur, nec ominino res est." Et examine ab eis praecepta eius quae hbes, et primo et principaliter.
      <!-- <span class="loren2">
        nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas? */
      </span> -->
        

    </p>
    <div class="info-tab">
      <div class="input-group mb-2 col-md-4">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fa fa-search text-secondary fa-2x" aria-hidden="true"></i></span>
        </div>
        <input type="text" v-model="criteria" class="form-control" placeholder="Pesquisar" aria-describedby="basic-addon1">
        <div class="input-group-append">
          <span class="input-group-text" @click="criteria=''"><i class="fa fa-times text-secondary fa-2x" aria-hidden="true"></i></span>
        </div>
      </div>
      <!-- <span style="color: #057fa4;font-weight: 600 !important;">{{filtrados.length}} de {{clientes.length}} clientes</span> -->
    </div>

    <div class="gridTabela" style="width:100%">
      <div width="100%" class="table">
        <div class="tr header bg-primary">
          <div class="td header" style="text-align:left">Name
            <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>
          </div>
          <!-- <div class="td header">CPF/CNPJ</div> -->
          <div class="td header">Gender</div>
          <div class="td header">Birth</div>
          <div class="td header">Actions</div>
        </div>
        <div class="tr" v-for="usur in filtrados" :key="usur.ID">
          <div class="td" style="text-align:left" @click="selecionaCli(usur)">{{usur.name.first}} {{usur.name.last}}</div>
          <!-- <div class="td" style="text-align:left">{{usur.CPF}}</div> -->
          <div class="td" style="text-align:left" @click="selecionaCli(usur)">{{usur.gender}}</div>
          <div class="td" style="text-align:left" @click="selecionaCli(usur)">{{usur.dob.date}}</div>
          <div class="td" style="text-align:left" @click="selecionaCli(usur)">{{usur.CONTATO}}</div>
          <div class="td">{{usur.ATIVO==1?"Sim":"Não"}}</div>
          <div class="td" style="vertical-align: middle;text-align: center;white-space: nowrap;">
            &nbsp;<i class="fa fa-pencil-square-o" style="outline:none;"
                    aria-hidden="true" @click="cadastro(usur)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "lista",
  props:[''],
  data: function() {
    return {
      criteria:'',
    }
  },
  methods:{
    getpatients(){
      var url="https://randomuser.me/api/?seed=f54749b11a4f1deb&nat=BR&results=50&inc=gender,name,nat"
      axios.get(url)
        .then(function(response){
          this.$store.commit("setPatients", response.data.results)
          this.filtrados=this.patients
        }).catch((err) => {
          alert(err)
        })
    },
    ordenaLista(property) {
      var sortOrder=1
      if (this.reverse) sortOrder = -1
      this.reverse=!this.reverse
      this.field=property
      return function (a,b) {
          /* next line works with strings and numbers, 
          * and you may want to customize it to your needs
          */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    },
    filtrar() {
      let criteria=this.criteria
        let opcao=this.selected
        this.filtrados= this.pedidos.filter(item => {
          let selecionado=true
          if (criteria&&JSON.stringify(item).toLowerCase().indexOf(criteria.toLowerCase()) == -1) selecionado=false
          if (opcao=="Pronto"&&item.PRONTO!==true) selecionado=false
          if (opcao=="Alerta"&&item.alerta!=="A") selecionado=false
          if (opcao=="Atrasado"&&item.alerta!=="V") selecionado=false
          return selecionado ? item : ''
        })
      }
  },
  mounted() {
    this.getpatients()
  },
  // created(){
  // },
  computed:{
    patients(){
      this.store.patients
    },
    filtrados() {
      let criteria=this.criteria
      if (!criteria) return this.clientes
      return this.patients.filter(item => {
         return JSON.stringify(item).toLowerCase().indexOf(criteria.toLowerCase()) > -1
      })
    }
    
  }

}
</script>

<style>
.lista{
  width:70%;
  display: flex; 
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.gridTabela{
  max-width: 100%;
}
.table .tr:hover {
  /* color: #43a047  !important; */
  /* background-color: rgba(187, 222, 251, 0.4) !important; */
  background-color: rgba(0, 0, 0, 0.1) !important;
  -webkit-box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.21);
  box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.21);
}
.td.header {
  background-color: #057fa4;
  color: #fff;
  position: sticky;
  top: 0px;
  z-index: 1;
  vertical-align: middle;
  font-weight: 800 !important;
  height: 40px;
}
.td.header:first-child {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.table {
  display: table;
  width: 100%;
  max-width: 100%;
}
.tr {
  display: table-row;
  color: #057fa4 !important;
}

.thead {
  display: table-header-group;
}
.table > .tr > .td:last-child i {
  margin: 5px;
  font-size: 1.5rem;
  padding: 0;
}
.table > .header.tr > .td:last-child i {
  font-size: 30px;
  padding: 5px 0;
}
.td,
.th {
  padding: 5px;
  display: table-cell;
}
.th {
  display: table-header-group;
}
.info-tab{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.info-tab > span{
  margin-right: 45px;
  font-weight: 500;
}
.loren{
  text-align: justify;
  text-justify: inter-word;
}
#app > div.lista > div.gridTabela > div > div > div:nth-child(1)>i,
.input-group-append,
.input-group-prepend{
  cursor: pointer;
}
@media (max-width: 420px){
  .lista {
    width: 85%;
    margin: 1.75rem auto;
    }
  .loren2{
    display: none;
  }
}
@media (max-width: 320px){
.lista {
  width: 95%;
  margin: 1.75rem auto;
  }
}
</style>