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
            <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
            <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="['edit', 'delete']" :has-exports="true" @edit="onEditRow" :calc-height="false"
              :deleted-id="delId" @delete="onDeleteRow" :persistence-id="$options.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import identificaService from "@/services/identifica.service";
import MyTable from "@/components/forms/MyTable.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: "ListaIdentificacao",
  data() {
    return {
      dataTable: [],
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      columns: [],
      tableName: 'identifica',
      myspan: null,
      myspan2: null,
      id_user: 0,
      tpUser: 0,
      isLoading: false,
      delId: 0
    };
  },
  components: {
    MyTable,
    Message,
    ConfirmDialog,
  },
  methods: {
    newIdent() {
      this.$router.push("/identifica");
    },
    onEditRow(id) {
      this.$router.push(`/editIdent/${id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa identificação e todas as informações associada a ela?',
        okButton: 'Confirmar',
      })
      if (ok) {
        identificaService.delete(id)
          .then(() => {
            this.delId = id
            //  location.reload();
          })
          .catch((err) => {
            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Identificação";
            setTimeout(() => (this.showMessage = false), 3000);
          })

      }
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
    this.tpUser = this.currentUser.role;

    identificaService.getidentificas({})
      .then((response) => {
        this.dataTable = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });

    this.columns = [
      { headerName: 'ID', field: 'id', hide: true },
      { headerName: "Município", field: "municipio" },
      { headerName: "Captura", field: "codigo" },
      { headerName: "Data", field: "data" },
      { headerName: 'Prop', field: 'owner_id', hide: true },
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
