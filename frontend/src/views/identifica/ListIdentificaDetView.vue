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
            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="['edit', 'delete']" :has-exports="false" @edit="onEditRow" :calcHeight="false"
              @delete="onDeleteRow" />
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
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: "ListaIdentificacao",
  data() {
    return {
      dataTable: [],
      tableName: "identifica_det",
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
    onEditRow(id) {
      const row = this.dataTable.find(item => item.id === id);
      this.$router.push(`/editIdent/${row.id_identificacao}/${row.id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa captura e todas as informações associada a ela?',
        okButton: 'Confirmar',
      })
      if (ok) {
        identificaService.deleteDet(id);
        location.reload();
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
      { hheaderName: "Amostra", field: "amostra" },
      { hheaderName: "Espécie", field: "especie" },
      { hheaderName: "Pool", field: "pool" },
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
