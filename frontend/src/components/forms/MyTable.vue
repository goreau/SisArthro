<template>
  <div class="columns is-centered" v-if="filtered">
    <div class="column is-2">
      <div class="field is-horizontal">
        <label class="label" style="padding-right: 2rem">Filtrar: </label>
        <label class="switch">
          <input type="checkbox" v-model="filter" @change="toggleFilter($event)" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div class="column is-10" :style="{visibility: filter ? 'visible' : 'hidden'}">
      <div class="columns">
        <div class="column is-3">
          <div class="select">
            <select v-model="form.field" class="input">
              <option value="0">-- Coluna --</option>
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
  <Loader v-if="isLoading" />
  <div ref="table" class="is-striped"></div>
  <div ref="tableExp" style="display: none;" ></div>
</template>

<script>
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import {ResponsiveLayoutModule} from 'tabulator-tables';
import lang from "./lang";
import Loader from "@/components/general/Loader.vue";


export default {
  data() {
    return {
      tabulator: null, //variable to hold your table
      form: {
        field: "0",
        type: "0",
        value: "",
        typed: "string",
      },
      initial: 1,
      isLoading: false,
      filter: false,
      arrFilter:[],
      cbColumns: []
    };
  },
  components: {
    Loader,
  },
  methods: {
    setFilter() {
      let obj = this.form;

      const col = this.columns.filter((v) => v.field === obj.field, obj);
      obj.typed = col[0].type;

      this.arrFilter.push({field: obj.field, type: obj.type, value: obj.value});

      this.tabulator.setFilter(this.arrFilter);//obj.column, obj.operator, obj.value);

      localStorage.setItem(this.tableName, JSON.stringify(this.arrFilter));//obj));
    },
    clearFilter() {
      this.isLoading = true;
      this.form.field = "0";
      this.form.type = "0";
      this.form.value = "";

      this.arrFilter = [];

      this.tabulator.clearFilter();
      localStorage.removeItem(this.tableName);

      let name = this.tableName + '_page';
      localStorage.removeItem(name);

      this.isLoading = false;
    },
    download_csv() {
      if (this.expColumns == undefined){
        this.tabulator.download("csv", "data.csv");
      } else {
        this.tabulatorExp.download("csv", "data.csv");
      }
      
    },
    download_xlsx() {
      if (this.expColumns == undefined){
        this.tabulator.download("xlsx", "data.xlsx", { sheetName: "SisArthro" });
      } else {
        this.tabulatorExp.download("xlsx", "data.xlsx", { sheetName: "SisArthro" });
      }
    },
    download_pdf() {
      this.tabulator.download("pdf", "data.pdf", {
        orientation: "landscape", //set page orientation to portrait
        title: "Relatório SisArthro", //add title to report
      });
    },
    download_json() {
      if (this.expColumns == undefined || this.expColumns.lenght == 0){
        this.tabulator.download("json", "data.json");
      } else {
        this.tabulatorExp.download("json", "data.json");
      }
      
    },
    toggleFilter(e) {
      this.filter = e.target.checked;
    },
  },
  props: ["tableData", "columns","filtered","exports","tableName", "expColumns"],
  watch: {
    tableData(value) {
      this.isLoading = true;
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        data: value, //link data to table
        responsiveLayout: true,
        layout: "fitColumns",
        placeholder:"Nenhum registro atende aos critérios escolhidos!",
        reactiveData: true, //enable data reactivity
        columns: this.columns, //define table columns
        pagination: "local",
        paginationSize: 10,
        paginationInitialPage: this.initial,
        dataLoader: true,
        dataLoaderLoading: "<div style='display:inline-block; border:4px solid #333; border-radius:10px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>Carregando</div>",
        paginationSizeSelector: [5, 10, 15, 20],
        movableColumns: true,
        paginationCounter: "rows",
      });
      this.cbColumns = this.columns.filter( el => el.title !== "Ações");

      if (this.filter){
        this.tabulator.setFilter(this.arrFilter);//this.form.column, this.form.operator, this.form.value);
      }

      if (this.expColumns != undefined){
 //       if (this.expColumns.lenght > 0){
          this.tabulatorExp = new Tabulator(this.$refs.tableExp, {
            langs: lang,
            locale: "pt-br",
            layout: "fitColumns",
            heigth: 10,
            data: this.tableData,
            columns: this.expColumns,
          });
 //       }
      }
      this.tabulator.on("pageLoaded", (function(pageno){
        this.initial = pageno;
        let name = this.tableName + '_page';
        localStorage.setItem(name, this.initial);
      }).bind(this));
      this.tabulator.setPageToRow(this.initial);

      this.isLoading = false;
    },
    expColumns(value){
      if (this.tableData != undefined){
        if(this.tableData.lenght > 0){
          this.tabulatorExp = new Tabulator(this.$refs.tableExp, {
              langs: lang,
              locale: "pt-br",
              layout: "fitColumns",
              heigth: 10,
              data: this.tableData,
              columns: value,
          });
        }
      }
    }
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"
    );
    document.head.appendChild(externalScript);

    let stFilter = JSON.parse(localStorage.getItem(this.tableName));
    
    if (stFilter) {
      if (Array.isArray(stFilter)){
        this.arrFilter = stFilter;
        var obj = stFilter[0];
        this.form = obj;//JSON.parse(obj);
        this.filter = true;
      } else {
        localStorage.removeItem(this.tableName);
      }  
    }

    let name = this.tableName + '_page';
    let pg = localStorage.getItem(name);

    if (pg){
      this.initial = pg;
    }

    let externalScript1 = document.createElement("script");
    externalScript1.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    );
    document.head.appendChild(externalScript1);
    let externalScript2 = document.createElement("script");
    externalScript2.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"
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
