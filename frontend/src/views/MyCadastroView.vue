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
            <p class="card-header-title is-centered">Meu Cadastro</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="user.name"
                    :class="{ 'is-danger': v$.user.name.$error }"
                  />
                  <span class="is-error" v-if="v$.user.name.$error">
                    {{ v$.user.name.$errors[0].$message }}
                  </span>
                </div>
              </div>
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
                <label class="label">Nível</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio" v-if="user.role==1">
                    <input
                      type="radio"
                      name="role"
                      value="1"
                      checked="checked"
                    />
                    Administrador
                  </label>
                  <label class="radio" v-if="user.role==2">
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      checked="checked"
                    />
                    Regional
                  </label>
                  <label class="radio"  v-if="user.role==3">
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      checked="checked"
                    />
                    Município
                  </label>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="E-mail"
                    v-model="user.email"
                    :class="{ 'is-danger': v$.user.email.$error }"
                  />
                  <span class="is-error" v-if="v$.user.email.$error">
                    {{ v$.user.email.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Login</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome de usuário"
                    v-model="user.username"
                    readonly
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Senha Atual</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="user.old_password"
                    placeholder="Informe a senha"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Nova Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="user.new_password"
                    placeholder="Confirme a senha"
                    :class="{ 'is-danger': v$.user.new_password.$error }"
                  />
                  <span class="is-error" v-if="v$.user.new_password.$error">
                    {{ v$.user.new_password.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Confirme a Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="senha"
                    placeholder="Confirme a senha"
                    :class="{ 'is-danger': v$.senha.$error }"
                  />
                  <span class="is-error" v-if="v$.senha.$error">
                    {{ v$.senha.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="login" @cancel="" @aux="details" :cFooter="cFooter" />
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
import footerCard from '@/components/forms/FooterCard.vue'
import authService from "@/services/auth.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  minLength$,
  email$,
  sameAs$
} from "../components/forms/validators.js";

export default {
  data() {
    return {
      user: {
        name: "",
        username: "",
        old_password: '',
        new_password: '',
        email: "",
        id_municipio: 0,
        role: 0,
        id_usuario: 1,
      },
      senha: '',
      v$: useValidate(),
      municipio:'',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Entrar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
        }
    };
  },
  validations(){
    return {
      user: {
        name: {required$, minLength: minLength$(10)},
        new_password: {required$, minLength: minLength$(4)},
        email: {required$, email$},
      },
      senha: {sameAs: sameAs$(this.user.password)}
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/isLogged"];
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbMunicipio,
    footerCard
  },
  methods: {  
    update() {
      this.v$.$validate(); 
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        authService.update(this.user).then(
          (response) => {
            this.showMessage = true;
            this.message = "Seu cadastro foi alterado com sucesso.";
            this.type = "success";
            this.caption = "Meu Cadastro";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Usuário";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
        .finally(() => {
            document.getElementById("login").classList.remove("is-loading");
          });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Meu Cadastro";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    loadData() {
      this.isLoading = true;

      authService.getUserData(this.user.id_usuario).then(
        (response) => {
          let data = response.data;
          this.user.name = data.name;
          this.user.email = data.email;
          this.municipio = data.municipio;
          this.user.role = data.role;
          this.user.password = data.password;
          this.user.username = data.username;
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
  mounted() {
    let cUser = this.currentUser;
    if (cUser){
      this.user.id_usuario = cUser.id;
    }
    
    this.loadData();
  },
};
</script>

<style scoped></style>
