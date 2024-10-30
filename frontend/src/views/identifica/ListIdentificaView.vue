<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        
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
            <Loader v-if="isLoading" />
            <Message
              v-if="showMessage"
              @do-close="closeMessage"
              :msg="message"
              :type="type"
              :caption="caption"
            />
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
import identificaService from "@/services/identifica.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: "ListaIdentificacao",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      columns: [],
      tableName: 'identifica',
      myspan: null,
      myspan2: null,
      id_user: 0,
    };
  },
  components: {
    MyTable,
    Loader,
    Message,
    ConfirmDialog,
  },
  methods: {
    newIdent() {
      this.$router.push("/identifica");
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

    this.id_user = this.currentUser.id;
    
    this.isLoading = true;
    identificaService.getidentificas({})
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Município", field: "municipio", minWidth: 250, responsive:1, },
      { title: "Captura", field: "codigo", minWidth: 200, responsive:1, },
      { title: "Data", field: "dt_identificacao", sorter: "date", minWidth: 200, responsive:2, sorterParams:{
          format:"dd/MM/yyyy",
          alignEmptyValues:"top",
      }},
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
            this.$router.push(`/editIdent/${row.id_identificacao}`);
          });

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
                message: 'Deseja mesmo excluir essa identificação e todas as informações associada a ela?',
                okButton: 'Confirmar',
            })
            if (ok) {
              identificaService.delete(row.id_identificacao)
              .then(()=>{
                location.reload();
              })
              .catch((err)=>{
                this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              })
              
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
