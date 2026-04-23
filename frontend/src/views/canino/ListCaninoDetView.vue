<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Animais Cadastrados</p>
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
            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="false"
              :buttons="['edit', 'delete']" :has-exports="false" @edit="onEditRow" :calcHeight="true" :deletedId="delId"
              @delete="onDeleteRow" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import caninoService from "@/services/canino.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: "ListaCaninos",
  data() {
    return {
      dataTable: [],
      tableName: "canino_det",
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
      this.$router.push(`/canino_det/${this.master}`);
    },
    onEditRow(id) {
      this.$router.push(`/editCaninoDet/${id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa animal?',
        okButton: 'Confirmar',
      })
      if (ok) {
        caninoService.deleteDet(id)
          .then(() => {
            this.delId = id;
          })
          .catch((err) => {
            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Animais";
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
    caninoService.getCaninosDet(this.master)
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { headerName: "Tipo", field: "tipo" },
      { headerName: "Nome", field: "nome" },
      { headerName: "Ano Nasc", field: "nascimento" },
      { headerName: "Raça", field: "raca" },
      { headerName: "Sexo", field: "sexo" },
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
