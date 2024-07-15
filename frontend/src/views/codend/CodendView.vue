<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-four-fifths">
        <Loader v-if="isLoading" />
        <Message
          v-if="showMessage"
          @do-close="closeMessage"
          :msg="message"
          :type="type"
          :caption="caption"
        />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Cadastro de Endereços - CodEnd</p>
            <span class="butaos" v-if="recent > 0">
              <button class="button is-info is-outlined" title="Caracterização" @click="carac">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-image" />
                </span>
              </button>
              <button class="button is-success is-outlined" title="Animal" @click="animal">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-dog" />
                </span>
              </button>
            </span>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-4">
                <label class="label">Município</label>
                <div class="control">
                  <CmbMunicipio
                      :id_prop="currentUser.id"
                      @selMun="codend.id_municipio = $event"
                      :errclass="{ 'is-danger': v$.codend.id_municipio.$error }"
                    />
                    <span class="is-error" v-if="v$.codend.id_municipio.$error">
                      {{ v$.codend.id_municipio.$errors[0].$message }}
                    </span>
                </div>
              </div>
                <div class="field column is-4">
                  <label class="label">Área</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="codend.id_area" class="input" :class="{ 'is-danger': v$.codend.id_area.$error }">
                        <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in area"
                          :key="reg.id_area"
                          :value="reg.id_area"
                        >
                          {{ reg.codigo }}
                        </option>
                      </select><span class="is-error" v-if="v$.codend.id_area.$error">
                      {{ v$.codend.id_area.$errors[0].$message }}
                    </span>
                    </div>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Quadra</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="codend.id_quarteirao" class="input" :class="{ 'is-danger': v$.codend.id_quarteirao.$error }">
                        <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in quarteirao"
                          :key="reg.id_quarteirao"
                          :value="reg.id_quarteirao"
                        >
                          {{ reg.numero }}
                        </option>
                      </select>
                      <span class="is-error" v-if="v$.codend.id_quarteirao.$error">
                      {{ v$.codend.id_quarteirao.$errors[0].$message }}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-6">
                  <label class="label">Logradouro</label>
                  <div class="control has-icons">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.logradouro"
                      :class="{ 'is-danger': v$.codend.logradouro.$error }"
                    />
                    <span class="is-error" v-if="v$.codend.logradouro.$error">
                    {{ v$.codend.logradouro.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Número</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.numero"
                      :class="{ 'is-danger': v$.codend.numero.$error }"
                    />
                    <span class="is-error" v-if="v$.codend.numero.$error">
                      {{ v$.codend.numero.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Complemento</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.complemento"
                      :class="{ 'is-danger': v$.codend.complemento.$error }"
                    />
                    <span class="is-error" v-if="v$.codend.complemento.$error">
                      {{ v$.codend.complemento.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
          <hr>
          <div class="card-content">
            <div class="columns">
              <div class="column is-6 is-offset-3">
                <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :exports="false" :tableName="tableName" />
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import codendService from "@/services/codend.service";
import territorioService from "@/services/territorio.service";
import MyTable from "@/components/forms/MyTable.vue";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
  maxLength$
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      dataTable: [],
      columns: [],
      area: [],
      quarteirao: [],
      codends: [],
      recent: 0,
      tableName: 'codendLst',
      codend: {
        id_municipio: 0,
        id_area: 0,
        fant_area: '',
        id_quarteirao: 0,
        fant_quart: '',
        logradouro: '',
        numero: '',
        complemento: '',
        id_usuario: 0,
      },
      v$: useValidate(),
      municipio:'',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Salvar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
      }
    };
  },
  validations() {
    return {
      codend: {
        logradouro: {
          required$,
          minLength: minLength$(3),
          maxLength: maxLength$(100)
        },
        numero: {
          required$,
          maxLength: maxLength$(10)
        },
        complemento: {
          maxLength: maxLength$(20)
        },
        id_municipio: {
          minValue: combo$(1)
        },
        id_area: {
          minValue: combo$(1)
        },
        id_quarteirao: {
          minValue: combo$(1)
        }
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbMunicipio,
    footerCard,
    MyTable,
  },
  methods: {
    carac(){
      this.$router.push(`/caracteriza/${this.recent}/0`);
    },
    animal(){
      this.$router.push(`/editCaninoCodend/${this.recent}`);
    },
    lista(){
      codendService.getListCodendsByQuadra(this.codend.id_quarteirao)
            .then((response) => {
                this.dataTable = response.data;
            })
            .catch((err) => {
                console.log(err);
            })
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        codendService.create(this.codend).then(
          (response) => {
            this.showMessage = true;
            this.message = "Endereço cadastrado.";
            this.type = "success";
            this.caption = "CodEnd";
            this.recent = response.data.master.id_codend;
            this.lista();
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "CodEnd";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
        .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Codend";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "CodEnd";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    getAreas(mun){
      territorioService.getAreas(mun)
        .then((res) => {
          console.log(res);
          this.area = res.data.area;
        })
        .catch((err) => {
          this.area = [];
        })
    },
    getQuarteirao(area){
      territorioService.getQuarteiroes(area)
      .then((res) => {
        this.quarteirao = res.data.quarteirao;
      })
      .catch((err) => {
        this.quarteirao = [];
      })
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.codend.id_usuario = cUser.id;
    }
    
    this.columns = [
      { title: "CodEnd", field: "codigo", type: "string" },
      { title: "Endereço", field: "endereco", type: "string" },
    ]
  },
  watch: {
    'codend.id_municipio'(value) {
      this.getAreas(value);
    },
    'codend.id_area'(value) {
      let fant_a = this.area.filter(item => item.id_area === value);
      this.codend.fant_area = fant_a[0].codigo;
      this.getQuarteirao(value);
    },
    'codend.id_quarteirao'(value) {
      let fant_q = this.quarteirao.filter(item => item.id_quarteirao === value);
      this.codend.fant_quart = fant_q[0].numero;
    }
  },
};
</script>

<style scoped>
.butaos{
  padding-right: 1rem;
}
.butaos .button{
  margin-right: 1rem;
}
</style>
