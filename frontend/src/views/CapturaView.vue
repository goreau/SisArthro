<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10 offset-1">
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
            <p class="card-header-title is-centered">Captura</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-3">
                  <label class="label">Número</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Preenc. Automático"
                      v-model="captura.codigo"
                      readonly
                      disabled
                    />
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Data</label>
                  <div class="control">
                    <datepicker
                      placeholder="Data da atividade"
                      :config="{ dateFormat: 'd/m/Y', static: true, onChange: setDate }"
                      :class="{ 'is-danger': v$.captura.dt_captura.$error }"
                    />
                  </div>
                  <span class="is-error" v-if="v$.captura.dt_captura.$error">
                    {{ v$.captura.dt_captura.$errors[0].$message }}
                  </span>
                </div>
                <div class="field column is-3">
                  <label class="label">Execução</label>
                  <div class="control has-icons-left has-icons-right">
                    <label class="radio">
                      <input
                        type="radio"
                        name="execucao"
                        value="1"
                        v-model="captura.execucao"
                        :disabled="currentUser.role == 3"
                      />
                      1 - IP
                    </label>
                    <label class="radio">
                      <input
                        type="radio"
                        name="execucao"
                        value="2"
                        v-model="captura.execucao"
                      />
                      2 - Município
                    </label>
                    <label class="radio">
                      <input
                        type="radio"
                        name="execucao"
                        value="3"
                        v-model="captura.execucao"
                      />
                      3 -
                    </label>
                  </div>
                  <span class="is-error" v-if="v$.captura.execucao.$error">
                    {{ v$.captura.execucao.$errors[0].$message }}
                  </span>
                </div>
                <div class="field column is-3">
                  <label class="label">&nbsp;</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="captura.exec_3"
                      :disabled="captura.execucao < 3"
                      :class="{ 'is-danger': v$.captura.exec_3.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.exec_3.$error">
                    {{ v$.captura.exec_3.$errors[0].$message }}
                  </span>
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-3">
                  <label class="label">Zona</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="1"
                      @selValue="captura.zona = $event"
                      :errclass="{ 'is-danger': v$.captura.zona.$error }"
                    />
                  </div>
                  <span class="is-error" v-if="v$.captura.zona.$error">
                    {{ v$.captura.zona.$errors[0].$message }}
                  </span>
                </div>
                <div class="field column is-6">
                  <label class="label">CodSis - Município</label>
                  <div class="control">
                    <CmbMunicipio
                      :id_prop="currentUser.id"
                      @selMun="captura.id_municipio = $event"
                      :errclass="{ 'is-danger': v$.captura.id_municipio.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.id_municipio.$error">
                    {{ v$.captura.id_municipio.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Quadrante</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="captura.quadrante"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-6">
                  <label class="label">CodLoc - Localidade</label>
                    <div class="control">
                    <CmbLocalidade
                      :id_mun="captura.id_municipio"
                      @selLoc="captura.cod_loc = $event"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-5">
                  <label class="label">Agravo</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="2"
                      @selValue="captura.agravo = $event"
                      :errclass="{ 'is-danger': v$.captura.agravo.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.agravo.$error">
                    {{ v$.captura.agravo.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-5">
                  <label class="label">Atividade</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="3"
                      @selValue="captura.atividade = $event"
                      :errclass="{ 'is-danger': v$.captura.id_municipio.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.atividade.$error">
                    {{ v$.captura.atividade.$errors[0].$message }}
                  </span>
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-4">
                  <label class="label">Equipe</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nome da localidade"
                      v-model="captura.equipe"
                      :class="{ 'is-danger': v$.captura.equipe.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.equipe.$error">
                    {{ v$.captura.equipe.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-7">
                  <label class="label">Observação</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Nome da localidade"
                      v-model="captura.obs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import Datepicker from "vue-bulma-datepicker";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import capturaService from "@/services/captura.service";
import moment from 'moment';
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  requiredIf$,
  maxLength$,
} from "../components/forms/validators.js";


export default {
  components: {
    Datepicker,
    Loader,
    Message,
    CmbAuxiliares,
    CmbMunicipio,
    CmbLocalidade,
    footerCard
  },
  data() {
    return {
      atividades: [],
      agravos: [], 
      captura: {
        codigo: "",
        dt_captura: "",
        execucao: 0,
        exec_3: '',
        zona: 0,
        id_municipio: 0,
        cod_loc: "",
        quadrante: 0,
        agravo: 0,
        atividade: 0,
        equipe: '',
        obs: '',
        id_usuario: 0,
      },
      v$: useValidate(),
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
      captura: {
        dt_captura: {required$,},
        execucao: {required$,},
        exec_3: {requiredIf: requiredIf$(this.captura.execucao == 3), maxLength: maxLength$(20) },
        zona: {minValue: combo$(1),},
        id_municipio: {minValue: combo$(1),},
        agravo: {minValue: combo$(1),},
        atividade: {minValue: combo$(1),},
        equipe: {required$, maxLength: maxLength$(20)},
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    setDate($event){
      if($event){
        this.captura.dt_captura = moment(String($event)).format('YYYY-MM-DD');
      }
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        capturaService.create(this.captura).then(
          (response) => {
            this.showMessage = true;
            this.message = "Captura inserida com numero: " + response.data.master.codigo;
            this.type = "success";
            this.caption = "Captura";
            setTimeout(() => {
              this.showMessage = false; 
              this.$router.push("/captura_det/"+response.data.master.id_captura)}, 5000);
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Captura";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Captura";
        setTimeout(() => (this.showMessage = false), 3000);
      }  
    },
    loadData() {
      this.isLoading = true;

      this.isLoading = false;
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.captura.id_usuario = cUser.id;
    }
  },
};
</script>

<style scoped>

</style>
