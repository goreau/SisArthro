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
            <p class="card-header-title is-centered">Usuário</p>
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
                <label class="label">Local</label>
                <div class="control" v-if="user.role == 3 || user.role == 0">
                  <CmbMunicipio
                    :id_prop="currentUser.id"
                    @selMun="user.id_municipio = $event"
                    :errclass="{ 'is-danger': v$.user.id_municipio.$error }"
                  />
                  <span class="is-error" v-if="v$.user.id_municipio.$error">
                    {{ v$.user.id_municipio.$errors[0].$message }}
                  </span>
                </div>
                <div class="control" v-if="user.role == 2">
                  <CmbTerritorio
                        :id_prop="currentUser.id"
                        :tipo="1"
                        @selLoc="user.id_municipio = $event"
                        :errclass="{ 'is-danger': v$.user.id_municipio.$error }"
                      />
                  <span class="is-error" v-if="v$.user.id_municipio.$error">
                    {{ v$.user.id_municipio.$errors[0].$message }}
                  </span>
                </div>
                <div class="control" v-if="user.role == 1">
                  <CmbTerritorio
                        :id_prop="currentUser.id"
                        :tipo="99"
                        @selLoc="user.id_municipio = $event"
                        :errclass="{ 'is-danger': v$.user.id_municipio.$error }"
                      />
                  <span class="is-error" v-if="v$.user.id_municipio.$error">
                    {{ v$.user.id_municipio.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Nível</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="1"
                      v-model="user.role"
                      :disabled="currentUser.role > 1"
                    />
                    Administrador
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="2"
                      v-model="user.role"
                      :disabled="currentUser.role > 2"
                    />
                    Regional
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="role"
                      value="3"
                      v-model="user.role"
                    />
                    Município
                  </label>
                </div>
                <span class="is-error" v-if="v$.user.role.$error">
                    {{ v$.user.role.$errors[0].$message }}
                </span>
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
                    :class="{ 'is-danger': v$.user.username.$error }"
                  />
                  <span class="is-error" v-if="v$.user.username.$error">
                    {{ v$.user.username.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="user.password"
                    placeholder="Informe a senha"
                    :class="{ 'is-danger': v$.user.password.$error }"
                  />
                  <span class="is-error" v-if="v$.user.password.$error">
                    {{ v$.user.password.$errors[0].$message }}
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
            <footerCard @submit="register" @cancel="null" @aux="details" :cFooter="cFooter" />
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
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import authService from "@/services/auth.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
  email$,
  sameAs$
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      user: {
        name: "",
        username: "",
        password: "",
        email: "",
        id_municipio: 0,
        role: 0,
        id_prop: 0,
      },
      senha: '',
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter:{
          strSubmit:'Cadastrar',
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
        username: {required$, minLength: minLength$(5)},
        password: {required$, minLength: minLength$(4)},
        email: {required$, email$},
        id_municipio: {minValue: combo$(1)},
        role: { minValue: combo$(1) },
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
    CmbTerritorio,
    footerCard
  },
  methods: {
    register() {
      this.v$.$validate(); 
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        authService.register(this.user).then(
          (response) => {
            this.showMessage = true;
            this.msg = "Usuário cadastrado comm sucesso.";
            this.type = "success";
            this.caption = "Usuário";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.msg = error.data.err;
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
        this.caption = "Usuário";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    trocaNivel(ev){

    }
  },
  mounted() {
    this.user.id_prop = this.currentUser.id;
  },
};
</script>

<style scoped></style>
