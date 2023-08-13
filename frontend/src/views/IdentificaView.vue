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
            <p class="card-header-title is-centered">Identificação</p>
          </header>
          <div class="card-content">
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification">
                      <div class="columns">
                        <div class="field column is-6">
                          <label class="label">CodSis - Município</label>
                          <div class="control">
                            <CmbMunicipio
                              :id_prop="currentUser.id"
                              @selMun="id_municipio = $event"
                            />
                          </div>
                        </div>
                        <div class="field column is-2">
                          <label class="label">Captura</label>
                          <div class="control">
                            <div class="select">
                              <select
                                v-model="identifica.id_captura"
                                class="input"
                                :class="{
                                  'is-danger': v$.identifica.id_captura.$error,
                                }"
                              >
                                <option value="0">-- Selecione --</option>
                                <option
                                  v-for="reg in capturas"
                                  :key="reg.id_captura"
                                  :value="reg.id_captura"
                                >
                                  {{ reg.codigo }}
                                </option>
                              </select>
                              <span
                                class="is-error"
                                v-if="v$.identifica.id_captura.$error"
                              >
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
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Identificado por"
                              v-model="identifica.responsavel"
                              :class="{ 'is-danger': v$.identifica.responsavel.$error }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica.responsavel.$error"
                            >
                              {{ v$.identifica.responsavel.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column is-3">
                          <label class="label">Data</label>
                          <div class="control">
                            <datepicker
                              placeholder="Data da atividade"
                              :config="{
                                dateFormat: 'd/m/Y',
                                static: true,
                                onChange: setDate,
                              }"
                              :class="{
                                'is-danger':
                                  v$.identifica.dt_identificacao.$error,
                              }"
                            />
                          </div>
                          <span
                            class="is-error"
                            v-if="v$.identifica.dt_identificacao.$error"
                          >
                            {{
                              v$.identifica.dt_identificacao.$errors[0].$message
                            }}
                          </span>
                        </div>
                        <div class="field column is-3">
                          <label class="label">&nbsp;</label>
                          <button
                            class="button is-outlined is-success"
                            id="btAbreId"
                            @click="create"
                          >
                            Inserir identificações
                          </button>
                        </div>
                      </div>
                    </article>
                    <article
                      class="tile is-child notification is-warning"
                      v-if="identifica.id_identificacao > 0"
                    >
                      <div class="columns">
                        <div class="field column is-2">
                          <label class="label">Amostra</label>
                          <div class="control">
                            <div class="select">
                              <select
                                v-model="identifica_det.amostra"
                                class="input"
                                :class="{
                                  'is-danger': v$.identifica_det.amostra.$error,
                                }"
                              >
                                <option value="0">-- Selecione --</option>
                                <option
                                  v-for="reg in amostras"
                                  :value="reg.amostra"
                                >
                                  {{ reg.amostra }}
                                </option>
                              </select>
                              <span
                                class="is-error"
                                v-if="v$.identifica_det.amostra.$error"
                              >
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
                              <select
                                v-model="identifica_det.id_especie"
                                class="input"
                                :class="{
                                  'is-danger':
                                    v$.identifica_det.id_especie.$error,
                                }"
                              >
                                <option value="0">-- Selecione --</option>
                                <option
                                  v-for="reg in especies"
                                  :value="reg.id_especie"
                                >
                                  {{ reg.nome }}
                                </option>
                              </select>
                              <span
                                class="is-error"
                                v-if="v$.identifica_det.id_especie.$error"
                              >
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
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.macho"
                              :class="{
                                'is-danger': v$.identifica_det.macho.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.macho.$error"
                            >
                              {{ v$.identifica_det.macho.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Fêmea</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.femea"
                              :class="{
                                'is-danger': v$.identifica_det.femea.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.femea.$error"
                            >
                              {{ v$.identifica_det.femea.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Fêmea Ing</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.femea_ing"
                              :class="{
                                'is-danger': v$.identifica_det.femea_ing.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.femea_ing.$error"
                            >
                              {{
                                v$.identifica_det.femea_ing.$errors[0].$message
                              }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Larva</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.larva"
                              :class="{
                                'is-danger': v$.identifica_det.larva.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.larva.$error"
                            >
                              {{ v$.identifica_det.larva.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Ninfa</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.ninfa"
                              :class="{
                                'is-danger': v$.identifica_det.ninfa.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.ninfa.$error"
                            >
                              {{ v$.identifica_det.ninfa.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column">
                          <label class="label">Pool</label>
                          <div class="control">
                            <input
                              class="input"
                              type="text"
                              placeholder="Nome"
                              v-model="identifica_det.pool"
                              :class="{
                                'is-danger': v$.identifica_det.pool.$error,
                              }"
                            />
                            <span
                              class="is-error"
                              v-if="v$.identifica_det.pool.$error"
                            >
                              {{ v$.identifica_det.pool.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="columns">
                        <footerCard
                          @submit="createDet"
                          @cancel=""
                          @aux="details"
                          :cFooter="cFooter"
                        />
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
import Datepicker from "vue-bulma-datepicker";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import identificaService from "@/services/identifica.service";
import especieService from "@/services/especie.service";
import capturaService from "@/services/captura.service";
import moment from "moment";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  integer$,
  maxLength$,
} from "../components/forms/validators.js";

export default {
  components: {
    Datepicker,
    Loader,
    Message,
    CmbMunicipio,
    footerCard,
  },
  data() {
    return {
      capturas: [],
      amostras: [],
      especies: [],
      identifica: {
        id_identificacao: 0,
        id_captura: 0,
        id_usuario: 0,
        reponsavel: "",
        dt_identificacao: "",
      },
      identifica_det: {
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
      id_municipio: 0,
      v$: useValidate(),
      showMessage: false,
      cFooter: {
        strSubmit: "Salvar",
        strCancel: "Cancelar",
        strAux: "",
        aux: false,
      },
    };
  },
  validations() {
    return {
      identifica: {
        id_captura: { minValue: combo$(1) },
        responsavel: { maxLength: maxLength$(50) },
        dt_identificacao: { required: required$},
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
    setDate(e) {
      if (e) {
         this.identifica.dt_identificacao = moment(String(e)).format('YYYY-MM-DD');
      }
    },
    create() {
      this.v$.$validate(); // checks all inputs
      console.log (this.v$.identifica.$error);
      if (!this.v$.identifica.$error) {
        document.getElementById("btAbreId").classList.add("is-loading");

        identificaService
          .create(this.identifica)
          .then(
            (response) => {
              this.identifica.id_identificacao =
                response.data.master.id_identificacao;
              this.identifica_det.id_identificacao =
                response.data.master.id_identificacao;
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
            document.getElementById("btAbreId").classList.remove("is-loading");
          });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Captura";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    getCapturas() {
      capturaService
        .getCombo(this.id_municipio)
        .then((res) => {
          this.capturas = res.data;
        })
        .catch((err) => {
          this.capturas = [];
        });
    },
    getAmostras() {
      capturaService
        .getAmostras(this.identifica.id_captura)
        .then((res) => {
          this.amostras = res.data;
        })
        .catch((err) => {
          this.capturas = [];
        });
    },
    getEspcies() {
      especieService
        .getCombo({})
        .then((res) => {
          this.especies = res.data;
        })
        .catch((err) => {
          this.capturas = [];
        });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  watch: {
    id_municipio(value) {
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

<style scoped></style>
