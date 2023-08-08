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
            <p class="card-header-title is-centered">Atividades da Captura {{ master.codigo }}</p>
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
                  <label class="label">Cod End</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="Quadra"
                      v-model="captura_det.codend"
                    />
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Latitude</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="° decimais"
                      v-model="captura_det.latitude"
                    />
                  </div>
                </div>
                <div class="field column is-3">
                  <label class="label">Longitude</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="° decimais"
                      v-model="captura_det.longitude"
                    />
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
                    />
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Ambiente</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="5"
                      @selValue="captura_det.ambiente = $event"
                    />
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Local de Captura</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="6"
                      @selValue="captura_det.local_captura = $event"
                    />
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Nº AIL</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.num_arm"
                    />
                  </div>
                </div>
                <div class="field column is-one-fifth">
                  <label class="label">Altura AIL</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.altura"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="column is-4 has-text-centered cabeca">Hora</div>
                <div class="column is-4 has-text-centered cabeca">Temperatura (°C)</div>
                <div class="column is-4 has-text-centered cabeca">Umidade (%)</div>
              </div>
              <div class="columns">
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.hora_inicio"
                    />
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.hora_final"
                    />
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.temp_inicio"
                    />
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.temp_final"
                    />
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Inicial</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.umidade_inicio"
                    />
                  </div>
                </div>
                <div class="field column is-2 has-text-centered">
                  <label class="label">Final</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.umidade_final"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-one-fifth has-text-centered">
                  <label class="label">Nº da Amostra</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.amostra"
                    />
                  </div>
                </div>
                <div class="field column is-one-fifth has-text-centered">
                  <label class="label">Nº de Tubos</label>
                  <div class="control">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder=""
                      v-model="captura_det.quant_potes"
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
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import territorioService from "@/services/territorio.service";
import capturaService from "@/services/captura.service";


export default {
  components: {
    Loader,
    Message,
    CmbAuxiliares,
  },
  data() {
    return {
      master: {},
      metodo: [],
      ambiente: [],
      local: [],
      area: [],
      quarteirao: [],
      captura_det: {
        id_captura: 0,
        area: '',
        fant_area: '',
        quadra: '',
        fant_quart: '',
        codend: '',
        latitude: '',
        longitude: '',

        metodo: 0,
        ambiente: 0,
        local_captura: 0,
        num_arm: '',
        altura:'',
        hora_inicio:'', 
        hora_final:'', 
        temp_inicio:'', 
        temp_final:'', 
        umidade_inicio:'', 
        umidade_final:'',
        amostra: '',
        quant_potes: ''
      },

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
  computed: {
  
  },
  methods: {
    details() {
      this.$router.push("/captura_dets/"+this.captura.id_captura);
    },
    create() {
      document.getElementById('login').classList.add('is-loading');

      capturaService.createDet(this.captura_det).then(
        (response) => {
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
        }
      })
      .finally(() => {
        document.getElementById('login').classList.remove('is-loading');
      });

      this.isLoading = false;
      },
    getAreas(){
      capturaService.getCaptura(this.master)
      .then((res) => {
        console.log(res);
        territorioService.getAreas(res.data.id_municipio)
        .then((res) => {
          console.log(res);
          this.area = res.data.area;
        })
        .catch((err) => {
          this.area = [];
        })
      })
      .catch((err) => {
        this.area = [];
      })

      
    },
    getQuarteirao(){
      territorioService.getQuarteiroes(this.captura_det.area)
      .then((res) => {
        this.quarteirao = res.data.quarteirao;
      })
      .catch((err) => {
        this.quarteirao = [];
      })
    },
  },
  mounted() {
    
  },
  created() {
    this.master = this.$route.params.master;
    this.captura_det.id_captura = this.master;

    this.getAreas();
  },
  watch: {
    'captura_det.area'(value) {
      let fant_a = this.area.filter(item => item.id_area === value);
      this.captura_det.fant_area = fant_a[0].codigo;
      this.getQuarteirao(value);
    },
    'captura_det.quarteirao'(value) {
      let fant_q = this.quarteirao.filter(item => item.id_quarteirao === value);
      this.captura_det.fant_quart = fant_q[0].numero;
    }
  },
};
</script>

<style scoped>
  .cabeca{
    /*padding: 0 !important;*/
    border-bottom: 1px solid;
    font-weight: bold;
  }
</style>
