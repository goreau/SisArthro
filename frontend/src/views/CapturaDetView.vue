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
            <p class="card-header-title is-centered">
              Atividades da Captura {{ master.codigo }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-2">
                  <label class="label">Área</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="captura_det.area" class="input">
                        <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in area"
                          :key="reg.id_area"
                          :value="reg.id_area"
                        >
                          {{ reg.codigo }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Quadra</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="captura_det.quadra" class="input">
                        <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in quarteirao"
                          :key="reg.id_quarteirao"
                          :value="reg.id_quarteirao"
                        >
                          {{ reg.numero }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Cod End/PC</label>
                 <!-- <div class="select">
                    <select v-model="captura_det.codend" class="input">
                        <option value="0">-- Selecione --</option>
                        <option
                          v-for="reg in codends"
                          :key="reg.id_codend"
                          :value="reg.id_codend"
                        >
                          {{ reg.codigo }}
                        </option>
                      </select>
                  </div>-->
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.codend"
                      :class="{ 'is-danger': v$.captura_det.codend.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.codend.$error">
                    {{ v$.captura_det.codend.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Latitude</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="° decimais"
                      v-model="captura_det.latitude"
                      :class="{ 'is-danger': v$.captura_det.latitude.$error }"
                      @blur="changeComma($event)"
                    />
                    <span
                      class="is-error"
                      v-if="v$.captura_det.latitude.$error"
                    >
                      {{ v$.captura_det.latitude.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Longitude</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="° decimais"
                      v-model="captura_det.longitude"
                      :class="{ 'is-danger': v$.captura_det.longitude.$error }"
                      @blur="changeComma($event)"
                    />
                    <span
                      class="is-error"
                      v-if="v$.captura_det.longitude.$error"
                    >
                      {{ v$.captura_det.longitude.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-one-fifth">
                  <label class="label">Método</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="4"
                      @selValue="captura_det.metodo = $event"
                      :errclass="{ 'is-danger': v$.captura_det.metodo.$error }"
                    />
                    <span class="is-error" v-if="v$.captura_det.metodo.$error">
                      {{ v$.captura_det.metodo.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Ambiente</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="5"
                      @selValue="captura_det.ambiente = $event"
                      :errclass="{
                        'is-danger': v$.captura_det.ambiente.$error,
                      }"
                    />
                    <span
                      class="is-error"
                      v-if="v$.captura_det.ambiente.$error"
                    >
                      {{ v$.captura_det.ambiente.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Local de Captura</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="6"
                      @selValue="captura_det.local_captura = $event"
                      :errclass="{
                        'is-danger': v$.captura_det.local_captura.$error,
                      }"
                    />
                    <span
                      class="is-error"
                      v-if="v$.captura_det.local_captura.$error"
                    >
                      {{ v$.captura_det.local_captura.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Nº AIL</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.num_arm"
                      :class="{ 'is-danger': v$.captura_det.num_arm.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.num_arm.$error">
                    {{ v$.captura_det.num_arm.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Altura AIL</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.altura"
                      @blur="changeComma($event)"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="column is-4 has-text-centered cabeca">Hora</div>
                <div class="column is-4 has-text-centered cabeca">
                  Temperatura (°C)
                </div>
                <div class="column is-4 has-text-centered cabeca">
                  Umidade (%)
                </div>
              </div>
              <div class="columns">
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input"
                      type="time"
                      placeholder=""
                      v-model="captura_det.hora_inicio"
                      :class="{ 'is-danger': v$.captura_det.hora_inicio.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.hora_inicio.$error">
                    {{ v$.captura_det.hora_inicio.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input"
                      type="time"
                      placeholder=""
                      v-model="captura_det.hora_final"
                      :class="{ 'is-danger': v$.captura_det.hora_final.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.hora_final.$error">
                    {{ v$.captura_det.hora_final.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.temp_inicio"
                      :class="{ 'is-danger': v$.captura_det.temp_inicio.$error }"
                      @blur="changeComma($event)"
                  />
                  <span class="is-error" v-if="v$.captura_det.temp_inicio.$error">
                    {{ v$.captura_det.temp_inicio.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.temp_final"
                      :class="{ 'is-danger': v$.captura_det.temp_final.$error }"
                      @blur="changeComma($event)"
                  />
                  <span class="is-error" v-if="v$.captura_det.temp_final.$error">
                    {{ v$.captura_det.temp_final.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.umidade_inicio"
                      :class="{ 'is-danger': v$.captura_det.umidade_inicio.$error }"
                      @blur="changeComma($event)"
                  />
                  <span class="is-error" v-if="v$.captura_det.umidade_inicio.$error">
                    {{ v$.captura_det.umidade_inicio.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.umidade_final"
                      :class="{ 'is-danger': v$.captura_det.umidade_final.$error }"
                      @blur="changeComma($event)"
                  />
                  <span class="is-error" v-if="v$.captura_det.umidade_final.$error">
                    {{ v$.captura_det.umidade_final.$errors[0].$message }}
                  </span>
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-one-fifth has-text-centered">
                  <label class="label">Nº da Amostra</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.amostra"
                      :class="{ 'is-danger': v$.captura_det.amostra.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.amostra.$error">
                    {{ v$.captura_det.amostra.$errors[0].$message }}
                  </span>
                  </div>
                </div>
                <div class="field column is-one-fifth has-text-centered">
                  <label class="label">Nº de Tubos</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder=""
                      v-model="captura_det.quant_potes"
                      :class="{ 'is-danger': v$.captura_det.quant_potes.$error }"
                  />
                  <span class="is-error" v-if="v$.captura_det.quant_potes.$error">
                    {{ v$.captura_det.quant_potes.$errors[0].$message }}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard
              @submit="create"
              @cancel=""
              @aux="details"
              :cFooter="cFooter"
            />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import territorioService from "@/services/territorio.service";
import capturaService from "@/services/captura.service";
import codendService from "@/services/codend.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import { required$, combo$, decimal$, maxValue$, maxLength$, integer$ } from "../components/forms/validators.js";

export default {
  components: {
    Loader,
    Message,
    CmbAuxiliares,
    footerCard,
  },
  data() {
    return {
      master: {},
      metodo: [],
      ambiente: [],
      local: [],
      area: [],
      quarteirao: [],
      codends: [],
      captura_det: {
        id_captura: 0,
        area: "",
        fant_area: "",
        quadra: "",
        fant_quart: "",
        codend: "",
        latitude: "",
        longitude: "",

        metodo: 0,
        ambiente: 0,
        local_captura: 0,
        num_arm: "",
        altura: "",
        hora_inicio: "",
        hora_final: "",
        temp_inicio: "",
        temp_final: "",
        umidade_inicio: "",
        umidade_final: "",
        amostra: "",
        quant_potes: "",
      },
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: "Salvar",
        strCancel: "Cancelar",
        strAux: "Capturas",
        aux: true,
      },
    };
  },
  validations() {
    return {
      captura_det: {
        codend: { required$ },
        latitude: { decimal$ },
        longitude: { decimal$ },

        metodo: { minValue: combo$(1) },
        ambiente: { minValue: combo$(1) },
        local_captura: { minValue: combo$(1) },
        num_arm: { maxLength: maxLength$(10) },
        hora_inicio: { required$ },
        hora_final: { required$ },
        temp_inicio: { maxValue: maxValue$(50) },
        temp_final: { maxValue: maxValue$(50) },
        umidade_inicio: { maxValue: maxValue$(100) },
        umidade_final: { maxValue: maxValue$(100) },
        amostra: { maxLength: maxLength$(10) },
        quant_potes: { integer$ },
      },
    };
  },
  methods: {
    details() {
      this.$router.push("/captura_dets/" + this.captura_det.id_captura);
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        capturaService
          .createDet(this.captura_det)
          .then((response) => {
            this.showMessage = true;
            this.message = "Captura inserida com sucesso!";
            this.type = "success";
            this.caption = "Captura";
            setTimeout(() => (this.showMessage = false), 3000);
            (error) => {
              this.message = error;
              this.showMessage = true;
              this.type = "alert";
              this.caption = "Captura";
              setTimeout(() => (this.showMessage = false), 3000);
            };
          })
          .finally(() => {
            document.getElementById("login").classList.remove("is-loading");
          });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Captura";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    getAreas() {
      capturaService
        .getCaptura(this.captura_det.id_captura)
        .then((res) => {
          territorioService
            .getAreas(res.data.id_municipio)
            .then((res) => {
              this.area = res.data.area;
            })
            .catch((err) => {
              this.area = [];
            });
        })
        .catch((err) => {
          this.area = [];
        });
    },
    getQuarteirao() {
      territorioService
        .getQuarteiroes(this.captura_det.area)
        .then((res) => {
          this.quarteirao = res.data.quarteirao;
        })
        .catch((err) => {
          this.quarteirao = [];
        });
    },
   /* getCodends(){
      codendService.getCodendsByQuadra(this.captura_det.quadra)
      .then((res) => {
        this.codends = res.data;
      })
      .catch((err) => {
        this.codends = [];
      })
    },*/
    changeComma(e) {
      let str = e.target.value;
      e.target.value = str.replace(/,/g , ".")
    }
  },
  mounted() {},
  created() {
    this.captura_det.id_captura = this.$route.params.master;

    this.getAreas();
  },
  watch: {
    "captura_det.area"(value) {
      let fant_a = this.area.filter((item) => item.id_area === value);
      this.captura_det.fant_area = fant_a[0].codigo;
      this.getQuarteirao(value);
    },
    "captura_det.quadra"(value) {
      let fant_q = this.quarteirao.filter(
        (item) => item.id_quarteirao === value
      );
      this.captura_det.fant_quart = fant_q[0].numero;
   //   this.getCodends();
    },
  },
};
</script>

<style scoped>
.cabeca {
  /*padding: 0 !important;*/
  border-bottom: 1px solid;
  font-weight: bold;
}
</style>
