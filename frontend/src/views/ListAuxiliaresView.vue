<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
              <div class="card-header-title">
                <label style="padding-right: 2rem;">Escolha a informação:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="1" v-model="tpAux" name="answer">
                    Zona
                  </label>
                  <label class="radio">
                    <input type="radio" value="2" v-model="tpAux" name="answer">
                    Agravo
                  </label>
                  <label class="radio">
                    <input type="radio" value="3" v-model="tpAux" name="answer">
                    Atividade
                  </label>
                  <label class="radio">
                    <input type="radio" value="4" v-model="tpAux" name="answer">
                    Método
                  </label>
                  <label class="radio">
                    <input type="radio" value="5" v-model="tpAux" name="answer">
                    Ambiente
                  </label>
                  <label class="radio">
                    <input type="radio" value="6" v-model="tpAux" name="answer">
                    Local de Captura
                  </label>
                </div>
              </div>
              <div class="column" v-if="tpAux > 0">
                <button class="button is-primary is-outlined" :disabled="id_user != 2" @click="newAux">
                  <span class="icon">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                  </span>
                  <span>Novo</span>
                </button>
              </div>
          </header>
          <div class="card-content" >
            <MyTable :tableData="dataTable" :columns="columns" :is-filtered="true"/>
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
      {{ title }}
    </template>

    <template v-slot:body>
      <div class="columns">
        <div class="column">
          <div class="field">
                <label class="label">Codigo</label>
                <div class="control">
                  <input
                    id="valor"
                    class="input"
                    type="text"
                    placeholder="Codigo"
                    v-model="aux.codigo"
                  />
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
                    v-model="aux.descricao"
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
import capturaService from "@/services/captura.service";
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
      aux: {
        id_auxiliares: 0,
        descricao: '',
        codigo: '',
        tipo: 0
      },
      message: '',
      tpAux: 0,
      title: '',
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
    newAux() {
      this.isModalVisible = true;
      this.aux.id_auxiliares = 0;
      this.aux.descricao = '';
      this.aux.codigo = '';
      this.aux.tipo = this.tpAux;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    postContent() {
      document.getElementById("postVal").classList.add("is-loading");
      if (this.aux.id_auxiliares > 0){
        capturaService.updateAux(this.aux)
          .then(
            (response) => {
              this.message = "Informação alterada.";
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
        capturaService.createAux(this.aux)
          .then(
            (response) => {
              this.message = "Informação cadastrada.";
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
    editAux(row) {
      this.isModalVisible = true;
      this.aux = row;
    },
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.columns = [
      { title: "Código", field: "codigo", type: "string" },
      { title: "Nome", field: "descricao", type: "string" },
      {
        title: "Ações",
        formatter: (cell, formatterParams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement("button");
          btEdit.type = "button";
          btEdit.title = "Editar";
          btEdit.disabled = this.id_user != 2;
          btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
          btEdit.classList.add("button", "is-primary", "is-outlined");
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener("click", () => {
            this.editAux(row);
          });

          /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

          const btDel = document.createElement("button");
          btDel.type = "button";
          btDel.title = "Excluir";
          btDel.disabled = this.id_user != 2;
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
              capturaService.deleteAux(row.id_auxiliares);
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
  watch: {
    tpAux(value){
      this.isLoading = true;
      this.title = document.querySelector('input[name = "answer"]:checked').labels[0].innerText;

      capturaService.getAuxiliaresEd(value)
        .then((response) => {
          this.dataTable = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
      }
  }
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
