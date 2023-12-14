<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10 offset-1">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Identificação</p>
          </header>
          <div class="card-content">
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child conteudo">
                      <div class="columns">
                        <div class="field column is-6">
                          <label class="label">CodSis - Município</label>
                          <div class="control" v-if="identifica_det.id_identificacao_det > 0">
                            <input class="input" type="text" placeholder="Nome" v-model="municipio" readonly />
                          </div>
                          <div class="control" v-else>
                            <CmbMunicipio :id_prop="currentUser.id" :sel="identifica.id_municipio"
                              @selMun="identifica.id_municipio = $event" />
                          </div>
                        </div>
                        <div class="field column is-6">
                          <label class="label">Captura</label>
                          <div class="control" v-if="identifica_det.id_identificacao_det > 0">
                            <input class="input" type="text" placeholder="Captura" v-model="codigo" readonly />
                          </div>
                          <div class="control" v-else>
                            <div class="select">
                              <select v-model="identifica.id_captura" class="input" :class="{
                                'is-danger': v$.identifica.id_captura.$error,
                              }">
                                <option value="0">-- Selecione --</option>
                                <option v-for="reg in capturas" :key="reg.id_captura" 
                                :value="reg.id_captura" :selected="reg.id_capturao == identifica.id_captura">
                                  {{ reg.codigo }}
                                </option>
                              </select>
                              <span class="is-error" v-if="v$.identifica.id_captura.$error">
                                {{
                                  v$.identifica.id_captura.$errors[0].$message
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="columns">
                        <div class="field column is-6">
                          <label class="label">Responsável</label>
                          <div class="control" v-if="identifica_det.id_identificacao_det > 0">
                            <input class="input" type="text" placeholder="Identificado por"
                              v-model="identifica.responsavel" readonly />
                          </div>
                          <div class="control" v-else>
                            <input class="input" type="text" placeholder="Identificado por"
                              v-model="identifica.responsavel" />
                          </div>
                        </div>
                        <div class="field column is-6">
                          <label class="label">Data</label>
                          <div class="control" v-if="identifica_det.id_identificacao_det > 0">
                            <input type="date" class="input" v-model="identifica.dt_identificacao" readonly>
                          </div>
                          <div class="control" v-else>
                            <input type="date" id="dtIdent">
                          </div>
                        </div>

                      </div>
                    </article>
                    <article class="tile is-child conteudo">
                      <div class="columns" v-if="identifica.id_identificacao > 0">
                        <div class="field column is-2">
                          <label class="label">Amostra</label>
                          <div class="control">
                            <div class="select">
                              <select v-model="identifica_det.amostra" class="input" :class="{
                                'is-danger': v$.identifica_det.amostra.$error,
                              }">
                                <option value="0">-- Selecione --</option>
                                <option v-for="reg in amostras" :value="reg.amostra" :key="reg.amostra">
                                  {{ reg.amostra }}
                                </option>
                              </select>
                              <span class="is-error" v-if="v$.identifica_det.amostra.$error">
                                {{
                                  v$.identifica_det.amostra.$errors[0].$message
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="field column is-2">
                          <label class="label">Espécie</label>
                          <div class="control">
                            <div class="select">
                              <select v-model="identifica_det.id_especie" class="input" :class="{
                                'is-danger':
                                  v$.identifica_det.id_especie.$error,
                              }">
                                <option value="0">-- Selecione --</option>
                                <option v-for="reg in especies" :value="reg.id_especie" :key="reg.id_especie">
                                  {{ reg.especie }}
                                </option>
                              </select>
                              <span class="is-error" v-if="v$.identifica_det.id_especie.$error">
                                {{
                                  v$.identifica_det.id_especie.$errors[0]
                                    .$message
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Macho</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.macho" :class="{
                              'is-danger': v$.identifica_det.macho.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.macho.$error">
                              {{ v$.identifica_det.macho.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Fêmea</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.femea" :class="{
                              'is-danger': v$.identifica_det.femea.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.femea.$error">
                              {{ v$.identifica_det.femea.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Fêmea Ing</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.femea_ing" :class="{
                              'is-danger': v$.identifica_det.femea_ing.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.femea_ing.$error">
                              {{
                                v$.identifica_det.femea_ing.$errors[0].$message
                              }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Larva</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.larva" :class="{
                              'is-danger': v$.identifica_det.larva.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.larva.$error">
                              {{ v$.identifica_det.larva.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Ninfa</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.ninfa" :class="{
                              'is-danger': v$.identifica_det.ninfa.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.ninfa.$error">
                              {{ v$.identifica_det.ninfa.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Pool</label>
                          <div class="control">
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.pool" :class="{
                              'is-danger': v$.identifica_det.pool.$error,
                            }" />
                            <span class="is-error" v-if="v$.identifica_det.pool.$error">
                              {{ v$.identifica_det.pool.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="columns">
                        <footerCard @submit="createDet" @cancel="null" @aux="details" :cFooter="cFooter" />
                      </div>
                    </article>
                  </div>
                </div>
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
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import identificaService from "@/services/identifica.service";
import capturaService from "@/services/captura.service";
import especieService from "@/services/especie.service";
import moment from "moment";
import footerCard from "@/components/forms/FooterCard.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  integer$,
  maxLength$,
} from "../components/forms/validators.js";

export default {
  components: {
    Loader,
    CmbMunicipio,
    footerCard,
    Message
  },
  data() {
    return {
      Identificas: [],
      capturas: [],
      amostras: [],
      especies: [],
      identifica: {
        id_identificacao: 0,
        id_captura: 0,
        id_usuario: 0,
        responsavel: "",
        dt_identificacao: "",
      },
      identifica_det: {
        id_identificacao_det: 0,
        id_identificacao: 0,
        amostra: "",
        id_especie: 0,
        macho: "",
        femea: "",
        femea_ing: "",
        larva: "",
        ninfa: "",
        pool: "",
      },
      municipio: "",
      codigo: "",
      v$: useValidate(),
      edt_date: "",
      showMessage: false,
      cFooter: {
        strSubmit: "Salvar",
        strCancel: "Cancelar",
        strAux: "Identificações",
        aux: true,
      },
    };
  },
  validations() {
    return {
      identifica: {
        id_captura: { required: required$, minValue: combo$(1) },
      },
      identifica_det: {
        amostra: { required: required$, minValue: combo$(1) },
        id_especie: { required: required$, minValue: combo$(1) },
        macho: { integer: integer$ },
        femea: { integer: integer$ },
        femea_ing: { integer: integer$ },
        larva: { integer: integer$ },
        ninfa: { integer: integer$ },
        pool: { maxLength: maxLength$(20) },
      },
    };
  },
  methods: {
    startCalendar() {
      var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.identifica.dt_identificacao,
        showHeader: false,
        color: "info",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
        maxDate: new Date(),
      };

      var calini = bulmaCalendar.attach('#dtIdent', options);

      const input = document.querySelector('.datetimepicker-dummy-input');
      if(input){
        input.removeAttribute('readonly');
        input.setAttribute('value', "__/__/____");
        input.setAttribute('data-mask', "__/__/____");
        this.applyDataMask(input);

        input.addEventListener('blur', () => {
          this.identifica.dt_identificacao = moment(input.value).format('YYYY-MM-DD');
        });
      }

      const element = document.querySelector('#dtIdent');
      if (element) {
        element.bulmaCalendar.on('select', datepicker => {
          this.identifica.dt_identificacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    },
    details() {
      this.$router.push("/identifica_dets/" + this.identifica.id_identificacao);
    },
    createDet() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        if (this.identifica_det.id_identificacao_det > 0) {
          identificaService
            .updateDet(this.identifica_det)
            .then(
              (response) => {
                this.showMessage = true;
                this.message = "Identificação alterada!";
                this.type = "success";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              },
              (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              }
            )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          identificaService
            .update(this.identifica)
            .then(
              (response) => {
                this.showMessage = true;
                this.message = "Identificação alterada!";
                this.type = "success";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              },
              (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              }
            )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        }
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

      identificaService.getIdentifica(this.identifica.id_identificacao)
        .then(
          (response) => {
            let data = response.data;
            this.identifica.id_municipio = data.id_municipio;
            this.identifica.id_captura = data.id_captura;
            this.identifica.dt_identificacao = data.dt_identificacao;
            this.identifica.responsavel = data.responsavel;
            this.edt_date = moment(String(data.dt_identificacao)).format(
              "DD/MM/YYYY"
            );
            this.municipio = data.municipio;
            this.codigo = data.codigo;

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
            this.caption = "Identificação";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        );

      this.isLoading = false;
    },
    loadDet() {
      this.isLoading = true;

      identificaService.getIdentificaDet(this.identifica_det.id_identificacao_det)
        .then(
          (response) => {
            let data = response.data;
            this.identifica_det.amostra = data.amostra;
            this.identifica_det.id_especie = data.id_especie;
            this.identifica_det.macho = data.macho;
            this.identifica_det.femea = data.femea;
            this.identifica_det.femea_ing = data.femea_ing;
            this.identifica_det.larva = data.larva;
            this.identifica_det.ninfa = data.ninfa;
            this.identifica_det.pool = data.pool;
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
            this.caption = "Identificação";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        );

      this.isLoading = false;
    },
    getAmostras() {
      capturaService
        .getAmostras(this.identifica.id_captura)
        .then((res) => {
          this.amostras = res.data;
        })
        .catch((err) => {
          this.amostras = [];
        });
    },
    getCapturas() {
      capturaService
        .getCombo(this.identifica.id_municipio, true)
        .then((res) => {
          this.capturas = res.data;
        })
        .catch((err) => {
          this.capturas = [];
        });
    },
    getEspecies() {
      especieService
        .getCombo({})
        .then((res) => {
          this.especies = res.data;
        })
        .catch((err) => {
          this.especies = [];
        });
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
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  created() {
    this.identifica.id_identificacao = this.$route.params.id;
    this.identifica_det.id_identificacao = this.$route.params.id;
    this.loadData();
    this.getEspecies();
    if (this.$route.params.det) {
      this.identifica_det.id_identificacao_det = this.$route.params.det;
      this.loadDet();
    }
  },
  watch: {
    "identifica.id_municipio"(value) {
      this.getCapturas();
    },
    "identifica.id_captura"(value) {
      this.getAmostras();
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.identifica.id_usuario = cUser.id;
    }
  },
};
</script>

<style scoped>
.conteudo {
  border: 1px solid #aaa;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}
</style>
