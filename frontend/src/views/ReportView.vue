<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :is-filtered="false" v-if="id > 0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import MyTable from "@/components/forms/MyTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      isLoading: false,
      columns: [],
      title: 'Relatórios',
      strFiltro: '',
    };
  },
  components: {
    Loader,
    MyTable,
  },
  methods: {
    createColumns(){
      switch (this.id) {
        case '101':
          this.title = 'Extrato de Capturas';
          this.columns = [
                        { title: "Município", field: "municipio", type: "string" },
                        { title: "Data", field: "dt_captura", type: "string" },
                        { title: "Execução", field: "execucao", type: "string" },
                        { title: "Zona", field: "zona", type: "string" },
                        { title: "Agravo", field: "agravo", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Localidade", field: "localidade", type: "string" },
                        { title: "Quadrante", field: "quadrante", type: "string" },
                        { title: "Equipe", field: "equipe", type: "string" },
                        { title: "Obs", field: "obs", type: "string" },

                        { title: "Área", field: "fant_area", type: "string" },
                        { title: "Quadra", field: "fant_quart", type: "string" },
                        { title: "Codend", field: "codend", type: "string" },
                        { title: "Método", field: "metodo", type: "string" },
                        { title: "Ambiente", field: "ambiente", type: "string" },
                        { title: "Local Capt", field: "local_captura", type: "string" },
                        { title: "Localidade", field: "localidade", type: "string" },
                        { title: "No Arm", field: "num_arm", type: "string" },
                        { title: "Altura", field: "altura", type: "string" },
                        { title: "Hora Ini", field: "hora_inicio", type: "string" },
                        { title: "Hora Fim", field: "hora_final", type: "string" },
                        { title: "Temp Ini", field: "temp_inicio", type: "string" },
                        { title: "Temp Fim", field: "temp_final", type: "string" },
                        { title: "Umid Ini", field: "umidade_inicio", type: "string" },
                        { title: "Umid Fim", field: "umidade_final", type: "string" },
                        { title: "Amostra", field: "amostra", type: "string" },
                        { title: "Qt Potes", field: "quant_potes", type: "string" },
                      ];
          break;
        case '102':
          this.title = 'Extrato de Identificações';
          this.columns = [
            { title: "Município", field: "municipio" },
            { title: "Data Captura", field: "dt_captura" },
            { title: "Data Identificação", field: "dt_identificacao" },
            { title: "Responsável", field: "responsavel" },
            { title: "Amostra", field: "amostra" },
            { title: "Espécie", field: "especie" },
            { title: "Macho", field: "macho" },
            { title: "Fêmea", field: "femea" },
            { title: "Fêmea Ing", field: "femea_ing" },
            { title: "Larva", field: "larva" },
            { title: "Ninfa", field: "ninfa" },
            { title: "No Pool", field: "pool" },
                        
          ];
          break;
      
        default:
          break;
      }
    }
  },
  mounted() {
    this.isLoading = true;
  
    reportService.getRelat(this.id,this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
    
    this.createColumns();
    this.isLoading = false;
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filter');
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}
.filter{
  font-size: small;
  font-weight: 600;
}
</style>
