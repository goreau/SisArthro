<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
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
            <div class="columns">
              <div class="field column is-3 is-offset-3">
                <label class="label">Município</label>
                <div class="control">
                  <CmbListaMun :tabela="tableName" :id_prop="currentUser.id" :sel="filtMun"
                    @selMun="filtMun = $event" />
                </div>
              </div>
              <div class="field column is-1 is-offset-2">
                <label class="label">&nbsp;</label>
                <div class="control">
                  <button class="button is-link is-fullwidth" @click="loadData">
                    <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                    Carregar
                  </button>
                </div>
              </div>
            </div>
            <section v-if="hasData">
              <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
                :pagination="true" :buttons="['edit', 'delete', 'caracteriza', 'animais']" :has-exports="true"
                @edit="onEditRow" :calcHeight="false" @delete="onDeleteRow" @caracteriza="onCaracteriza"
                @animais="onAnimais" :deletedId="delId" />
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import codendService from "@/services/codend.service";
import MyTable from "@/components/forms/MyTable.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import CmbListaMun from "@/components/forms/CmbListaMun.vue";

export default {
  name: "ListaEndereços",
  data() {
    return {
      filtMun: 0,
      dataTable: [],
      columns: [],
      tableName: 'codend',
      hasData: false,
      id_user: 0,
      quart: 0,
      delId: null
    };
  },
  components: {
    MyTable,
    ConfirmDialog,
    CmbListaMun,
  },
  methods: {
    newEnd() {
      this.$router.push("/codend");
    },
    onEditRow(id) {
      // this.$router.push(`/editEnd/${id}`);
      this.$router.push(`/editCod/${id}`);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir esse endereço?',
        okButton: 'Confirmar',
      })
      if (ok) {
        codendService.delete(id);
        this.delId = id;
        // this.$router.replace("/codends");
      }
    },
    onCaracteriza(id) {
      this.$router.push(`/caracteriza/${id}/0`);
    },
    onAnimais(id) {
      this.$router.push(`/editCaninoCodend/${id}`);
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
    loadData(filter) {
      localStorage.setItem('last_filtMun', this.filtMun);
      codendService.getCodends(this.filtMun, filter)
        .then((response) => {
          this.dataTable = response.data;
          localStorage.setItem('codendMun', this.filtMun);
          this.hasData = true;//this.dataTable.length > 0
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });

    },
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.columns = [
      { headerName: 'ID', field: 'id', hide: true },
      { headerName: "Municipio", field: "municipio" },
      { headerName: "Quarteirao", field: "quarteirao" },
      { headerName: "Código", field: "codigo" },
      { headerName: "Endereço", field: "endereco" },
      { headerName: "Localidade", field: "localidade" },
      { headerName: "Responsável", field: "owner" },
      { headerName: 'Prop', field: 'owner_id', hide: true },
    ];

    if (this.$route.params.quart) {
      var cd = this.$route.params.quart;
      codendService.getCodend(cd)
        .then(
          async (response) => {
            let data = response.data[0];
            this.filtMun = data.id_municipio;
            //data.id_quarteirao
            this.loadData(null);
          },
          (error) => {
            console.log(error);
            this.quart = 0;
          }
        );
    } else {

    }

  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  created() {
    const savedMun = localStorage.getItem('last_filtMun');
    if (savedMun) {
      this.filtMun = savedMun;
      this.loadData(null)
    }
  },
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
