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
            <p class="card-header-title is-centered">Usuário/Município</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field column">
                <label class="label">Informe o nível que deseja alterar:</label>
                <div class="control has-icons-left has-icons-right">
                  <label class="radio">
                    <input
                      type="radio"
                      name="nivel"
                      value="1"
                      v-model="nivel"
                    />
                    1 - Município
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="nivel"
                      value="2"
                      v-model="nivel"
                    />
                    2 - Colegiado
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="nivel"
                      value="3"
                      v-model="nivel"
                    />
                    3 - DRS
                  </label>
                  <label class="radio">
                    <input
                      type="radio"
                      name="nivel"
                      value="4"
                      v-model="nivel"
                    />
                    4 - Regional
                  </label>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-6" v-if="nivel == 1">
                  <label class="label">Município</label>
                  <div class="control">
                    <CmbMunicipio
                      :id_prop="currentUser.id"
                      @selMun="local = $event"
                    />
                  </div>
                </div>
                <div class="column is-6" v-if="nivel == 4">
                  <div class="field">
                    <label class="label">Regional</label>
                    <div class="control">
                      <CmbTerritorio
                        :id_prop="currentUser.id"
                        :tipo="1"
                        @selLoc="local = $event"
                      />
                    </div>
                  </div>
                </div>
                <div class="column is-6" v-if="nivel == 2">
                  <div class="field">
                    <label class="label">Colegiado</label>
                    <div class="control">
                      <CmbTerritorio
                        :id_prop="currentUser.id"
                        :tipo="3"
                        @selLoc="local = $event"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-6" v-if="nivel == 3">
                  <div class="field">
                    <label class="label">DRS</label>
                    <div class="control">
                      <CmbTerritorio
                        :id_prop="currentUser.id"
                        :tipo="2"
                        @selLoc="local = $event"
                      />
                    </div>
                  </div>
                </div>
                <div class="field column is-6" v-if="nivel > 0">
                  <label class="label">Usuário</label>
                  <div class="control">
                    <div class="control">
                      <div class="select">
                        <select
                          v-model="usuario"
                          class="input"
                        >
                          <option value="0">-- Selecione --</option>
                          <option
                            v-for="user in users"
                            :key="user.id_usuario"
                            :value="user.id_usuario"
                        
                          >
                            {{ user.name + '(' + user.username + ')' }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <h5 v-if="nivel == 1">
                    O município escolhido será atribuido ao usuário informado,
                    para gestão de registros vindos do App
                  </h5>
                  <h5 v-if="nivel > 1">
                    Todos os municípios do agrupamento escolhido serão
                    atribuidos ao usuário informado, para gestão de registros
                    vindos do App
                  </h5>
                </div>
              </div>
              <footer class="card-footer" v-if="nivel > 0">
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
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import authService from "@/services/auth.service";
import territorioService from "@/services/territorio.service";

export default {
  data() {
    return {
      users:[],
      nivel: 0,
      local: 0,
      usuario: 0,
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: "Alterar",
        strCancel: "Cancelar",
        strAux: "",
        aux: false,
      },
    };
  },
  components: {
    Message,
    Loader,
    CmbMunicipio,
    CmbTerritorio,
    footerCard,
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    create() {
      territorioService.editPropMun({tipo: this.nivel, id_prop: this.usuario, local: this.local}).then(
          (response) => {
            console.log(response);
            this.showMessage = true;
            this.message = "Alteração realizada!";
            this.type = "success";
            this.caption = "Município";
            setTimeout(() => (this.showMessage = false), 3000);
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Município";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        })
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
    },
    loadData() {
      authService.list()
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.users = [];
      })
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped></style>
