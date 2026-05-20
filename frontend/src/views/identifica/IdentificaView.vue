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
                          <div class="control">
                            <CmbMunicipio :id_prop="currentUser.id" @selMun="id_municipio = $event" />
                          </div>
                        </div>
                        <div class="field column is-6">
                          <label class="label">Captura</label>
                          <div class="control">
                            <div class="select">
                              <select v-model="identifica.id_captura" class="input" :class="{
                                'is-danger': v$.identifica.id_captura.$error,
                              }">
                                <option value="0">-- Selecione --</option>
                                <option v-for="reg in capturas" :key="reg.id_captura" :value="reg.id_captura">
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
                          <div class="control">
                            <input class="input" type="text" placeholder="Identificado por"
                              v-model="identifica.responsavel"
                              :class="{ 'is-danger': v$.identifica.responsavel.$error }" />
                            <span class="is-error" v-if="v$.identifica.responsavel.$error">
                              {{ v$.identifica.responsavel.$errors[0].$message }}
                            </span>
                          </div>
                        </div>
                        <div class="field column is-3">
                          <label class="label">Data</label>
                          <div class="control">
                            <input type="date" id="dtIdent">
                          </div>
                          <span class="is-error" v-if="v$.identifica.dt_identificacao.$error">
                            {{
                              v$.identifica.dt_identificacao.$errors[0].$message
                            }}
                          </span>
                        </div>
                        <div class="field column is-3">
                          <label class="label">&nbsp;</label>
                          <button class="button is-outlined is-success" id="btAbreId" @click="create">
                            Inserir identificações
                          </button>
                        </div>
                      </div>
                    </article>
                    <article class="tile is-child conteudo" v-if="identifica.id_identificacao > 0">
                      <div class="columns">
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
                          <label class="label">Gênero</label>
                          <div class="control">
                            <div class="field has-addons">
                              <div class="select">
                                <select class="input" @change="getEspeciesN($event)">
                                  <option value="0">-- Selecione --</option>
                                  <option v-for="reg in generos" :value="reg.id_genero" :key="reg.id_genero">
                                    {{ reg.nome }}
                                  </option>
                                </select>
                              </div>
                              <div class="control">
                                <button class="button" @click="trocaListaGen()">
                                  <span class="icon is-small has-text-success">
                                    <font-awesome-icon icon="fa-solid fa-repeat" />
                                  </span>
                                </button>
                              </div>
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
                            <input class="input" type="text" placeholder="Nome" v-model="identifica_det.femea_ing"
                              :class="{
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
                        <footerCard @submit="createDet" @cancel="null" @aux="null" :cFooter="cFooter" />
                      </div>
                    </article>
                    <article class="tile is-child conteudo" v-if="identifica.id_identificacao > 0">
                      <div class="columns">
                        <div class="field column is-2 is-offset-5">
                          <label class="label">Identificações</label>
                        </div>
                      </div>
                      <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="false"
                        :buttons="['edit', 'delete']" :has-exports="false" :calcHeight="true" @edit="onEditRow"
                        :deleted-id="delId" @delete="onDeleteRow" persistence-id="Identifica" />
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
import especieService from "@/services/especie.service";
import capturaService from "@/services/captura.service";
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
} from "../../components/forms/validators.js";
import MyTable from "@/components/forms/MyTable.vue";

export default {
  components: {
    Loader,
    Message,
    CmbMunicipio,
    footerCard,
    MyTable,
  },
  data() {
    return {
      capturas: [],
      amostras: [],
      generos: [],
      especies: [],
      dataTable: [],
      columns: [],
      marcaGen: 99,
      agravo: 0,
      delId: null,
      identifica: {
        id_identificacao: 0,
        id_captura: 0,
        id_usuario: 0,
        reponsavel: "",
        dt_identificacao: "",
      },
      identifica_det: {
        id: 0,
        id_identificacao: 0,
        id_identificacao_det: 0,
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
      isLoading: false,
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
        dt_identificacao: { required: required$ },
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
        id_identificacao: 0
      },
    };
  },
  methods: {
    onEditRow(id) {
      const row = this.dataTable.find(item => item.id === id);
      this.identifica_det = Object.assign({}, this.identifica_det, row);
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa captura e todas as informações associada a ela?',
        okButton: 'Confirmar',
      })
      if (ok) {
        identificaService.deleteDet(id);
        this.delId = id;
      }
    },
    setDate(e) {
      if (e) {
        this.identifica.dt_identificacao = moment(String(e)).format('YYYY-MM-DD');
      }
    },
    create() {
      this.v$.$validate(); // checks all inputs
      console.log(this.v$.identifica.$error);
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
              this.caption = "Identificação";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
          .catch((err) => {
            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Identificação";
            setTimeout(() => (this.showMessage = false), 3000);
          })
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
    loadAmostras() {
      this.isLoading = true;
      identificaService.getidentificaDets(this.identifica.id_identificacao)
        .then((response) => {
          this.dataTable = response.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    limpaDet() {
      this.identifica_det.amostra = "";
      this.identifica_det.id_especie = 0;
      this.identifica_det.id_genero = 0;
      this.identifica_det.macho = "";
      this.identifica_det.femea = "";
      this.identifica_det.femea_ing = "";
      this.identifica_det.larva = "";
      this.identifica_det.ninfa = "";
      this.identifica_det.pool = "";
      this.v$.identifica_det.$reset();
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
                this.loadAmostras();
                this.limpaDet();
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
            .createDet(this.identifica_det)
            .then((response) => {
              this.loadAmostras();
              this.limpaDet();
              (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Identificação";
                setTimeout(() => (this.showMessage = false), 3000);
              };
            })
            .catch((err) => {
              this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
              this.showMessage = true;
              this.type = "alert";
              this.caption = "Identificação";
              setTimeout(() => (this.showMessage = false), 3000);
            })
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        }
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Identificação";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    getCapturas() {
      capturaService
        .getCombo(this.id_municipio, false)
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
          this.agravo = res.data[0].agravo;
          this.getGeneros();
        })
        .catch((err) => {
          this.amostras = [];
        });
    },
    trocaListaGen() {
      if (this.marcaGen == 99) {
        this.marcaGen = this.agravo
        this.agravo = 99
      } else {
        this.agravo = this.marcaGen
        this.marcaGen = 99
      }
      this.getGeneros()
    },
    getGeneros() {
      especieService
        .comboGen(this.agravo)
        .then((res) => {
          this.generos = res.data;
        })
        .catch((err) => {
          this.generos = [];
        });
    },
    getEspeciesN(e) {
      let gen = e.target.value;
      especieService
        .comboEsp(gen)
        .then((res) => {
          this.especies = res.data;
        })
        .catch((err) => {
          this.especies = [];
        });
    },
    getEspecies() {
      especieService
        .getCombo({})
        .then((res) => {
          this.especies = res.data;
        })
        .catch((err) => {
          this.capturas = [];
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

    this.columns = [
      { headerName: "Amostra", field: "amostra" },
      { headerName: "Espécie", field: "especie" },
      { headerName: "Pool", field: "pool" },
    ];

    const options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      showHeader: false,
      color: "info",
      allowInput: true,
      cancelLabel: 'Cancelar',
      showClearButton: false,
      todayLabel: 'Hoje',
      maxDate: new Date(),
    };

    var calini = bulmaCalendar.attach('#dtIdent', options);

    const input = document.querySelector('.datetimepicker-dummy-input');
    input.removeAttribute('readonly');
    input.setAttribute('value', "__/__/____");
    input.setAttribute('data-mask', "__/__/____");
    this.applyDataMask(input);

    input.addEventListener('blur', () => {
      this.identifica.dt_identificacao = moment(input.value).format('YYYY-MM-DD');
    })

    const element = document.querySelector('#dtIdent');

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.identifica.dt_identificacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
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
