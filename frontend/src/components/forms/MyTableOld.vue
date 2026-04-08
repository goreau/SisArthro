<template>
  <div class="columns is-centered" v-if="filtered">
    <div class="column is-2">
      <div class="field is-horizontal">
        <label class="label" style="padding-right: 2rem">Filtrar: </label>
        <label class="switch">
          <input type="checkbox" :checked="ui.filter" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    {{ ui.filter }}
    <div class="column is-10" :style="{ visibility: ui.filter ? 'visible' : 'hidden' }">
      <div class="columns">
        <div class="column is-3">
          <div class="select">
            <select v-model="form.field" class="input">
              <option value="0">-- Coluna --</option>
              <option v-for="(item, index) in columns" :key="index" :value="item.field">
                {{ item.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <div class="select">
              <select v-model="form.type" class="input">
                <option value="0">-- Comparador --</option>
                <option value="=">igual a</option>
                <option value=">">maior que</option>
                <option value="<">menor que</option>
                <option value="!=">diferente de</option>
                <option value="like">contendo</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field has-addons">
            <input type="text" class="input" v-model="form.value" placeholder="Valor a filtrar" />
            <div class="control">
              <a class="button is-info" @click="setFilter">
                <span class="icon is-small">
                  <font-awesome-icon icon="fa-solid fa-search" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <button class="button is-success is-outlined" title="Limpar" @click="clearFilter">
            <span class="icon is-small">
              <font-awesome-icon icon="fa-solid fa-broom" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="has-text-right" v-if="exports">
    <button id="download-csv" class="button is-link is-outlined is-small" @click="download_csv">
      <font-awesome-icon icon="fa-solid fa-file-csv" />
    </button>
    <button id="download-json" class="button is-info is-outlined is-small" @click="download_json">
      <font-awesome-icon icon="fa-solid fa-file-lines" />
    </button>
    <button id="download-xlsx" class="button is-success is-outlined is-small" @click="download_xlsx">
      <font-awesome-icon icon="fa-solid fa-file-excel" />
    </button>
    <button id="download-pdf" class="button is-danger is-outlined is-small" @click="download_pdf">
      <font-awesome-icon icon="fa-solid fa-file-pdf" />
    </button>
  </div>
  <Loader :active="isLoading" />
  <div ref="table" class="is-striped"></div>
  <div ref="tableExp" style="display: none;"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables";
import lang from "./lang";
import Loader from "@/components/general/Loader.vue";

export default {
  components: { Loader },

  props: ["tableData", "columns", "filtered", "exports", "tableName", "expColumns"],

  data() {
    return {
      tabulator: null,
      tabulatorExp: null,
      isTableReady: false,
      form: {
        field: "0",
        type: "0",
        value: "",
        typed: "string",
      },
      initial: 1,
      isLoading: false,
      ui: {
        filter: false
      },
      arrFilter: [],
      cbColumns: [],
    };
  },

  methods: {
    onChange(e) {
      const val = e.target.checked;
      console.log("clicou:", val);

      this.ui.filter = val;

      console.log("depois set:", this.ui.filter);
    },
    initTable() {
      //   this.isLoading = true;
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        data: this.tableData || [],
        layout: "fitColumns",
        responsiveLayout: "hide",
        placeholder: "Nenhum registro atende aos critérios escolhidos!",
        reactiveData: false,
        columns: [],
        pagination: "local",
        paginationSize: 10,
        paginationInitialPage: this.initial,
        paginationSizeSelector: [5, 10, 15, 20],
        movableColumns: true,
        paginationCounter: "rows",
      });

      /* this.tabulator.on("tableBuilt", () => {
         this.isLoading = false;
       });*/

      this.tabulator.on("pageLoaded", (pageno) => {
        this.initial = pageno;
        localStorage.setItem(this.tableName + "_page", pageno);
      });
    },

    updateTable() {
      if (!this.tabulator || !this.tabulator.initialized) return;

      const hasColumns = this.columns && this.columns.length;
      const hasData = this.tableData && this.tableData.length >= 0;

      // 🚨 só executa quando colunas existirem
      if (!hasColumns) return;

      this.tabulator.blockRedraw();

      this.tabulator.setColumns(this.columns);

      if (hasData) {
        this.tabulator.setData(this.tableData);
      }

      this.tabulator.restoreRedraw();

      this.isTableReady = true;

      this.isLoading = false;
    },

    setFilter() {
      const col = this.columns.find((v) => v.field === this.form.field);
      if (!col) return;

      this.form.typed = col.type;

      this.arrFilter.push({
        field: this.form.field,
        type: this.form.type,
        value: this.form.value,
      });

      this.tabulator.setFilter(this.arrFilter);

      localStorage.setItem(this.tableName, JSON.stringify(this.arrFilter));
    },

    clearFilter() {
      if (!this.tabulator) return;

      this.isLoading = true;

      // limpa estado primeiro
      this.arrFilter = [];

      // 🔒 trava redraw
      this.tabulator.blockRedraw();

      this.tabulator.clearFilter();

      this.tabulator.restoreRedraw();

      this.form = {
        field: "0",
        type: "0",
        value: "",
        typed: "string",
      };

      localStorage.removeItem(this.tableName);
      localStorage.removeItem(this.tableName + "_page");

      this.isLoading = false;
    },

    /*  toggleFilter(e) {
        this.filter = e.target.checked;
  
        // Se o usuário desligar o switch, limpamos os filtros da tabela na hora
        if (!this.filter) {
          this.clearFilter();
        }
      },*/

    download_csv() {
      (this.tabulatorExp || this.tabulator).download("csv", "data.csv");
    },

    download_xlsx() {
      (this.tabulatorExp || this.tabulator).download("xlsx", "data.xlsx", {
        sheetName: "SisArthro",
      });
    },

    download_pdf() {
      this.tabulator.download("pdf", "data.pdf", {
        orientation: "landscape",
        title: "Relatório",
      });
    },

    download_json() {
      (this.tabulatorExp || this.tabulator).download("json", "data.json");
    },

    initExportTable() {
      if (!this.expColumns || this.expColumns.length === 0) return;

      this.tabulatorExp = new Tabulator(this.$refs.tableExp, {
        layout: "fitColumns",
        data: this.tableData,
        columns: this.expColumns,
      });
    },
  },

  watch: {
    'ui.filter'(val) {
      console.log("FILTER mudou:", val);

      if (!val) {
        this.clearFilter();
      }
    },
    columns: {
      handler(cols) {
        if (this.tabulator && cols && cols.length) {
          this.updateTable();
        }
      },
      immediate: true,
      deep: true
    },
    tableData: {
      handler(value) {
        this.updateTable();
      },
      immediate: true,
      deep: true,
    },
    expColumns(value) {
      if (value && value.length > 0) {
        this.initExportTable();
      }
    },
  },

  mounted() {
    this.initTable();

    window.addEventListener("resize", () => {
      if (this.tabulator) {
        this.tabulator.redraw(true);
      }
    });

    // 🔁 Restaurar filtros
    const stFilter = JSON.parse(localStorage.getItem(this.tableName));
    if (Array.isArray(stFilter)) {
      this.arrFilter = stFilter;
      this.form = stFilter[0] || this.form;
      this.filter = true;
    }

    // 🔁 Restaurar página
    const pg = localStorage.getItem(this.tableName + "_page");
    if (pg) {
      this.initial = parseInt(pg);
    }

    this.initExportTable();
  },
};
</script>
<style scoped>
.tabela {
  width: 800px;
  height: auto;
}

.button {
  margin-right: 1rem;
}

/** slider classes */
.switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: -0.2rem;
  left: 0;
  right: 0;
  bottom: -0.2rem;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1rem;
  width: 1rem;
  left: 0.5rem;
  bottom: 0.5rem;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #2a455a;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2a455a;
}

input:checked+.slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.slider.round {
  border-radius: 0.75rem;
}

.slider.round:before {
  border-radius: 50%;
}
</style>