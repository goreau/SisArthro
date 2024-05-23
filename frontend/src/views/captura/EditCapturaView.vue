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
                    <input type="date" id="dtCapt">
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
                      :tipo="1" :sel="captura.zona"
                      @selValue="captura.zona = $event"
                      :errclass="{ 'is-danger': v$.captura.zona.$error }"
                    />
                    <span class="is-error" v-if="v$.captura.zona.$error">
                    {{ v$.captura.zona.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-6">
                  <label class="label">CodSis - Município</label>
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
                  <div class="control has-icons-left has-icons-right">
                    <div class="control">
                    <CmbLocalidade
                      :id_mun="captura.id_municipio" :sel="captura.cod_loc"
                      @selLoc="captura.cod_loc = $event"
                    />
                  </div>
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-5">
                  <label class="label">Agravo</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="2" :sel="captura.agravo"
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
                      :tipo="3" :sel="captura.atividade"
                      @selValue="captura.atividade = $event"
                      :errclass="{ 'is-danger': v$.captura.atividade.$error }"
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
import footerCard from '@/components/forms/FooterCard.vue'
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import capturaService from "@/services/captura.service";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  requiredIf$,
  maxLength$
} from "../../components/forms/validators.js";


export default {
  components: {
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
        id_captura: 0,
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
      municipio:'',
      edt_date: '',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
        strSubmit:'Salvar',
        strCancel: 'Cancelar',
        strAux:'Capturas',
        aux: true
      }
    };
  },
  validations() {
    return {
      captura: {
        dt_captura: {required$,},
        execucao: {required$,},
        exec_3: {requiredIf: requiredIf$(this.captura.execucao == 3)},
        zona: {minValue: combo$(1),},
        agravo: {minValue: combo$(1),},
        atividade: {minValue: combo$(1),},
        equipe: {required$, maxLength: maxLength$(50)},
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    startCalendar(){
      var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.captura.dt_captura,
        showHeader: false,
        color: "info",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
        maxDate: new Date(),
      };

      var calini = bulmaCalendar.attach('#dtCapt', options);

      const input = document.querySelector('.datetimepicker-dummy-input');
      input.removeAttribute('readonly');
      input.setAttribute('value',"__/__/____");
      input.setAttribute('data-mask',"__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', ()=>{
        this.captura.dt_captura = moment(input.value).format('YYYY-MM-DD');
      })

      const element = document.querySelector('#dtCapt');
      if (element) {
        element.bulmaCalendar.on('select', datepicker => {
          this.captura.dt_captura = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }

    },
    setDate($event){
      if($event){
        this.captura.dt_captura = moment(String($event)).format('YYYY-MM-DD');
      }
    },
    details(){
      this.$router.push("/captura_dets/"+this.captura.id_captura);
    },
    edit() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        capturaService.edit(this.captura).then(
          (response) => {
            console.log(response);

            this.showMessage = true;
            this.message = "Captura alterada!";
            this.type = "success";
            this.caption = "Captura";
            setTimeout(() => (this.showMessage = false), 3000);
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Captura";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        })
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

      capturaService.getCaptura(this.captura.id_captura).then(
        (response) => {
          let data = response.data;
          this.captura.id_municipio = data.id_municipio;         
          this.captura.dt_captura = data.dt_captura;
          this.captura.execucao = data.execucao;
          this.captura.exec_3 = data.exec_3;
          this.captura.zona = data.zona;
          this.captura.cod_loc = data.cod_loc;
          this.captura.quadrante = data.quadrante;
          this.captura.agravo = data.agravo;
          this.captura.atividade = data.atividade;
          this.captura.equipe = data.equipe;
          this.captura.obs = data.obs;
          this.captura.codigo = data.codigo;
          this.edt_date = moment(String(data.dt_captura)).format('DD/MM/YYYY');
          this.municipio = data.municipio;

          this.startCalendar();
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
          this.caption = "Usuário";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    applyDataMask(field) {
      var mask = field.dataset.mask.split('');

      // For now, this just strips everything that's not a number
      function stripMask(maskedData) {
        function isDigit(char) {
          return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
      }

      // Replace `_` characters with characters from `data`
      function applyMask(data) {
        return mask.map(function (char) {
          if (char != '_') return char;
          if (data.length == 0) return char;
          return data.shift();
        }).join('')
      }

      function reapplyMask(data) {
        return applyMask(stripMask(data));
      }

      function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
      }

      field.addEventListener('click', changed)
      field.addEventListener('keyup', changed)
    }
  },
  created() {
    this.captura.id_captura = this.$route.params.id;
    this.loadData();
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
