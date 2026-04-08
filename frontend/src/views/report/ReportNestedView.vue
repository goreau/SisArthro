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
            <MyTable :data="dataTable" :columns="columns" :pagination="true" :calcHeight="false" />
          </div>
        </div>
      </div>
    </div>
    <div style="display: none">
      <span class="icon is-small is-left" name="coisa">
        <font-awesome-icon icon="fa-solid fa-eye" />
      </span>
      <span class="icon is-small is-left" name="coisa1">
        <font-awesome-icon icon="fa-solid fa-eye-slash" />
      </span>
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
      expTable: [],
      columns: [],
      nestedColumns: [],
      expColumns: [],
      title: "Relatórios",
      strFiltro: '',
    };
  },
  components: {
    MyTable,
  },
  methods: {
    getGroupFields(columns) {
      return columns
        .filter(c => c.group === true || c.group === 'true')
        .map(c => c.field);
    },
    buildGroupedData(data, columns) {
      const groupFields = this.getGroupFields(columns);

      const result = [];
      let lastKey = null;

      data.forEach(row => {
        const key = groupFields.map(f => row[f]).join('|');

        if (key !== lastKey) {
          result.push({
            __type: 'group',
            ...groupFields.reduce((acc, f) => {
              acc[f] = row[f];
              return acc;
            }, {})
          });

          lastKey = key;
        }

        result.push({
          __type: 'detail',
          ...row
        });
      });

      return result;
    },
    repeatCleaner(field, groupFields) {
      return (params) => {
        if (this.isNewGroup(params, groupFields)) return params.value;

        const prev = params.api.getDisplayedRowAtIndex(params.rowIndex - 1)?.data;

        return prev && prev[field] === params.value ? "" : params.value;
      };
    },
    isNewGroup(params, groupFields) {
      const prev = params.api.getDisplayedRowAtIndex(params.rowIndex - 1)?.data;
      const curr = params.data;

      if (!prev) return true;

      return groupFields.some(f => prev[f] !== curr[f]);
    },
    createGroupRenderer(groupFields) {
      return (params) => {
        if (!this.isNewGroup(params, groupFields)) return "";

        const data = params.data;

        return `
      <div style="
        font-weight: bold;
        padding: 6px 0;
        border-top: 1px solid #ccc;
      ">
        ${groupFields.map(f => data[f]).join(" | ")}
      </div>
    `;
      };
    },
    buildColumns(columns) {
      const groupFields = columns
        .filter(c => c.group)
        .map(c => c.field);

      const cols = columns.map(col => {
        const base = {
          ...col,
          sortable: true,
          filter: true,
          resizable: true,
        };

        // 👉 coluna principal do grupo (primeira)
        if (col.group && col.field === groupFields[0]) {
          return {
            ...base,
            cellRenderer: this.createGroupRenderer(groupFields)
          };
        }

        // 👉 outras colunas de grupo
        if (col.group) {
          return {
            ...base,
            valueFormatter: this.repeatCleaner(col.field, groupFields)
          };
        }

        return base;
      });

      return cols;
    },
    crateColumns() {
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
        default:
          break;
      }
    },
    crateExpColumns() {
      switch (this.id) {
        case "1":
          this.expColumns = [
            { title: "Município", field: "municipio" },
            { title: "Localidade", field: "localidade" },
            { title: "Data", field: "dt_captura" },
            { title: "Execução", field: "execucao" },
            { title: "Agravo", field: "agravo" },
            { title: "Atividade", field: "atividade" },
            { title: "Área", field: "fant_area" },
            { title: "Quadra", field: "fant_quart" },
            { title: "Codend", field: "codend" },
            { title: "PC", field: "pc" },
            { title: "Coordenaddas", field: "coordenadas" },
            { title: "Método", field: "metodo" },
            { title: "Ambiente", field: "ambiente" },
            { title: "Local Capt", field: "local_captura" },
            { title: "Localidade", field: "localidade" },
            { title: "Amostra", field: "amostra" },
            { title: "Qt Potes", field: "quant_potes" },
          ];
          break;
        case "2":
          this.expColumns = [
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
        case "3":
          this.expColumns = [
            { title: "Município", field: "municipio" },
            { title: "Área", field: "area" },
            { title: "Quarteirão", field: "quadra" },
            { title: "Imóveis", field: "imoveis" },
            { title: "Cães", field: "caes" },
            { title: "Encoleirados", field: "encoleirado" },
            { title: "Falta Coleira", field: "falta" },
            { title: "Recusa Alergia", field: "alergia" },
            { title: "Recusa Outros", field: "recusa" },
            { title: "Fechado", field: "fechado" },
            { title: "Codend", field: "dets.codend" },
            { title: "Encoleirado", field: "dets.encoleirado" },
            { title: "Falta Coleira", field: "dets.falta" },
            { title: "Recusa Alergia", field: "dets.alergia" },
            { title: "Recusa Outros", field: "dets.recusa" },
            { title: "Fechado", field: "dets.fechado" },
            { title: "Desfecho", field: "dets.desfecho" },

          ];
          break;

        default:
          break;
      }
    },
  },
  mounted() {
    reportService
      .getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.columns = this.buildColumns(data.cols)
        this.dataTable = this.buildGroupedData(data.data, this.columns);
        this.strFiltro = data.filter;
        this.crateColumns();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });

    reportService
      .getExport(this.id, this.filter)
      .then((response) => {
        this.expTable = response.data;
        this.crateExpColumns();
      })
      .catch((err) => {
        console.log(err);
      });

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
