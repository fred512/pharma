<template>
  <li class="perfil">
    <v-spacer />
    <b-avatar class="foto" :src="patient.picture.medium" size="8rem"></b-avatar>
    <v-spacer />
    <h4>
      {{patient.name.title}}. {{patient.name.first}} {{patient.name.last}} 
    </h4>
    <ul class="info fa-ul">
      <li><i class="fa fa-li fa-envelope-o fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;<span> {{patient.email}}</span> </li>
      <li>
        <i class="fa fa-li fa-2x" :class="{'fa-mars':patient.gender=='male','fa-venus':patient.gender=='female'}" aria-hidden="true"></i>
        &nbsp;&nbsp;{{patient.gender}} </li>
      <li><i class="fa fa-li fa-birthday-cake fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;{{patient.dob.date.split("T")[0].split("-").reverse().join("/")}} </li>
      <li><i class="fa fa-li fa-phone fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;{{patient.phone}} </li>
      <li><i class="fa fa-li fa-mobile fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;{{patient.cell}} </li>
      <li><i class="fa fa-li fa-globe fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;{{patient.nat}} </li>
      <li><i class="fa fa-li fa-address-book-o fa-2x" aria-hidden="true"></i>
        &nbsp;&nbsp;{{patient.location.street.name}},{{patient.location.street.number}}<br>
        &nbsp;&nbsp;{{patient.location.city}}-{{patient.location.state}}={{patient.location.country}}<br>
        
      </li>
      <li><i class="fa fa-li fa-ticket fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;{{patient.id.name}} </li>
    </ul>

  </li>
</template>

<script>
export default {
  name:'perfil',
  props:['patientSel'],
  data: function() {
    return {
      patient:[]
    }
  },
  mounted(){
    this.patient=this.patientSel
  }

}
</script>

<style>
.perfil{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.foto{
  position: absolute;
  top: -150px;
}
.info{
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.2rem;
}
ul>li{
  height: 42px;
  margin-top: 15px;
  width: 100%;
  color: #004d40;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
}
.modal-content{
  background-color: #e8e8e8 !important;
}
#modalPerfil___BV_modal_header_ > button{
  font-size: 1.2rem;
  color: #fff !important;
  text-transform: uppercase !important;
  background-color: #dc3545;
}
/* @media (max-width: 760px){
  .foto{
    left: 35%;
  }
}
@media (max-width: 412px){
  .foto{
    left: 30%;
  }
} */
</style>