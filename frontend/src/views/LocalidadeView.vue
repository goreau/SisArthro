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
                  <CmbMunicipio
                      :id_prop="currentUser.id"
                      @selMun="loc.id_municipio = $event"
                    />
                </div>
              </div>
              <div class="field">
                <label class="label">Nome</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input is-danger"
                    type="text"
                    placeholder="Nome"
                    v-model="loc.nome"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="column is-full">
              <div class="columns is-centered">
               
                <div class="column is-4">
                  <div class="control">
                    <button class="button is-link submit-btn is-fullwidth" @click="create">
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
import localidadeService from "@/services/localidade.service";

export default {
  data() {
    return {
      loc: {
        nome: "",
        id_municipio: 0,
        id_usuario: 0,
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
      this.isLoading = true;
      
      localidadeService.create(this.loc).then(
        (response) => {
          this.showMessage = true;
          this.message = "Localidade cadastrada.";
          this.type = "success";
          this.caption = "Localidade";
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
