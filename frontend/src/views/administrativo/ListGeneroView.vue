<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
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
  <Modal
    v-show="isModalVisible"
    @close="closeModal"
    @post="postContent"
    :msg="message"
  >
    <template v-slot:header>
      Gênero
    </template>

    <template v-slot:body>
      <div class="columns">
        <div class="column">
          <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input
                    id="valor"
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="genero.nome"
                  />
                </div>
              </div>
        </div>
      </div>
    </template>

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
      myspan: null,
      myspan2: null,
      isModalVisible: false,
      tableName: 'genero',
      genero: {
        id_genero: 0,
        nome: '',
        tipo: 1
      },
      message: '',
      id_user: 0,
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
      if (this.genero.id_genero > 0){
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
    editGen(row) {
      this.isModalVisible = true;
      this.genero = row;
    },
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

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
      { title: "Nome", field: "nome", type: "string" },
      { title: "Tipo", field: "tipo", type: "string" },
      {
        title: "Ações",
        formatter: (cell, formatterParams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement("button");
          btEdit.type = "button";
          btEdit.title = "Editar";
          btEdit.disabled = this.currentUser.role > 1;
          btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
          btEdit.classList.add("button", "is-primary", "is-outlined");
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener("click", () => {
            this.editGen(row);
          });

          /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

          const btDel = document.createElement("button");
          btDel.type = "button";
          btDel.title = "Excluir";
          btDel.disabled = this.currentUser.role > 1;
          btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
          btDel.classList.add("button", "is-danger", "is-outlined");
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener("click", async () => {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir esse gênero?',
                okButton: 'Confirmar',
            })
            if (ok) {
              especieService.deleteGen(row.id_genero);
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
