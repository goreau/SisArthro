<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-5">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <label style="padding-right: 2rem;">Escolha a informação:</label>
              <div class="control">
                <select v-model="tpAux" class="input" @change="selTipo">
                  <option value="0">-- Selecione --</option>
                  <option v-for="tp in tipos" :key=tp.id :value=tp.id>
                    {{ tp.tipo }}
                  </option>
                </select>
              </div>

            </div>
            <div class="column" v-if="tpAux > 0">
              <button class="button is-primary is-outlined" :disabled="currentUser.role > 1" @click="newAux">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-plus-circle" />
                </span>
                <span>Novo</span>
              </button>
            </div>
          </header>
          <div class="card-content">
            <MyTable :logged-user="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
              :pagination="true" :buttons="['edit', 'delete']" :has-exports="true" @edit="onEditRow"
              :calc-height="false" @delete="onDeleteRow" :deleted-id="delId" :persistence-id="$options.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
  <Modal v-show="isModalVisible" @close="closeModal" @post="postContent" :msg="message">
    <template v-slot:header>
      {{ title }}
    </template>

    <template v-slot:body>
      <div class="columns" v-if="tpAux < 50">
        <div class="column">
          <div class="field">
            <label class="label">Codigo</label>
            <div class="control">
              <input id="valor" class="input" type="text" placeholder="Codigo" v-model="aux.codigo" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input id="valor" class="input" type="text" placeholder="Nome" v-model="aux.descricao" />
            </div>
          </div>
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column">
          <div class="field">
            <label class="label">Tipo</label>
            <div class="control">
              <select v-model="spp.tipo" class="input" @change="selSpp">
                <option value="0">-- Selecione --</option>
                <option v-for="tp in tpSpp" :key=tp.id_auxiliares :value=tp.id_auxiliares>
                  {{ tp.nome }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Codigo</label>
            <div class="control">
              <input id="valor" class="input" type="text" placeholder="Codigo" v-model="spp.codigo" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input id="valor" class="input" type="text" placeholder="Nome" v-model="spp.nome" />
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
import infeccaoService from "@/services/infeccao.service";


export default {
  name: "ListaAuxiliares",
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      delId: null,
      isModalVisible: false,
      tipos: [],
      tpSpp: [],
      tableName: 'auxiliares',
      aux: {
        id_auxiliares: 0,
        descricao: '',
        codigo: '',
        tipo: 0
      },
      spp: {
        id_spp_infeccao: 0,
        codigo: 0,
        tipo: 0,
        nome: '',
        ordem: 0
      },
      message: '',
      tpAux: 0,
      sppAux: 0,
      title: '',
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
    selTipo(e) {
      this.title = e.target.options[e.target.selectedIndex].text;
    },
    selSpp(e) {
      const tp = e.target.options[e.target.selectedIndex].value;
      const quantidadeExistente = this.dataTable.filter(item => item.tipo.toString() === tp).length;

      const proximoNumero = quantidadeExistente + 1;

      this.spp.codigo = proximoNumero.toString().padStart(3, '0');

      this.spp.ordem = proximoNumero;
    },
    newAux() {
      if (this.tpAux < 50) {
        this.aux.id_auxiliares = 0;
        this.aux.descricao = '';
        this.aux.codigo = '';
        this.aux.tipo = this.tpAux;
      } else {
        this.spp.codigo = '';
        this.spp.tipo = 0;
        this.spp.nome = '';
        this.loadSpp(this.tpAux == 51 ? 30 : 29);
      }
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    postContent() {
      document.getElementById("postVal").classList.add("is-loading");
      if (this.tpAux < 50) {
        if (this.aux.id_auxiliares > 0) {
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
      } else {
        infeccaoService.postSpp(this.spp)
          .then(
            (response) => {
              this.message = response.data.msg;
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

      this.loadItens(this.tpAux);
    },
    async onEditRow(id) {
      this.isModalVisible = true;
      if (this.selTipo < 50) {
        this.aux = this.dataTable.find(item => item.id === id);
      } else {
        this.spp = this.dataTable.find(item => item.id === id);
        this.loadSpp(this.tpAux == 51 ? 30 : 29);
      }
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa informação?',
        okButton: 'Confirmar',
      })
      if (ok) {
        if (this.tpAux < 50) {
          capturaService.deleteAux(id);
        } else {
          infeccaoService.deleteSpp(id);
        }

        this.delId = id
      }
    },
    async loadSpp(tp) {
      capturaService.getAuxiliares(tp)
        .then((res) => {
          this.tpSpp = res.data;
        })
        .catch((err) => {
          this.tpSpp = [];
        });
    },
    async loadItens(value) {
      if (value < 50) {
        this.columns = [
          { headername: "Código", field: "codigo" },
          { headername: "Nome", field: "descricao" },
        ];

        capturaService.getAuxiliaresEd(value)
          .then((response) => {
            this.dataTable = response.data;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      } else {
        this.columns = [
          { headername: "Código", field: "codigo" },
          { headername: "Nome", field: "nome" },
          { headername: "Tipo", field: "fant_tipo" }
        ];

        infeccaoService.getSppEd(value)
          .then((response) => {
            this.dataTable = response.data;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }
    }
  },
  mounted() {
    this.tipos = [
      { id: 1, tipo: 'Zona (Captura)' },
      { id: 2, tipo: 'Agravo (Captura)' },
      { id: 3, tipo: 'Atividade (Captura)' },
      { id: 4, tipo: 'Método (Captura)' },
      { id: 5, tipo: 'Ambiente (Captura)' },
      { id: 6, tipo: 'Local de Captura (Captura)' },
      { id: 7, tipo: 'Situação do Imóvel (Caracterização)' },
      { id: 8, tipo: 'Tipo de imóvel (Caracterização)' },
      { id: 10, tipo: 'Cor (Animais)' },
      { id: 11, tipo: 'Situação do Imóvel (Animal)' },
      { id: 15, tipo: 'Situação do Imóvel (Inquérito)' },
      { id: 16, tipo: 'Resultado (DPP e Elisa)' },
      { id: 17, tipo: 'Situação Encoleiramento (Inquérito)' },
      { id: 18, tipo: 'Desfecho (Inquérito/Invest. Foco)' },
      { id: 19, tipo: 'Resultado Final (Inquérito)' },
      { id: 20, tipo: 'Situação do Imóvel (Invest. Foco)' },
      { id: 21, tipo: 'Sinais e Sintomas (Invest. Foco)' },
      { id: 22, tipo: 'Tipo Amostra (Invest. Foco)' },
      { id: 23, tipo: 'Resultado Parasitológico (Invest. Foco)' },
      { id: 51, tipo: 'Espécies (Hábito Alimentar)' },
      { id: 52, tipo: 'Espécies (Infec. Natural)' },
    ];

    this.id_user = this.currentUser.id;
    this.tpUser = this.currentUser.role;


  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  watch: {
    tpAux(value) {
      this.isLoading = true;

      this.loadItens(value);
    }
  }
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
