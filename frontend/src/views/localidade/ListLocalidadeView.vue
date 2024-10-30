<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Localidades Cadastradas</p>
            <button class="button is-primary is-outlined" @click="newLoc">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true" :tableName="tableName"/>
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
import localidadeService from "@/services/localidade.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: "ListaLocalidades",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      tableName: 'localidade',
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
    newLoc() {
      this.$router.push("/localidade");
    },
    editCapt(id) {
      this.$router.push(`/editLoc/${id}`);
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
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.isLoading = true;
    localidadeService.getLocalidades({})
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Municipio", field: "municipio", minWidth: 250, responsive:1, },
      { title: "Código", field: "codigo", minWidth: 200, responsive:2, },
      { title: "Nome", field: "nome", minWidth: 200, responsive:1, },
      { title: "Data", field: "data", sorter: "date", sorterParams:{
          format:"dd/MM/yyyy",
          alignEmptyValues:"top",
      }, minWidth: 200, responsive:4,},
      {
        title: "Ações", minWidth: 200, responsive:0,
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
            this.$router.push(`/editLoc/${row.id_localidade}`);
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
                message: 'Deseja mesmo excluir essa localidade?',
                okButton: 'Confirmar',
            })
            if (ok) {
              localidadeService.delete(row.id_localidade);
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
