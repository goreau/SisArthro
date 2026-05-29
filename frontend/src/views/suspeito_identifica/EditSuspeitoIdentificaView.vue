<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10 offset-1">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Identificação de Artrópodes</p>
          </header>
          <div class="card-content">
            <div class="tile is-ancestor">
              <div class="tile is-vertical">
                <div class="tile">
                  <div class="tile is-parent is-vertical">
                    <article class="tile is-child conteudo">
                      <div class="columns">
                        <div class="field column is-6 is-offset-3">
                          <label class="label">Notificação: <u>{{ susp_codigo }}</u></label>
                        </div>
                      </div>
                      <hr>
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
                        <div class="field column is-3">
                          <label class="label">Data</label>
                          <div class="control" v-if="identifica_det.id_identificacao_det > 0">
                            <input type="date" class="input" v-model="identifica.dt_identificacao" readonly>
                          </div>
                          <div class="control" v-else>
                            <input type="date" id="dtIdent">
                          </div>
                        </div>
                        <div class="field column is-3">
                          <label class="label">&nbsp;</label>
                          <button class="button is-outlined is-success" @click="update">
                            Salvar
                          </button>
                        </div>

                      </div>
                    </article>

                    <article class="tile is-child conteudo">
                      <div class="columns" v-if="identifica.id_identificacao > 0">
                        <div class="field column is-2">
                          <label class="label">Gênero</label>
                          <div class="control">
                            <div class="field has-addons">
                              <div class="select">
                                <select class="input" v-model="identifica_det.id_genero">
                                  <option value="0">-- Selecione --</option>
                                  <option v-for="reg in generos" :value="reg.id_genero" :key="reg.id_genero">
                                    {{ reg.nome }}
                                  </option>
                                </select>
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
                      </div>
                      <div class="columns">
                        <footerCard @submit="createDet" @cancel="null" @aux="null" :cFooter="cFooter" />
                      </div>
                    </article>
                    <article class="tile is-child conteudo">
                      <div class="columns">
                        <div class="field column is-2 is-offset-5">
                          <label class="label">Identificações</label>
                        </div>
                      </div>
                      <hr>
                      <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns" :pagination="false"
                        :buttons="['edit', 'delete']" :has-exports="false" :calcHeight="true" @edit="editRow"
                        :deleted-id="delId" @delete="deleteRow" persistence-id="EditSuspeito" />
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import suspeitoIdentificaService from "@/services/suspeitoIdentifica.service";
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
} from "../../components/forms/validators.js";
import MyTable from "@/components/forms/MyTable.vue";
import ConfirmDialog from "@/components/forms/ConfirmDialog.vue";

export default {
  components: {
    MyTable,
    Loader,
    CmbMunicipio,
    footerCard,
    Message,
    ConfirmDialog
  },
  data() {
    return {
      Identificas: [],
      capturas: [],
      amostras: [],
      generos: [],
      especies: [],
      marcaGen: 99,
      agravo: 0,
      susp_codigo: '',
      identifica: {
        id_identificacao: 0,
        id_suspeito: 0,
        id_usuario: 0,
        responsavel: "",
        dt_identificacao: "",
      },
      identifica_det: {
        id_identificacao_det: 0,
        id_identificacao: 0,
        id_especie: 0,
        macho: "",
        femea: "",
        femea_ing: "",
        larva: "",
        ninfa: "",
      },
      v$: useValidate(),
      edt_date: "",
      showMessage: false,
      cFooter: {
        strSubmit: "Salvar",
        strCancel: "Cancelar",
        strAux: null,
        aux: false,
      },
      dataTable: [],
      tableName: "identifica_det",
      isLoading: false,
      columns: [],
      delId: null,
    };
  },
  validations() {
    return {
      identifica: {
        id_suspeito: { required: required$, minValue: combo$(1) },
        responsavel: { maxLength: maxLength$(50) },
        dt_identificacao: { required: required$ },
      },
      identifica_det: {
        id_especie: { required: required$, minValue: combo$(1) },
        macho: { integer: integer$ },
        femea: { integer: integer$ },
        femea_ing: { integer: integer$ },
        larva: { integer: integer$ },
        ninfa: { integer: integer$ },
      },
    };
  },
  methods: {
    async editRow(idx) {
      const obj = await suspeitoIdentificaService.getIdentificaDet(idx)
      this.identifica_det = Object.assign({}, this.identifica_det, obj.data);
    },
    async deleteRow(idx) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir essa captura e todas as informações associada a ela?',
        okButton: 'Confirmar',
      })
      if (ok) {
        suspeitoIdentificaService.deleteDet(idx);
        this.delId = idx;
        //  location.reload();
      }
    },
    startCalendar() {
      const teste = document.querySelector('#dtIdent');

      if (teste.type == 'text') {
        return;
      }
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
      if (input) {
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
    update() {
      this.v$.identifica.$validate(); // checks all inputs
      if (!this.v$.identifica.$error) {

        if (this.identifica.id_suspeito_identifica > 0) {
          suspeitoIdentificaService
            .update(this.identifica)
            .then(
              (response) => {
                this.message = "Identificação alterada com sucesso.";
                this.showMessage = true;
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
          suspeitoIdentificaService
            .create(this.identifica)
            .then(
              (response) => {
                this.identifica.id_identificacao =
                  response.data.master.id_identificacao;
                this.identifica_det.id_identificacao =
                  response.data.master.id_identificacao;
                this.message = "Identificação inserida com sucesso.";
                this.showMessage = true;
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
        }
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Captura";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    createDet() {
      this.v$.identifica_det.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        if (this.identifica_det.id_identificacao_det > 0) {
          suspeitoIdentificaService
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
          suspeitoIdentificaService
            .createDet(this.identifica_det)
            .then(
              (response) => {
                this.showMessage = true;
                this.message = "Identificação inserida!";
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
      this.loadData()
      this.limpaDet()
    },
    limpaDet() {
      this.identifica_det.id_especie = 0;
      this.identifica_det.id_genero = 0;
      this.identifica_det.macho = "";
      this.identifica_det.femea = "";
      this.identifica_det.femea_ing = "";
      this.identifica_det.larva = "";
      this.identifica_det.ninfa = "";
      this.v$.identifica_det.$reset();
    },
    loadData() {
      this.isLoading = true;

      suspeitoIdentificaService.getBase(this.identifica.id_suspeito)
        .then(
          (response) => {
            let data = response.data;
            this.susp_codigo = data.suspeito.codigo;
            if (Object.keys(data.master).length > 0) {
              this.identifica = data.master;
              this.identifica_det.id_identificacao = this.identifica.id_identificacao;
              this.getTable()
              if (data.detail.length > 0) {
                this.dataTable = data.detail;
              } else {
                this.identifica_det.id_identificacao = this.identifica.id_identificacao
              }
            } else {
              this.identifica.id_suspeito = data.suspeito.id_suspeito;
              this.dataTable = []
            }

            this.getGeneros();
            /*  this.edt_date = moment(String(data.dt_identificacao)).format(
                "DD/MM/YYYY"
              );*/

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
    /* loadDet() {
       this.isLoading = true;
 
       identificaService.getIdentificaDet(this.identifica_det.id_identificacao_det)
         .then(
           async (response) => {
             let data = response.data;
             this.identifica_det.amostra = data.amostra;
             this.genero = data.id_genero;
             await this.getEspecies(this.genero);
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
     },*/
    getGeneros() {
      especieService
        .comboGen(99)
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
    getEspecies(gen) {
      especieService
        .comboEsp(gen)
        .then((res) => {
          this.especies = res.data;
        })
        .catch((err) => {
          this.especies = [];
        });
    },
    getTable() {

      this.columns = [
        { headerName: "Espécie", field: "especie" },
        { headerName: "Macho", field: "macho" },
        { headerName: "Fêmea", field: "femea" },
        { headerName: "Fêmea ing", field: "femea_ing" },
        { headerName: "Imaturos", field: "imaturas" },
      ];
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
  watch: {
    'identifica_det.id_genero'(value) {
      this.getEspecies(value);
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  created() {
    this.identifica.id_suspeito = this.$route.params.id;
    this.loadData();
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
