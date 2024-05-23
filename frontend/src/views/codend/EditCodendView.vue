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
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-4">
                <label class="label">Município</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="municipio"
                    readonly
                  />
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
                          :selected="reg.id_area === codend.id_area"
                        >
                          {{ reg.codigo }}
                        </option>
                      </select>
                      <span class="is-error" v-if="v$.codend.id_area.$error">
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
                          :selected="reg.id_quarteirao === codend.id_quarteirao"
                        >
                          {{ reg.numero }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-6">
                  <label class="label">Logradouro</label>
                  <div class="control">
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
            <footerCard @submit="edit" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import codendService from "@/services/codend.service";
import territorioService from "@/services/territorio.service";
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
      area: [],
      quarteirao: [],
      codend: {
        id_codend: 0,
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
    footerCard
  },
  methods: {
    loadData() {
      this.isLoading = true;

      codendService.getCodend(this.codend.id_codend).then(
        async (response) => {
          let data = response.data[0];
          this.codend.id_municipio = data.id_municipio;
          await this.getAreas();
          await this.getQuarteirao(data.id_area);
          this.codend.id_area = data.id_area;
          this.codend.fant_area = data.fant_area;
          this.codend.id_quarteirao = data.id_quarteirao;
          this.codend.fant_quart = data.fant_quart;
          this.codend.logradouro = data.logradouro;
          this.codend.numero = data.numero;
          this.codend.complemento = data.complemento;
          this.municipio = data.municipio;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.response.data ||
            error.message ||
            error.toString();
          this.showMessage = true;
          this.type = "alert";
          this.caption = "CodEnd";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    edit() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
      
        codendService.update(this.codend).then(
          (response) => {
            this.showMessage = true;
            this.message = "Endereço alterado.";
            this.type = "success";
            this.caption = "CodEnd";
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
                        this.caption = "Caracterização";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Localidade";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    getAreas(){
      territorioService.getAreas(this.codend.id_municipio)
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
    this.loadData();
  },
  created() {
    this.codend.id_codend = this.$route.params.id;
  },
  watch: {
    'codend.id_area'(value) {
      if (this.area.length > 0) {
        let fant_a = this.area.filter(item => item.id_area === value);
        this.codend.fant_area = fant_a[0].codigo;
        this.getQuarteirao(value);
      } 
    },
    'codend.id_quarteirao'(value) {
      if (this.quarteirao.length > 0) {
        let fant_q = this.quarteirao.filter(item => item.id_quarteirao === value);
        this.codend.fant_quart = fant_q[0].numero;
      }
    }
  },
};
</script>

<style scoped></style>
