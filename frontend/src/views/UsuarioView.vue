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
                  <CmbMunicipio
                    :id_prop="currentUser.id"
                    @selMun="user.id_municipio = $event"
                  />
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
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
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
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="user.password"
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
                    <button class="button is-link submit-btn is-fullwidth" @click="register">
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
        password: "",
        email: "",
        id_municipio: 0,
        role: 0,
        id_prop: 0,
      },
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
    register() {
      this.isLoading = true;

      authService.register(this.user).then(
        (response) => {
          this.showMessage = true;
          this.msg = "Usuário cadastrado comm sucesso.";
          this.type = "success";
          this.caption = "Usuário";
          setTimeout(() => (this.showMessage = false), 3000);
        },
        (error) => {
          this.msg =
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
    this.user.id_prop = this.currentUser.id;
  },
};
</script>

<style scoped></style>
