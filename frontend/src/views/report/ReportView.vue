<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="[]" :has-exports="true" :calcHeight="false" :tree-data="treeRel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/forms/MyTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      columns: [],
      expColumns: [],
      treeRel: false,
      title: 'Relatórios',
      strFiltro: '',
      tableName: 'relatorio',
    };
  },
  components: {
    MyTable,
  },
  methods: {
    createColumns() {
      switch (this.id) {
        case "1":
          this.title = 'Capturas';
          break;
        case "2":
          this.title = 'Identificações';
          break;
        case "3":
          this.title = 'Encoleiramento';
          break;
        case '101':
          this.title = 'Extrato de Capturas';
          break;
        case '102':
          this.title = 'Extrato de Identificações';
          break;
        case '103':
          this.title = 'Extrato de Caracterizações';
          break;
        case '104':
          this.title = 'Resumo de Investigação de Foco';
          break;
        case '105':
          this.title = 'Resumo de Inquérito Canino';
          break;
        case '106':
          this.title = 'Notificação de Cães';
          break;
        case '107':
          this.title = 'Extrato de Notificação de Cães';
          break;
        case '108':
          this.title = 'Extrato de Animais Cadastrados';
          break;
        case '109':
          this.title = 'Resumo de Caracterizações';
          break;
        default:
          break;
      }
    }
  },
  mounted() {

    reportService.getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
        this.columns = data.cols;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });

    this.createColumns();
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filterRelArthro');
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}

.filter {
  font-size: small;
  font-weight: 600;
}
</style>
