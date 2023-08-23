<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
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
            <p class="card-header-title is-centered">Localidade</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Município</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="municipio"
                    readonly
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="loc.nome"
                    :class="{ 'is-danger': v$.loc.nome.$error }"
                  />
                  <span class="is-error" v-if="v$.loc.nome.$error">
                    {{ v$.loc.nome.$errors[0].$message }}
                  </span>
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
import footerCard from "@/components/forms/FooterCard.vue";
import localidadeService from "@/services/localidade.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  minLength$,
  maxLength$,
} from "../components/forms/validators.js";

export default {
  data() {
    return {
      loc: {
        id_localidade: 0,
        nome: "",
        id_municipio: 0,
        id_usuario: 0,
      },
      v$: useValidate(),
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
  validations() {
    return {
      loc: {
        nome: {
          required$,
          minLength: minLength$(3),
          maxLength: maxLength$(100)
        }
      },
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
    footerCard
  },
  methods: {
    edit() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');
        
        localidadeService.edit(this.loc).then(
          (response) => {
            this.showMessage = true;
            this.message = "Localidade alterada.";
            this.type = "success";
            this.caption = "Localidade";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Localidade";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
      } else {
        this.message = "Corrija os erros para enviar a informação";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Localidade";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    loadData() {
      this.isLoading = true;

      localidadeService.getLocalidade(this.loc.id_localidade).then(
        (response) => {
          let data = response.data[0];
          this.loc.id_municipio = data.id_municipio;
          this.loc.nome = data.nome;
          this.municipio = data.municipio;
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
          this.caption = "Localidade";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
  },
  created() {
    this.loc.id_localidade = this.$route.params.id;
    this.loadData();
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.loc.id_usuario = cUser.id;
    }
    
  },
};
</script>

<style scoped></style>
