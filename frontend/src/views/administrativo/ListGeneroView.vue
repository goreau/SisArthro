<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-5">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Gêneros Cadastrados</p>
            <button class="button is-primary is-outlined" :disabled="currentUser.role > 1" @click="newGen">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="['edit', 'delete']" :has-exports="true" @edit="onEditRow" :calcHeight="false"
              @delete="onDeleteRow" :deletedId="delId" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
  <Modal v-show="isModalVisible" @close="closeModal" @post="postContent" :msg="message">
    <template v-slot:header>
      Gênero
    </template>

    <template v-slot:body>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input id="valor" class="input" type="text" placeholder="Nome" v-model="genero.nome" />
            </div>
          </div>
        </div>
      </div>
    </template>
    {{ genero }}
    <template v-slot:footer>
      {{ message }}
    </template>
  </Modal>
</template>

<script>
import especieService from "@/services/especie.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Modal from '@/components/forms/Modal.vue';

export default {
  name: "ListaLocalidades",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      delId: null,
      isModalVisible: false,
      tableName: 'genero',
      genero: {
        id_genero: 0,
        nome: '',
        tipo: 1
      },
      message: '',
      id_user: 0,
      tpUser: 0
    };
  },
  components: {
    MyTable,
    Loader,
    ConfirmDialog,
    Modal,
  },
  methods: {
    newGen() {
      this.isModalVisible = true;
      this.genero.id_genero = 0;
      this.genero.nome = '';
      this.genero.tipo = 1;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    postContent() {
      // alert('funfa ' + this.genero.nome);
      document.getElementById("postVal").classList.add("is-loading");
      if (this.genero.id_genero > 0) {
        especieService.updateGen(this.genero)
          .then(
            (response) => {
              this.message = "Gênero alterado.";
              setTimeout(() => (this.message = ''), 3000);
            },
            (error) => {
              this.message = error;
              setTimeout(() => (this.message = ''), 3000);
            }
          )
          .finally(() => {
            document.getElementById("postVal").classList.remove("is-loading");
          });
      } else {
        especieService.createGen(this.genero)
          .then(
            (response) => {
              this.message = "Gênero cadastrado.";
              setTimeout(() => (this.message = ''), 3000);
            },
            (error) => {
              this.message = error;
              setTimeout(() => (this.message = ''), 3000);
            }
          )
          .finally(() => {
            document.getElementById("postVal").classList.remove("is-loading");
          });
      }
    },
    async onEditRow(id) {
      this.isModalVisible = true;
      this.genero = this.dataTable.find(item => item.id === id);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir esse gênero?',
        okButton: 'Confirmar',
      })
      if (ok) {
        especieService.deleteGen(row.id_genero);
        this.delId = id
      }
    }
  },
  mounted() {
    this.id_user = this.currentUser.id;
    this.tpUser = this.currentUser.role;

    this.isLoading = true;
    especieService.getGeneros({})
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { headerName: "Nome", field: "nome" },
      { headerName: "Tipo", field: "tipo" },
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
