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
            <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="['edit', 'delete']" :has-exports="true" @edit="onEditRow" :calc-height="false"
              @delete="onDeleteRow" :deleted-id="delId" :persistence-id="$options.name" />
          </div>
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
      delId: null,
      id_user: 0,
      tpUser: 0
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
    onEditRow(id) {
      this.$router.push(`/editLoc/${id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa localidade?',
        okButton: 'Confirmar',
      })
      if (ok) {
        localidadeService.delete(row.id_localidade);
        this.delId = id
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
      { headerName: 'ID', field: 'id', hide: true },
      { headerName: "GVE", field: "gve" },
      { headerName: "Municipio", field: "municipio", },
      { headerName: "Código", field: "codigo" },
      { headerName: "Nome", field: "nome" },
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
