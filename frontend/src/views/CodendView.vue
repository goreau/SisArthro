<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-four-fifths">
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
            <p class="card-header-title is-centered">Cadastro de Endereços - CodEnd</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-4">
                <label class="label">Município</label>
                <div class="control">
                  <CmbMunicipio
                      :id_prop="currentUser.id"
                      @selMun="codend.id_municipio = $event"
                    />
                </div>
              </div>
                <div class="field column is-4">
                  <label class="label">Área</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="codend.id_area" class="input">
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
                <div class="field column is-4">
                  <label class="label">Quadra</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="codend.id_quarteirao" class="input">
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
              </div>
              <div class="columns">
                <div class="field column is-6">
                  <label class="label">Logradouro</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.logradouro"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                    </span>
                  </div>
                </div>
                <div class="field column is-2">
                  <label class="label">Número</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.numero"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                    </span>
                  </div>
                </div>
                <div class="field column is-4">
                  <label class="label">Complemento</label>
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
                      type="text"
                      placeholder="Nome"
                      v-model="codend.complemento"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                    </span>
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
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import codendService from "@/services/codend.service";
import territorioService from "@/services/territorio.service";

export default {
  data() {
    return {
      area: [],
      quarteirao: [],
      codend: {
        id_municipio: 0,
        id_area: 0,
        fant_area: '',
        id_quarteirao: 0,
        fant_quart: '',
        logradouro: '',
        numero: '',
        complemento: '',
        id_usuario: 0,
      },
      
      municipio:'',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Salvar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
      }
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
    CmbMunicipio,
  },
  methods: {
    validate(){
      var match = true;// this.old_password === this.user.password;
      if (!match){
        this.message = 'A senha informada não confere. Verifique!';
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Senha atual";
        setTimeout(() => {this.showMessage = false; this.old_password='';}, 3000);
      }
    },
    create() {
      document.getElementById('login').classList.add('is-loading');
      
      codendService.create(this.codend).then(
        (response) => {
          this.showMessage = true;
          this.message = "Endereço cadastrado.";
          this.type = "success";
          this.caption = "CodEnd";
          setTimeout(() => (this.showMessage = false), 3000);
        },
        (error) => {
          this.message = error;
          this.showMessage = true;
          this.type = "alert";
          this.caption = "CodEnd";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      )
      .finally(() => {
        document.getElementById('login').classList.remove('is-loading');
      });
    },
    getAreas(mun){
      territorioService.getAreas(mun)
        .then((res) => {
          console.log(res);
          this.area = res.data.area;
        })
        .catch((err) => {
          this.area = [];
        })
    },
    getQuarteirao(area){
      territorioService.getQuarteiroes(area)
      .then((res) => {
        this.quarteirao = res.data.quarteirao;
      })
      .catch((err) => {
        this.quarteirao = [];
      })
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.codend.id_usuario = cUser.id;
    }
    
  },
  watch: {
    'codend.id_municipio'(value) {
      this.getAreas(value);
    },
    'codend.id_area'(value) {
      let fant_a = this.area.filter(item => item.id_area === value);
      this.codend.fant_area = fant_a[0].codigo;
      this.getQuarteirao(value);
    },
    'codend.id_quarteirao'(value) {
      let fant_q = this.quarteirao.filter(item => item.id_quarteirao === value);
      this.codend.fant_quart = fant_q[0].numero;
    }
  },
};
</script>

<style scoped></style>
