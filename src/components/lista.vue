<template>
  <div class="lista">
    <div class="info-tab">
      <div class="input-group mb-2 ">
        <div class="filtroBusca" :class="{'buscaNat':nat!==''}">
          <div class="input-group ">
            <div class="input-group-prepend" @click="filtrar('')" id="filtroNat">
              <span class="input-group-text" id="basic-addon1" @click="getpatients()">
                <i class="fa fa-globe text-secondary fa-2x" aria-hidden="true"></i>
                <!-- <i class="fa fa-search text-secondary fa-2x" aria-hidden="true"></i> -->
              </span>
            </div>
            <b-tooltip target="filtroNat" placement="top" variant="secondary">
              <strong>Clique aqui para buscar pacientes da nacionalidade digitada</strong>
            </b-tooltip>
            <input type="text" v-model="nat" class="form-control" maxlength="2" placeholder="Nat" aria-describedby="basic-addon1">
            <div class="input-group-append" id="limparNat">
              <span class="input-group-text" @click="nat='';getpatients()"><i class="fa fa-times text-secondary fa-2x" aria-hidden="true"></i></span>
            </div>
            <b-tooltip target="limparNat" placement="top" variant="secondary">
              <strong>Apagar campo de Nacionalidade</strong>
            </b-tooltip>
          </div>
        </div>
        <div class="input-group-prepend" @click="filtrar('')" id="filtro">
          <span class="input-group-text" id="basic-addon1"><i class="fa fa-search text-secondary fa-2x" aria-hidden="true"></i></span>
        </div>
        <b-tooltip target="filtro" placement="top" variant="secondary">
          <strong>Clique para filtrar pelo campo digitado</strong>
        </b-tooltip>
        <input type="text" v-model="criteria" class="form-control" placeholder="Pesquisar pacientes nesta página" aria-describedby="basic-addon1">
        <div class="input-group-append" id="limpar">
          <span class="input-group-text" @click="criteria='';filtrar('')"><i class="fa fa-times text-secondary fa-2x" aria-hidden="true"></i></span>
        </div>
        <b-tooltip target="limpar" placement="top" variant="secondary">
          <strong>Clique para limpar o filtro da página</strong>
        </b-tooltip>
      </div>
      <span >{{filtrados.length}} pacientes filtrados do total de {{patients.length}}<span> buscados</span></span>
    </div>

    <div class="gridTabela" style="width:100%">
      <div width="100%" class="table">
        <div class="tr header ">
          <div class="td header" style="text-align:center">
            <span style="margin-right:10px"> Name</span>
            <span id="order"><i class="fa fa-sort-alpha-asc" aria-hidden="true"
              @click="filtrados.sort(ordenaLista())"></i></span> 
            <b-tooltip target="order" placement="top" variant="secondary">
              <strong>Clique para ordenar por nome</strong>
            </b-tooltip>
          </div>
          <!-- <div class="td header">CPF/CNPJ</div> -->
          <div class="td header">
            <i class="fa fa-mars" :class="{'text-warning':gender=='male'}" id="male" @click="filtrar('male')"></i>&nbsp;
            <b-tooltip target="male" placement="top" variant="secondary">
              <strong>Clique para filtrar sexo masculino</strong>
            </b-tooltip>
            <span @click="filtrar('')" style="cursor:pointer;" id="gender"> Gender</span>
            <b-tooltip target="gender" placement="top" variant="secondary">
              <strong>Clique para limpar o filtro de sexo </strong>
            </b-tooltip>
            <i class="fa fa-venus" :class="{'text-warning':gender=='female'}" id="female" @click="filtrar('female')"></i>
            <b-tooltip target="female" placement="top" variant="secondary">
              <strong>Clique para filtrar sexo feminino</strong>
            </b-tooltip>
          </div>
          <div class="td header">Birth</div>
          <div class="td header">Actions</div>
        </div> 
        <div class="tr" v-for="usur in filtrados" :key="usur.ID">
          <div class="td" style="text-align:left">{{usur.name.first}} {{usur.name.last}}</div>
          <!-- <div class="td" style="text-align:left">{{usur.CPF}}</div> -->
          <div class="td" style="text-align:center">{{usur.gender}}</div>
          <div class="td" style="text-align:center">{{usur.dob.date.split("T")[0].split("-").reverse().join("/")}}</div>
          <div class="td" style="vertical-align: middle;text-align: center;white-space: nowrap;">
            &nbsp;<i class="fa fa-eye" style="outline:none;"
                    aria-hidden="true" @click="mostraPerfil(usur)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="pagina">
      <div>
        <i class="fa fa-angle-left fa-2x" aria-hidden="true" @click="maisPatients(0)"></i>
          Page: {{page}}
        <i class="fa fa-angle-right fa-2x" aria-hidden="true" @click="maisPatients(1)"></i>
      </div>
    </div>
      <b-modal id="modalPerfil" size="lg" class="myModalProjet" centered title="" hide-footer header-text-variant="info">
        <b-container>
          <Perfil :patientSel="patient"/>
        </b-container>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Perfil from './perfil.vue'
export default {
  name: "lista",
  props:[''],
  components: { Perfil },
  data: function() {
    return {
      criteria:'',
      page:1,
      nat:'',
      patient:[],
      reverse:true,
      gender:''
    }
  },
  // watch: {
  //   criteria: function(val, oldVal) {
  //     this.filtrar(val)
  //     console.log(oldVal)
  //   }
  // },
  methods:{
    mostraPerfil(patient){
      console.log(patient)
      this.patient=patient
      this.$bvModal.show('modalPerfil')
    },
    maisPatients(direction){
      if (direction){
        this.page++
      } else{
        this.page--
      }
      if (this.page==0) this.page=1
      this.criteria=''
      this.getpatients()
    },
    async getpatients(){
      var url="https://randomuser.me/api/?seed=f54749b11a4f1deb&page="+this.page+"&results=50"
      if (this.nat!=='') url+="&nat="+this.nat.toLowerCase()
      // var url="https://randomuser.me/api/?seed=f54749b11a4f1deb&nat=BR&page="+this.page+"&results=50"
      var patients=await axios.get(url)
        .then(function(response){
          return response.data.results
        }).catch((err) => {
          alert(err)
        })
      patients=patients.map(function(el){
        el.nomecompleto=el.name.first+" "+el.name.last
        return el
      })
      this.filtrados=patients
      this.$store.commit("setPatients", patients)
      // this.filtrados=this.patients
    },
    ordenaLista() {
      var property='nomecompleto'
      var sortOrder=1
      if (!this.reverse) sortOrder = -1
      this.reverse=!this.reverse
      this.field=property
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    },
    filtrar(gender) {
      let criteria=this.criteria
      this.gender=gender
      this.filtrados=[]
      var filtrados = this.patients.filter(item => {
        let selecionado=true
        if (criteria&&JSON.stringify(item).toLowerCase().indexOf(criteria.toLowerCase()) == -1) selecionado=false
        if (item.gender!==gender&&gender!=='') selecionado=false
        return selecionado ? item : ''
      })
      this.filtrados=filtrados
      this.$forceUpdate()
    },
  },
  async mounted() {
    await this.getpatients()
    this.filtrados= this.patients
  },
  created(){
    this.filtrados=[]
    this.$store.commit("setPatients", [])
  },
  computed:{
    patients(){
      return this.$store.state.patients
    },
  }

}
</script>

<style>
.lista{
  width:60%;
  display: flex; 
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.gridTabela{
  max-width: 100%;
  overflow: auto;
  max-height: 65vh;
}
.table i{
  cursor: pointer;
}
.table .tr:hover {
  background-color: rgba(255,255, 255, 0.1) !important;
  -webkit-box-shadow: inset 0px 0px 4px 4px rgba(255,255, 255, 0.1);
  -moz-box-shadow: inset 0px 0px 4px 4px rgba(255,255, 255, 0.1);
  box-shadow: inset 0px 0px 4px 4px rgba(255,255, 255, 0.1);
}
.header{
  display: table-header-group;
  position: sticky;
  top: 0;
}
.td.header {
  background-color: #057fa4;
  color: #fff;
  position: sticky;
  z-index: 1;
  vertical-align: middle;
  font-weight: 800 !important;
  height: 40px;
}
.table {
  display: table;
  width: 100%;
  max-width: 100%;
}
.tr {
  display: table-row;
  color: #fff !important;
}
.thead {
  display: table-header-group;
}
.table > .tr > .td:last-child i {
  margin: 5px;
  font-size: 1.5rem;
  padding: 0;
  cursor: pointer;
}
.td,
.th {
  padding: 5px;
  display: table-cell;
  vertical-align: middle;
}
.th {
  display: table-header-group;
}
.info-tab{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
}
.info-tab input{
  height: 46px;
}
.info-tab > span{
  margin-right: 15px;
  font-weight: 100;
  font-family: system-ui;
  margin-top: -10px;
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
.pagina{
  width:100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.pagina>div{
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 100px 0 0 ;
  padding: 20px;
  cursor: pointer;
  font-family: system-ui;
  font-weight: 200;
  font-size: 1.5rem;
}
.buscaNat input{
  background-color: #900 !important;
  color: yellow;
  font-weight: 800;
}
.filtroBusca{
  width: 25%;
  margin-right: 10px;
}
.filtroBusca input{
  text-transform: uppercase;
}

@media (max-width: 780px){
  .lista {
    width: 85%;
    margin: 1.75rem auto;
    }
  .loren2{
    display: none;
  }
  .gridTabela{
    max-height: 45vh;
  }
  .pagina>div{
    width: 55%;
  }
}
@media (max-width: 375px){
  .lista {
    width: 90%;
    margin: 1.75rem auto;
  }
  .gridTabela{
    max-height: 42vh;
  }
  div.info-tab > span > span{
    display: none;
  }
}
@media (max-width: 320px){
  .lista {
    width: 95%;
    margin: 1.75rem auto;
    overflow: scroll;
  }
  .gridTabela{
    max-height:35vh;
  }
  .pagina>div{
    width: 70%;
  }
  div.info-tab > span > span{
    display: none;
  }
}
</style>