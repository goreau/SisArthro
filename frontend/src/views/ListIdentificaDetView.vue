<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Identificações</p>
            <button class="button is-primary is-outlined" @click="newIdent">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :is-filtered="true" :has-exports="true"/>
          </div>
        </div>
        <div style="display: none">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import identificaService from "@/services/identifica.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: "ListaIdentificacao",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      myspan: null,
      myspan2: null,
      master: 0,
    };
  },
  components: {
    MyTable,
    Loader,
    ConfirmDialog,
  },
  methods: {
    newIdent() {
      this.$router.push(`/editIdent/${this.master}`);
    },
    editIdent(id) {
      this.$router.push(`/editIdent/${id}`);
    },
    getFormat(row) {
      return {
        "has-text-danger-dark": row.status == 1,
        "has-text-danger": row.status == 2,
        "has-text-info": row.status == 3,
        "has-text-success": row.status == 9,
        "has-text-info": row.status == 7,
      };
    },
  },
  mounted() {
    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    
    this.isLoading = true;
    identificaService.getidentificaDets(this.master)
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Amostra", field: "amostra", type: "string" },
      { title: "Espécie", field: "especie", type: "string" },
      { title: "Pool", field: "pool", type: "string" },
      {
        title: "Ações",
        formatter: (cell, formatterParams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement("button");
          btEdit.type = "button";
          btEdit.title = "Editar";
          btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
          btEdit.classList.add("button", "is-primary", "is-outlined");
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener("click", () => {
            this.$router.push(`/editIdent/${row.id_identificacao}/${row.id_identificacao_det}`);
          });

          const btDel = document.createElement("button");
          btDel.type = "button";
          btDel.title = "Excluir";
          btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
          btDel.classList.add("button", "is-danger", "is-outlined");
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener("click", async () => {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa captura e todas as informações associada a ela?',
                okButton: 'Confirmar',
            })
            if (ok) {
              identificaService.deleteDet(row.id_identificacao_det);
              location.reload();
            }
          });

          const buttonHolder = document.createElement("span");
          buttonHolder.appendChild(btEdit);
          buttonHolder.appendChild(btDel);

          return buttonHolder;
        },
      },
    ];
  },
  created() {
    this.master = this.$route.params.master;
  },
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
