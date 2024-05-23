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
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :exports="true" v-if="id > 0"/>
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
        case '103':
          this.title = 'Extrato de Caracterizações';
          this.columns = [
            { title: "Município", field: "municipio" },
            { title: "Quadra", field: "quadra" },
            { title: "CodEnd", field: "codend" },
            { title: "Situação", field: "situacao" },
            { title: "Tipo Imóvel", field: "tipo_imovel" },
            { title: "Nº Cães", field: "num_cao" },
            { title: "Nº Caes Pos", field: "num_cao_pos" },
            { title: "Ano Ident.", field: "ano_identifica" },
            { title: "Soma", field: "soma" },
                        
          ];
          break;
        case '104':
          this.title = 'Resumo de Investigação de Foco';
          this.columns = [
            {title: "Identificação", headerHozAlign:"center", columns: [
              { title: "Município", field: "municipio" },
              { title: "Área", field: "area" },
              { title: "Quadra", field: "quadra" },
            ]},
            {title: "Quantidades", headerHozAlign:"center", columns: [
              { title: "Imóveis", field: "imoveis" },
              { title: "Cães", field: "caes" },
              { title: "Coletas", field: "coleta" },
            ]},
            {title: "Positivos", headerHozAlign:"center", columns: [
              { title: "Parasitológico", field: "parasito" },
              { title: "DPP", field: "dpp" },
              { title: "Elisa", field: "elisa" },
            ]},
            {title: "Eutanásia", headerHozAlign:"center", columns: [
              { title: "Eutanasiados", field: "eutanasia" },
              { title: "Óbitos", field: "obito" },
              { title: "Recusas", field: "recusa" },
              { title: "Outros", field: "outros" },
            ]}          
          ];
          break;
        case '105':
          this.title = 'Resumo de Inquérito Canino';
          this.columns = [
            {title: "Identificação", headerHozAlign:"center", columns: [
              { title: "Município", field: "municipio" },
              { title: "Área", field: "area" },
              { title: "Quadra", field: "quadra" },
            ]},
            {title: "Quantidades", headerHozAlign:"center", columns: [
              { title: "Imóveis", field: "imoveis" },
              { title: "Cães", field: "caes" },
              { title: "Encoleiramentos", field: "coleira" },
              { title: "Coletas", field: "coleta" },
            ]},
            {title: "Exames Laboratoriais", headerHozAlign:"center", columns: [
              { title: "DPP", field: "dpp" },
              { title: "Elisa", field: "elisa" },
              { title: "Res. Final", field: "final" },
            ]},
            {title: "Eutanásia", headerHozAlign:"center", columns: [
              { title: "Eutanasiados", field: "eutanasia" },
              { title: "Óbitos", field: "obito" },
              { title: "Recusas", field: "recusa" },
              { title: "Outros", field: "outros" },
            ]}          
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
    
    this.createColumns();
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
