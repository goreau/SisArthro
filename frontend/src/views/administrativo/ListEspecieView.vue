<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Espécies Cadastradas</p>
            <button class="button is-primary is-outlined" :disabled="currentUser.role > 1" @click="newSpp">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true"/>
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
      Espécie
    </template>

    <template v-slot:body>
      <div class="columns">
        <div class="column">
          <div class="field">
                <label class="label">Gênero</label>
                <div class="control">
                  <select v-model="especie.id_genero" class="input">
                    <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in generos"
                          :key="reg.id_genero"
                          :value="reg.id_genero"
                        >
                          {{ reg.nome }}
                        </option> 
                  </select>
                </div>
              </div>
        </div>
        <div class="column">
          <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input
                    id="valor"
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="especie.nome"
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
  name: "ListaEspécies",
  data() {
    return {
      dataTable: [],
      generos: [],
      isLoading: false,
      columns: [],
      myspan: null,
      myspan2: null,
      isModalVisible: false,
      especie: {
        id_especie: 0,
        nome: '',
        id_genero: 0
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
    newSpp() {
      this.isModalVisible = true;
      this.especie.id_especie = 0;
      this.especie.nome = '';
      this.especie.id_genero = 0;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    postContent() {
      document.getElementById("postVal").classList.add("is-loading");
      if (this.especie.id_especie > 0){
        especieService.updateSpp(this.especie)
          .then(
            (response) => {
              this.message = "Espécie alterada.";
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
        especieService.createSpp(this.especie)
          .then(
            (response) => {
              this.message = "Espécie cadastrada.";
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
    editSpp(row) {
      this.isModalVisible = true;
      this.especie = row;
    },
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.isLoading = true;
    especieService.getEspecies({})
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Genero", field: "genero", type: "string" },
      { title: "Nome", field: "nome", type: "string" },
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
            this.editSpp(row);
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
                message: 'Deseja mesmo excluir essa espécie?',
                okButton: 'Confirmar',
            })
            if (ok) {
              especieService.deleteSpp(row.id_especie);
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
  created() {
    especieService.getGeneros({})
      .then((response) => {
        this.generos = response.data;
      })
      .catch((err) => {
        this.generos = [];
      })
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
