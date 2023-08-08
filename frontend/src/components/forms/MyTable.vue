<template>
  <div class="columns is-centered">
    <div class="column is-3">
      <div class="field is-horizontal">
        <label class="label">Filtrar: </label>
        <div class="select">
          <select v-model="form.column">
            <option value="0">-- Selecione uma Coluna --</option>
            <option
              v-for="(item, index) in columns"
              :key="index"
              :value="item.field"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="column is-3">
      <div class="field">
        <div class="select">
          <select v-model="form.operator">
            <option value="0">-- Selecione um Comparador --</option>
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
        <input
          type="text"
          class="input"
          v-model="form.value"
          placeholder="Valor a filtrar"
        />
        <div class="control">
          <a class="button is-info" @click="setFilter">
            <span class="icon is-small">
              <font-awesome-icon icon="fa-solid fa-search" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="has-text-right">
    <button
      id="download-csv"
      class="button is-link is-outlined is-small"
      @click="download_csv"
    >
      <font-awesome-icon icon="fa-solid fa-file-csv" />
    </button>
    <button
      id="download-json"
      class="button is-info is-outlined is-small"
      @click="download_json"
    >
      <font-awesome-icon icon="fa-solid fa-file-lines" />
    </button>
    <button
      id="download-xlsx"
      class="button is-success is-outlined is-small"
      @click="download_xlsx"
    >
      <font-awesome-icon icon="fa-solid fa-file-excel" />
    </button>
    <button
      id="download-pdf"
      class="button is-danger is-outlined is-small"
      @click="download_pdf"
    >
      <font-awesome-icon icon="fa-solid fa-file-pdf" />
    </button>
  </div>
  <div ref="table" class="is-striped"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import lang from "./lang";

export default {
  data() {
    return {
      tabulator: null, //variable to hold your table
      form: {
        column: "0",
        operator: "0",
        value: "",
        type: "string",
      },
    };
  },
  methods: {
    setFilter() {
      let obj = this.form;
            
      const col = this.columns.filter(v => v.field === obj.column,obj);
      obj.type = col[0].type;

      this.tabulator.setFilter(obj.column,obj.operator,obj.value);
    },
    download_csv() {
      this.tabulator.download("csv", "data.csv");
    },
    download_xlsx() {
      this.tabulator.download("xlsx", "data.xlsx", { sheetName: "SisArthro" });
    },
    download_pdf() {
      this.tabulator.download("pdf", "data.pdf", {
        orientation: "portrait", //set page orientation to portrait
        title: "Relatório SisArthro", //add title to report
      });
    },

  },
  props: ["tableData", "columns"],
  watch: {
    tableData(value) {
      console.log(value);
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        data: value, //link data to table
        layout: "fitColumns",
        reactiveData: true, //enable data reactivity
        columns: this.columns, //define table columns
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 15, 20],
        movableColumns: true,
        paginationCounter: "rows",
      });
    },
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"
    );
    document.head.appendChild(externalScript);

    let externalScript1 = document.createElement("script");
    externalScript1.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"
    );
    document.head.appendChild(externalScript1);
    let externalScript2 = document.createElement("script");
    externalScript2.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js"
    );
    document.head.appendChild(externalScript2);
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
</style>
