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
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-danger"
                    type="text"
                    placeholder="Nome"
                    v-model="user.name"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Município</label>
                <div class="control">
                  <input
                    class="input is-danger"
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
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-danger"
                    type="text"
                    placeholder="E-mail"
                    v-model="user.email"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Login</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-danger"
                    type="text"
                    placeholder="Nome de usuário"
                    v-model="user.username"
                    readonly
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </span>
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
                  />
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="column is-full">
              <div class="columns is-centered">
                <div class="column is-4">
                  <div class="control">
                    <button class="button is-link submit-btn is-fullwidth" @click="update">
                      Salvar
                    </button>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="control">
                    <button class="button is-link is-light is-fullwidth">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
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
import authService from "@/services/auth.service";

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
      
      municipio:'',
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
    };
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
  },
  methods: {
    validate(){
      var match = this.old_password === this.user.password;
      if (!match){
        this.message = 'A senha informada não confere. Verifique!';
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Senha atual";
        setTimeout(() => {this.showMessage = false; this.old_password='';}, 3000);
      }
    },
    update() {
      this.isLoading = true;
      
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
      );

      this.isLoading = false;
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
