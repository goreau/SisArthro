<template>
    <div class="main-container">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                    Acesso
                  </p>
              </header>
              <div class="card-content">
                <div class="content">                
                  <div class="field">
                    <label class="label">Login</label>
                    <div class="control has-icons-left has-icons-right">
                      <input class="input is-danger" type="text" placeholder="Nome de usuário" v-model="username">
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="fa-solid fa-user" />
                      </span>
                    </div>
                  </div>
                  <div class="field">
                      <label class="label">Senha</label>
                      <div class="control">
                          <input class="input" type="password" v-model="password" placeholder="Sua senha">
                      </div>
                  </div>
                  <!--<a href="#" @click="openCadastro">Ainda não tenho cadastro</a>-->
                </div>
              </div>
              <footer class="card-footer">
                <footerCard @submit="login" @cancel="null" @aux="details" :cFooter="cFooter" />
              </footer>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import Message from '@/components/general/Message.vue'
  import footerCard from '@/components/forms/FooterCard.vue'
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        isLoading: false,
        message: '',
        caption: '',
        type: '',
        showMessage: false,
        cFooter:{
          strSubmit:'Entrar',
          strCancel: 'Cancelar',
          strAux:'',
          aux: false
        }
      }
    },
    components: {
      Message,
      footerCard
    },
    created() {
      document.getElementById('main').className = "main_colapsed";
      this.$store.dispatch("auth/logout").then(() => {});
    },
    methods: {
      login() {
        document.getElementById('login').classList.add('is-loading');
        let user = {
          username: this.username,
          password: this.password
        }
  
        this.$store.dispatch("auth/login", user)
          .then(
            () => {
              document.getElementById('main').className = "main";
              this.$router.push({ name: 'home' });
            },
            (error) => {
              this.isLoading = false;
              this.showMessage = true;
              this.type = 'alert';
              this.caption = 'Erro';
              this.message = error;
             /* (error.response &&
                error.response.data) ||
              error.message ||
              error.toString();*/
              setTimeout(() => this.showMessage = false, 3000);
            }
          )
          .finally(() => {
            document.getElementById('login').classList.remove('is-loading');
          });
      },
      cancelRegister(){
        this.isRegistering = false;
      },
      registerOk() {
        this.isRegistering = false;
      }
    }
  
  }
  
  </script>
  
  <style scoped>
  .card-footer {
      padding: 1rem;
  }
  
  .card-footer .button {
      width: 100%;
  }

  
  </style>