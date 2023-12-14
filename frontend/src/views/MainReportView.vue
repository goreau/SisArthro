<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
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
            <p class="card-header-title is-centered">Relatórios</p>
          </header>
          <div class="card-content">
            <div class="content">
              <section class="section">
                <div class="field column is-10 dvTipo">
                  <label class="label">Tipo de Relatório:</label>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column is-6">
                        <label class="radio">
                          <input
                            type="radio"
                            name="execucao"
                            value="1"
                            v-model="tipo_relat"
                          />
                          1 - Capturas </label
                        ><label class="radio" v-if="currentUser.role == 1">
                          <input
                            type="radio"
                            name="execucao"
                            value="101"
                            v-model="tipo_relat" 
                          />
                          3 - Extrato de Capturas
                        </label>
                      </div>
                      <div class="column is-6">
                        <label class="radio">
                          <input
                            type="radio"
                            name="execucao"
                            value="2"
                            v-model="tipo_relat"
                          />
                          2 - Identificações </label
                        ><label class="radio" v-if="currentUser.role == 1">
                          <input
                            type="radio"
                            name="execucao"
                            value="102"
                            v-model="tipo_relat"
                          />
                          4 - Extrato de Identificações
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section" v-show="tipo_relat > 0">
                <div class="dvTipo">
                  <label class="label">Filtros:</label>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">DRS</label>
                        <div class="control">
                          <CmbTerritorio
                            :id_prop="currentUser.id" :tipo="2" :sel="filter.id_drs"
                            @selLoc="filter.id_drs = $event"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">GVE</label>
                        <div class="control">
                          <CmbTerritorio
                            :id_prop="currentUser.id" :tipo="4" :sel="filter.id_gve"
                            @selLoc="filter.id_gve = $event"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Município</label>
                        <div class="control">
                          <CmbMunicipio
                            :id_prop="currentUser.id" :sel="filter.id_municipio"
                            @selMun="filter.id_municipio = $event"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-half">
                      <label class="label">Início</label>
                      <div class="field">                        
                        <div class="control">
                          <input type="date" id="dtIni">
                        </div>
                      </div>
                    </div>

                    <div class="column is-half">
                      <label class="label">Final</label>
                      <div class="field">                       
                        <div class="control">
                          <input type="date" id="dtFim">
                        </div>                       
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section" v-if="tipo_relat > 0">
                <div class="columns is-centered">
                  <div class="column is-4">
                    <div class="control">
                      <button
                        class="button is-link submit-btn is-fullwidth"
                        id="login"
                        @click="processar"
                      >
                        <span class="btico"
                          ><font-awesome-icon icon="fa-solid fa-check"
                        /></span>
                        Processar
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard
              @submit="create"
              @cancel="null"
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
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue"
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css"; 
import moment from 'moment';

export default {
  data() {
    return {
      tipo_relat: 0,
      filter: {
        id_gve: 0,
        id_drs: 0,
        id_municipio: 0,
        dt_inicio: "",
        dt_final: "",
      },
      ini_date: '',
      fim_date: '',
      id_usuario: 0,
      municipio: "",
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
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
    CmbTerritorio,
    CmbMunicipio,
  },
  methods: {
    processar() {
      localStorage.setItem('filter', JSON.stringify(this.filter));

      if(this.tipo_relat > 100){
        this.$router.push(`/report/${this.tipo_relat}`);
      } else {
        this.$router.push(`/reportN/${this.tipo_relat}`);
      }
    },
    setDateIni($event) {
      if ($event && $event.length > 0) {
        this.filter.dt_inicio = moment(String($event)).format("YYYY-MM-DD");
      } else {
        this.filter.dt_inicio = '';
      }
    },
    setDateFim($event ) {
      if ($event && $event.length > 0) {
        this.filter.dt_final = moment(String($event)).format("YYYY-MM-DD");
      } else {
        this.filter.dt_final = '';
      }
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.id_usuario = cUser.id;
    }

    var obj = localStorage.getItem('filter');
    if(obj){
      this.filter = JSON.parse(obj);
    
      this.ini_date = this.filter.dt_inicio == '' ? '' :  moment(String(this.filter.dt_inicio)).format('DD/MM/YYYY');
      this.fim_date = this.filter.dt_final == '' ? '' : moment(String(this.filter.dt_final)).format('DD/MM/YYYY');
    }

    var options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      dateStart: this.ini_date,
      showHeader: false,
      color: "info",
      cancelLabel: 'Cancelar',
      showClearButton: false,
      todayLabel: 'Hoje'
    };

    var calini = bulmaCalendar.attach('#dtIni', options);

    const element = document.querySelector('#dtIni');

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.filter.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }

    options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      dateStart: this.fim_date,
      showHeader: false,
      color: "info",
      cancelLabel: 'Cancelar',
      showClearButton: false,
      todayLabel: 'Hoje'
    };

    var calfim = bulmaCalendar.attach('#dtFim', options);

    const element2 = document.querySelector('#dtFim');
    
    if (element2) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element2.bulmaCalendar.on('select', datepicker => {
        this.filter.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }

  },
};
</script>

<style scoped>
.submit-btn {
    background-color: #4f52a3;
    color: #e6e2db;
    font-weight: bold;
    border: 2px solid #13156e;
    padding: 1rem;
    font-size: 1rem;
    margin: 0 auto;
    cursor: pointer;
    transition: 0.5s;
}
.submit-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}
.btico {
    padding-right: 2rem;
    margin-left: -2rem;
}
section {
  padding: .5rem;
}
.radio {
  margin-left: 1rem !important;
  width: 100%;
}
.flatpickr-input {
  width: auto;
}

.flatpickr-input[readonly] {
  width: auto;
}

.dvTipo {
    border: 1px solid #aaa;
    border-radius: 4px;
    position: relative;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    width: 100%;
}
</style>
