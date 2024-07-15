<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10 offset-1">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Cães e Gatos Domiciliados</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-4">
                  <label class="label">Município</label>
                  <div class="control">
                    <CmbMunicipio :id_prop="currentUser.id" @selMun="canino.id_municipio = $event"
                      :errclass="{ 'is-danger': v$.canino.id_municipio.$error }" :sel="canino.id_municipio" />
                    <span class="is-error" v-if="v$.canino.id_municipio.$error">
                      {{ v$.canino.id_municipio.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Área</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="canino.id_area" class="input" :class="{ 'is-danger': v$.canino.id_area.$error }">
                        <option value="0">-- Selecione --</option>
                        <option v-for="reg in area" :key="reg.id_area" :value="reg.id_area">
                          {{ reg.codigo }}
                        </option>
                      </select><span class="is-error" v-if="v$.canino.id_area.$error">
                        {{ v$.canino.id_area.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Quadra</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="canino.id_quarteirao" class="input"
                        :class="{ 'is-danger': v$.canino.id_quarteirao.$error }">
                        <option value="0">-- Selecione --</option>
                        <option v-for="reg in quarteirao" :key="reg.id_quarteirao" :value="reg.id_quarteirao">
                          {{ reg.numero }}
                        </option>
                      </select>
                      <span class="is-error" v-if="v$.canino.id_quarteirao.$error">
                        {{ v$.canino.id_quarteirao.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-4">
                  <label class="label">Cod End</label>
                  <div class="select">
                    <select v-model="canino.id_codend" class="input">
                      <option value="0">-- Selecione --</option>
                      <option v-for="reg in codends" :key="reg.id_codend" :value="reg.id_codend">
                        {{ reg.codigo }}
                      </option>
                    </select>
                  </div>
                  <span class="is-error" v-if="v$.canino.id_codend.$error">
                    {{ v$.canino.id_codend.$errors[0].$message }}
                  </span>
                </div>
                <div class="field column is-2">
                  <label class="label">Latitude</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="° decimais" v-model="canino.latitude" name="latitude"
                      :class="{ 'is-danger': v$.canino.latitude.$error }" @blur="changeComma($event)" />
                    <span class="is-error" v-if="v$.canino.latitude.$error">
                      {{ v$.canino.latitude.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Longitude</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="° decimais" v-model="canino.longitude" name="longitude"
                      :class="{ 'is-danger': v$.canino.longitude.$error }" @blur="changeComma($event)" />
                    <span class="is-error" v-if="v$.canino.longitude.$error">
                      {{ v$.canino.longitude.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Situação</label>
                  <div class="control">
                    <CmbAuxiliares :tipo="11" @selValue="canino.id_situacao = $event" :errclass="{
                      'is-danger': v$.canino.id_situacao.$error,
                    }" :sel="canino.id_situacao"/>
                    <span class="is-error" v-if="v$.canino.id_situacao.$error">
                      {{ v$.canino.id_situacao.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-6 is-offset-2">
                  <label class="label">Proprietário</label>
                  <div class="control has-icons">
                    <input class="input" type="text" placeholder="Nome" v-model="canino.proprietario"
                      :class="{ 'is-danger': v$.canino.proprietario.$error }" />
                    <span class="is-error" v-if="v$.canino.proprietario.$error">
                      {{ v$.canino.proprietario.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Telefone</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Nº Telefone" v-model="canino.telefone"
                      :class="{ 'is-danger': v$.canino.telefone.$error }" />
                    <span class="is-error" v-if="v$.canino.telefone.$error">
                      {{ v$.canino.telefone.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-3 is-offset-3">
                  <label class="label">Data</label>
                  <div class="control">
                    <input type="text" id="dtCanino">
                  </div>
                  <span class="is-error" v-if="v$.canino.dt_canino.$error">
                    {{ v$.canino.dt_canino.$errors[0].$message }}
                  </span>
                </div>
                <div class="field column is-4">
                  <label class="label">Responsável</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="Nome " v-model="canino.responsavel"
                      :class="{ 'is-danger': v$.canino.responsavel.$error }" />
                    <span class="is-error" v-if="v$.canino.responsavel.$error">
                      {{ v$.canino.responsavel.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="save" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import territorioService from "@/services/territorio.service";
import caninoService from "@/services/canino.service";
import codendService from "@/services/codend.service";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  maxLength$,
  minLength$,
  decimal$,
} from "../../components/forms/validators.js";


export default {
  components: {
    Loader,
    Message,
    CmbMunicipio,
    CmbAuxiliares,
    footerCard
  },
  data() {
    return {
      area: [],
      quarteirao: [],
      codends: [],
      edt_date: '',
      canino: {
        id_canino: 0,
        id_municipio: 0,
        id_area: 0,
        fant_area: '',
        id_quarteirao: 0,
        fant_quart: '',
        id_codend: 0,
        id_situacao: 0,
        latitude: '',
        longitude: '',
        proprietario: '',
        telefone: '',
        dt_canino: '',
        responsavel: '',
        id_usuario: 0,
      },
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: 'Salvar',
        strCancel: 'Cancelar',
        strAux: 'Animais',
        aux: true
      }
    };
  },
  validations() {
    return {
      canino: {
        proprietario: {
          required$,
          minLength: minLength$(3),
          maxLength: maxLength$(40)
        },
        telefone: {
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
        },
        id_codend: {
          minValue: combo$(1)
        },
        dt_canino: { required$, },
        responsavel: {
          required$,
          maxLength: maxLength$(40)
        },
        latitude: { decimal$ },
        longitude: { decimal$ },
        id_situacao: {
          minValue: combo$(1)
        },
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    setDate($event) {
      if ($event) {
        this.canino.dt_canino = moment(String($event)).format('YYYY-MM-DD');
      }
    },
    save() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        if (this.canino.id_canino>0){
            caninoService.edit(this.canino).then(
            (response) => {
                this.showMessage = true;
                this.message = "Endereço alterado";
                this.type = "success";
                this.caption = "Animais";
                setTimeout(() => {
                this.showMessage = false; 
                // this.$router.push("/canino_det/"+response.data.master.id_canino)
                }, 5000);
            },
            (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Animais";
                setTimeout(() => (this.showMessage = false), 3000);
            }
            )
            .catch((err) => {
                this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Animais";
                setTimeout(() => (this.showMessage = false), 3000);
            })
            .finally(() => {
                document.getElementById('login').classList.remove('is-loading');
            });
        } else {
            caninoService.create(this.canino).then(
            (response) => {
                this.showMessage = true;
                this.message = "Endereço salvo";
                this.type = "success";
                this.caption = "Animais";
                setTimeout(() => {
                this.showMessage = false; 
                this.canino.id_canino = response.data.master.id_canino;
                }, 5000);
            },
            (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Animais";
                setTimeout(() => (this.showMessage = false), 3000);
            }
            )
            .catch((err) => {
                this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Animais";
                setTimeout(() => (this.showMessage = false), 3000);
            })
            .finally(() => {
                document.getElementById('login').classList.remove('is-loading');
            });
        }
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Animais";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    loadData() {
      this.isLoading = true;

      caninoService.getCaninoByCodend(this.canino.id_codend).then(
        async (response) => {
          if (response.data != '') {
            let data = response.data;
          
            this.canino.id_municipio = data.id_municipio;
            await this.getAreas(data.id_municipio);
            await this.getQuarteirao(data.id_area);
            this.canino.id_area = data.id_area;
            this.canino.id_quarteirao = data.id_quarteirao;
           // await this.getCodends();
            this.canino.proprietario = data.proprietario;
            this.canino.responsavel = data.responsavel;
            this.edt_date = moment(String(data.dt_captura)).format('DD/MM/YYYY');
            this.canino.dt_canino = data.dt_canino;
            this.canino.telefone = data.telefone;
            this.canino.id_canino = data.id_canino;
            this.canino.id_situacao = data.id_situacao;
            this.canino.latitude = data.latitude;
            this.canino.longitude = data.longitude;
            this.municipio = data.municipio;
          } else {
            this.loadTerritorio();
          }
          
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
          this.caption = "CodEnd";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );


      this.isLoading = false;
    },
    loadTerritorio(){
        codendService.getCodend(this.canino.id_codend).then(
        async (response) => {
          let data = response.data[0];
          this.canino.id_municipio = data.id_municipio;
          await this.getAreas(data.id_municipio);
          await this.getQuarteirao(data.id_area);
          this.canino.id_area = data.id_area;
          this.canino.id_quarteirao = data.id_quarteirao;
          this.canino.id_canino = 0;
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
          this.caption = "Animais";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );
//recuperar mun, area e quart do codend
//popular combos
    },
    details(){
      if (this.canino.id_canino == 0){
          this.message = "Vode deve primeiro informar e salvar os dados do imóvel!"      
          this.showMessage = true;
          this.type = "alert";
          this.caption = "CodEnd";
          setTimeout(() => (this.showMessage = false), 3000);
      } else {
        this.$router.push("/canino_dets/"+this.canino.id_canino);
      }
      
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
    },
    getAreas(mun) {
      territorioService.getAreas(mun)
        .then((res) => {
          console.log(res);
          this.area = res.data.area;
        })
        .catch((err) => {
          this.area = [];
        })
    },
    getQuarteirao(area) {
      territorioService.getQuarteiroes(area)
        .then((res) => {
          this.quarteirao = res.data.quarteirao;
        })
        .catch((err) => {
          this.quarteirao = [];
        })
    },
    getCodends() {
      codendService.getCodendsByQuadra(this.canino.id_quarteirao)
        .then((res) => {
          this.codends = res.data;
        })
        .catch((err) => {
          this.codends = [];
        })
    },
    setFantArea(value) {
      let fant_a = this.area.filter((item) => item.id_area === value);
      this.canino.fant_area = fant_a[0].codigo;
      this.getQuarteirao(value);
    },
    setFantQuart(value) {
      let fant_q = this.quarteirao.filter(
        (item) => item.id_quarteirao === value
      );
      this.canino.fant_quart = fant_q[0].numero;
      this.getCodends();
    },
    startCalendar() {
      const options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        showHeader: false,
        color: "info",
        allowInput: true,
        startDate: this.canino.dt_canino,
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
        maxDate: new Date(),
      };

      var calini = bulmaCalendar.attach('#dtCanino', options);

      const element = document.querySelector('#dtCanino');

      const input = document.querySelector('.datetimepicker-dummy-input');
      input.removeAttribute('readonly');
      input.setAttribute('value', "__/__/____");
      input.setAttribute('data-mask', "__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', () => {
        this.canino.dt_canino = moment(input.value).format('YYYY-MM-DD');
      })

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.canino.dt_canino = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    }
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.canino.id_usuario = cUser.id;
    }



    this.loadData();
  },
  created() {
    this.canino.id_codend = this.$route.params.codend;
  },
  watch: {
    'canino.id_municipio'(value) {
      this.getAreas(value);
    },
    'canino.id_area'(value) {
      if (this.area.length > 0) {
        this.setFantArea(value);
      }
    },
    "area"(value) {
      if (this.canino.id_area > 0) {
        this.setFantArea(parseInt(this.canino.id_area));
        this.getQuarteirao(this.canino.id_area);
      }
    },
    'canino.id_quarteirao'(value) {
      if (this.quarteirao.length > 0) {
        this.setFantQuart(value);
      }
    },
    "quarteirao"(value) {
      if (this.canino.id_quarteirao > 0) {
        this.setFantQuart(parseInt(this.canino.id_quarteirao));
      }
    },
  },
};
</script>

<style scoped>
.datetimepicker-dummy.is-info .datetimepicker-clear-button {
  color: brown;
  background-color: aqua;
}
</style>
