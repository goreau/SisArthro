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
            <MyNestedTable
              :tableData="dataTable"
              :columns="columns"
              :expData="expTable"
              :expColumns="expColumns"
              v-if="id > 0"
            />
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
import Loader from "@/components/general/Loader.vue";
import MyNestedTable from "@/components/forms/MyNestedTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      expTable: [],
      isLoading: false,
      columns: [],
      nestedColumns: [],
      expColumns: [],
      title: "Relatórios",
      strFiltro: '',
    };
  },
  components: {
    Loader,
    MyNestedTable,
  },
  methods: {
    crateColumns() {
      switch (this.id) {
        case "1":
          this.title = 'Capturas';
          this.columns = [
            {
              title: "Capturas",
              formatter: (cell, formatterParams) => {
                const row = cell.getRow().getData();

                const btEdit = document.createElement("button");
                btEdit.type = "button";
                btEdit.title = "Ver Detalhes";
                btEdit.disabled = this.id_user != row.id_usuario;
                btEdit.style.cssText =
                  "height: fit-content; margin-left: 1rem;";
                btEdit.classList.add(
                  "button",
                  "is-info",
                  "is-light",
                  "is-outlined"
                );
                btEdit.innerHTML = this.myspan.innerHTML;
                btEdit.addEventListener("click", () => {
                  const id = row.id;
                  const el = document.getElementsByClassName(
                    "subTable" + id + ""
                  );
                  if (el[0].style["display"] == "none") {
                    el[0].style["display"] = "block";
                    btEdit.innerHTML = this.myspan1.innerHTML;
                  } else {
                    el[0].style["display"] = "none";
                    btEdit.innerHTML = this.myspan.innerHTML;
                  }
                });

                const buttonHolder = document.createElement("span");
                buttonHolder.appendChild(btEdit);

                return buttonHolder;
              },
            },
            { title: "Município", field: "municipio" },
            { title: "Localidade", field: "localidade" },
            { title: "Data", field: "dt_captura" },
            { title: "Execução", field: "execucao" },
            { title: "Agravo", field: "agravo" },
            { title: "Atividade", field: "atividade" },
          ];
          break;
        case "2":
          this.title = 'Identificações';
          this.columns = [
            {
              title: "Identificações",
              formatter: (cell, formatterParams) => {
                const row = cell.getRow().getData();

                const btEdit = document.createElement("button");
                btEdit.type = "button";
                btEdit.title = "Editar";
                btEdit.disabled = this.id_user != row.id_usuario;
                btEdit.style.cssText =
                  "height: fit-content; margin-left: 1rem;";
                btEdit.classList.add(
                  "button",
                  "is-info",
                  "is-light",
                  "is-outlined"
                );
                btEdit.innerHTML = this.myspan.innerHTML;
                btEdit.addEventListener("click", () => {
                  const id = row.id;
                  const el = document.getElementsByClassName(
                    "subTable" + id + ""
                  );
                  if (el[0].style["display"] == "none") {
                    el[0].style["display"] = "block";
                    btEdit.innerHTML = this.myspan1.innerHTML;
                  } else {
                    el[0].style["display"] = "none";
                    btEdit.innerHTML = this.myspan.innerHTML;
                  }
                });

                const buttonHolder = document.createElement("span");
                buttonHolder.appendChild(btEdit);

                return buttonHolder;
              },
            },
            { title: "Município", field: "municipio" },
            { title: "Data Captura", field: "dt_captura" },
            { title: "Data Identificação", field: "dt_identificacao" },
            { title: "Responsável", field: "responsavel" },
          ];
          break;
        case "3":
          this.title = 'Encoleiramento';
          this.columns = [
            {
              title: "Encoleiramento",
              formatter: (cell, formatterParams) => {
                const row = cell.getRow().getData();

                const btEdit = document.createElement("button");
                btEdit.type = "button";
                btEdit.title = "Ver Detalhes";
                btEdit.disabled = this.id_user != row.id_usuario;
                btEdit.style.cssText =
                  "height: fit-content; margin-left: 1rem;";
                btEdit.classList.add(
                  "button",
                  "is-info",
                  "is-light",
                  "is-outlined"
                );
                btEdit.innerHTML = this.myspan.innerHTML;
                btEdit.addEventListener("click", () => {
                  const id = row.id;
                  const el = document.getElementsByClassName(
                    "subTable" + id + ""
                  );
                  if (el[0].style["display"] == "none") {
                    el[0].style["display"] = "block";
                    btEdit.innerHTML = this.myspan1.innerHTML;
                  } else {
                    el[0].style["display"] = "none";
                    btEdit.innerHTML = this.myspan.innerHTML;
                  }
                });

                const buttonHolder = document.createElement("span");
                buttonHolder.appendChild(btEdit);

                return buttonHolder;
              },
            },
            { title: "Identificação", headerHozAlign:"center", columns:[
              { title: "Município", field: "municipio" },
              { title: "Área", field: "area" },
              { title: "Quarteirão", field: "quadra", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                } 
              },
            ]},
            { title: "Total", headerHozAlign:"center", columns:[
              { title: "Imóveis", field: "imoveis" },
              { title: "Cães", field: "caes", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                } 
              },
            ]},
            { title: "Encoleiramento", headerHozAlign:"center", columns:[
              { title: "Encoleirados", field: "encoleirado" },
              { title: "Falta Coleira", field: "falta" },
              { title: "Recusa Alergia", field: "alergia" },
              { title: "Recusa Outros", field: "recusa" },
              { title: "Fechado", field: "fechado" },
            ]},
          ];
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
            { title: "Área", field: "fant_area", type: "string" },
            { title: "Quadra", field: "fant_quart", type: "string" },
            { title: "Codend", field: "codend", type: "string" },
            { title: "PC", field: "pc", type: "string" },
            { title: "Coordenaddas", field: "coordenadas", type: "string" },
            { title: "Método", field: "metodo", type: "string" },
            { title: "Ambiente", field: "ambiente", type: "string" },
            { title: "Local Capt", field: "local_captura", type: "string" },
            { title: "Localidade", field: "localidade", type: "string" },
            { title: "Amostra", field: "amostra", type: "string" },
            { title: "Qt Potes", field: "quant_potes", type: "string" },
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
    this.isLoading = true;
    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan1 = document.getElementsByName("coisa1")[0];

    reportService
      .getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
        this.crateColumns();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

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
