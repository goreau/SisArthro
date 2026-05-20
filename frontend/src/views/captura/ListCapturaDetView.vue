<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Capturas Cadastradas</p>
            <button class="button is-primary is-outlined" @click="newCaptDet">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <Loader v-if="isLoading" />
            <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="true"
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
import capturaService from "@/services/captura.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: "ListaCapturasDet",
  data() {
    return {
      dataTable: [],
      tableName: 'captura_det',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      columns: [],
      delId: null,
      master: null
    };
  },
  components: {
    MyTable,
    Loader,
    ConfirmDialog
  },
  methods: {
    newCaptDet() {
      this.$router.push(`/captura_det/${this.master}`);
    },
    onEditRow(id) {
      this.$router.push(`/editCaptDet/${id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa captura?',
        okButton: 'Confirmar',
      })
      if (ok) {
        capturaService.deleteDet(id)
          .then(() => {
            this.delId = id;
          })
          .catch((err) => {
            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Captura";
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
    this.isLoading = true;
    capturaService.getCapturasDet(this.master)
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { headerName: 'ID', field: 'id', hide: true },
      { headerName: "Quadra", field: "quadra" },
      { headerName: "CodEnd", field: "codend" },
      { headerName: "Método", field: "metodo" },
      { headerName: "Local", field: "local" },
      { headerName: "Amostra", field: "amostra" },
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
