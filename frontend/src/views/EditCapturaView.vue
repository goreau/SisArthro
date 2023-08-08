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
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
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
                      :value="edt_date"
                      placeholder="Data da atividade"
                      :config="{ dateFormat: 'd/m/Y', static: true, onChange: setDate }"
                    />
                  </div>
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
                </div>
                <div class="field column is-3">
                  <label class="label">&nbsp;</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="captura.exec_3"
                      :disabled="captura.execucao < 3"
                    />
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
                    />
                  </div>
                </div>
                <div class="field column is-6">
                  <label class="label">CodSis - Município</label>
                  <div class="control">
                    <CmbMunicipio
                      :id_prop="currentUser.id" :sel="captura.id_municipio"
                      @selMun="captura.id_municipio = $event"
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
                    />
                  </div>
                </div>
                <div class="field column is-5">
                  <label class="label">Atividade</label>
                  <div class="control">
                    <CmbAuxiliares
                      :tipo="3" :sel="captura.atividade"
                      @selValue="captura.atividade = $event"
                    />
                  </div>
                </div>
              </div>
              <!---->
              <div class="columns">
                <div class="field column is-4">
                  <label class="label">Equipe</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="Nome da localidade"
                      v-model="captura.equipe"
                    />
                  </div>
                </div>
                <div class="field column is-7">
                  <label class="label">Observação</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
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
            <footerCard @submit="edit" @cancel="" @aux="details" :cFooter="cFooter" />
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
import footerCard from '@/components/forms/FooterCard.vue'
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import capturaService from "@/services/captura.service";
import moment from 'moment';


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
    details(){
      this.$router.push("/captura_dets/"+this.captura.id_captura);
    },
    edit() {
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
