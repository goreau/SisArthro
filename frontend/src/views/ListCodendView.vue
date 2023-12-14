<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Endereços Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newEnd">
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
          <span class="icon is-small is-left" name="coisa1">
            <font-awesome-icon icon="fa-solid fa-dog" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import codendService from "@/services/codend.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: "ListaEndereços",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      myspan: null,
      myspan2: null,
      id_user: 0
    };
  },
  components: {
    MyTable,
    Loader,
    ConfirmDialog,
  },
  methods: {
    newEnd() {
      this.$router.push("/codend");
    },
    editCapt(id) {
      this.$router.push(`/editEnd/${id}`);
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
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    this.myspan1 = document.getElementsByName("coisa1")[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.isLoading = true;
    codendService.getCodends({})
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Municipio", field: "municipio", type: "string" },
      { title: "Quarteirao", field: "quarteirao", type: "string" },
      { title: "Código", field: "codigo", type: "string" },
      { title: "Endereço", field: "endereco", type: "string" },
      {
        title: "Ações",
        formatter: (cell, formatterParams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement("button");
          btEdit.type = "button";
          btEdit.title = "Editar";
          btEdit.disabled = this.id_user != row.id_usuario;
          btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
          btEdit.classList.add("button", "is-primary", "is-outlined");
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener("click", () => {
            this.$router.push(`/editCod/${row.id_codend}`);
          });

          /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

          const btDel = document.createElement("button");
          btDel.type = "button";
          btDel.title = "Excluir";
          btDel.disabled = this.id_user != row.id_usuario;
          btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
          btDel.classList.add("button", "is-danger", "is-outlined");
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener("click", async () => {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir esse endereço?',
                okButton: 'Confirmar',
            })
            if (ok) {
              codendService.delete(row.id_codend);
              location.reload();
            }          
          });

          const btCaract = document.createElement("button");
          btCaract.type = "button";
          btCaract.title = "Caracterização";
          //btCaract.disabled = this.id_user != row.id_usuario;
          btCaract.style.cssText = "height: fit-content; margin-left: 1rem;";
          btCaract.classList.add("button", "is-info", "is-outlined");
          btCaract.innerHTML = this.myspan1.innerHTML;
          btCaract.addEventListener("click", () => {
            this.$router.push(`/caracteriza/${row.id_codend}/0`);
          });

          const buttonHolder = document.createElement("span");
          buttonHolder.appendChild(btEdit);
          buttonHolder.appendChild(btDel);
          buttonHolder.appendChild(btCaract);

          return buttonHolder;
        },
      },
    ];
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
