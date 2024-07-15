<template>
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
      filter: false,
      cbColumns: []
    };
  },
  methods: {
    
  },
  props: ["tableData", "columns",],
  watch: {
    tableData(value) {
      this.tabulator = new Tabulator(this.$refs.table, {
        langs: lang,
        locale: "pt-br",
        data: value, //link data to table
        layout: "fitColumns",
        placeholder:"Nenhum registro atende aos critérios escolhidos!",
        reactiveData: true, //enable data reactivity
        columns: this.columns, //define table columns
        pagination: false,
        movableColumns: true,
      });
    },
  },
  mounted() {

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
