<template>

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
  <div ref="tableExp" style="display: none;" ></div>
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import lang from "./lang";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      tabulator: null, //variable to hold your table
      tabulatorExp: null,
      xuxu: "coisas",
      form: {
        column: "0",
        operator: "0",
        value: "",
        type: "string",
      },
      filter: false,
    };
  },
  methods: {
    setFilter() {
      let obj = this.form;

      const col = this.columns.filter((v) => v.field === obj.column, obj);
      obj.type = col[0].type;

      this.tabulator.setFilter(obj.column, obj.operator, obj.value);
    },
    clearFilter() {
      this.form.column = "0";
      this.form.operator = "0";
      this.form.value = "";

      this.tabulator.clearFilter();
    },
    download_csv() {
      this.tabulatorExp.download("csv", "data.csv");
      //this.tabulatorExp.download(dataTreeCSVfileFormatter, "data.csv",{nested:true, nestedParentTitle:"Parent Name", nestedParentField:"name"});
    },
    download_xlsx() {
      this.tabulatorExp.download("xlsx", "data.xlsx", {
        sheetName: "SisArthro",
      });
    },
    download_json() {
      this.tabulator.download("json", "data.json");
    },
    download_pdf() {
      this.tabulatorExp.download("pdf", "data.pdf", {
        orientation: "landscape", //set page orientation to portrait
        title: "Relatório SisArthro", //add title to report
      });
    },
    toggleFilter(e) {
      this.filter = e.target.checked;
    },
  },
  props: ["tableData", "columns", "expData", "expColumns"],
  watch: {
    tableData(value) {
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        layout: "fitColumns",
        placeholder:"Nenhum registro atende aos critérios escolhidos!",
        height: 600,
        columnDefaults: {
          resizable: true,
        },
        data: this.tableData,
        columns: this.columns,
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 15, 20],
        paginationCounter: "rows",
        rowFormatter: function (row) {
          //create and style holder elements
          var holderEl = document.createElement("div");
          var tableEl = document.createElement("div");

          const id = row.getData().id;

          holderEl.style.boxSizing = "border-box";
          holderEl.style.padding = "10px 30px 10px 10px";
          holderEl.style.borderTop = "1px solid #333";
          holderEl.style.borderBotom = "1px solid #333";
          holderEl.setAttribute("class", "subTable" + id + "");

          tableEl.style.border = "1px solid #333";
          holderEl.setAttribute("class", "subTable" + id + "");
          holderEl.style.display = "none";

          holderEl.appendChild(tableEl);

          row.getElement().appendChild(holderEl);
          var _nt = [];

          switch (row.getData().tp) {
            case "1":
              _nt = [
                { title: "Área", field: "dets.fant_area" },
                { title: "Quadra", field: "dets.fant_quart" },
                { title: "CodEnd", field: "dets.codend" },
                { title: "Coordenadas", field: "dets.coordenadas" },
                { title: "Método", field: "dets.metodo" },
                { title: "Ambiente", field: "dets.ambiente" },
                { title: "Local Capt", field: "dets.local_captura" },
                { title: "No Amostra", field: "dets.amostra" },
                { title: "Potes", field: "dets.quant_potes" },
              ];
              break;
            case "2":
              _nt = [
                { title: "Amostra", field: "dets.amostra" },
                { title: "Espécie", field: "dets.especie" },
                { title: "Macho", field: "dets.macho" },
                { title: "Fêmea", field: "dets.femea" },
                { title: "Fêmea Ing", field: "dets.femea_ing" },
                { title: "Larva", field: "dets.larva" },
                { title: "Ninfa", field: "dets.ninfa" },
                { title: "No Pool", field: "dets.pool" },
              ];
              break;
            default:
              break;
          }

          var subTable = new Tabulator(tableEl, {
            layout: "fitColumns",
            data: row.getData().detail,
            columns: _nt,
          });
        },
      });
    },
    expData(value) {
      this.tabulatorExp = new Tabulator(this.$refs.tableExp, {
        langs: lang,
        locale: "pt-br",
        layout: "fitColumns",
        heigth: 10,
        data: this.expData,
        columns: this.expColumns,
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

input:checked + .slider {
  background-color: #2a455a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2a455a;
}

input:checked + .slider:before {
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
