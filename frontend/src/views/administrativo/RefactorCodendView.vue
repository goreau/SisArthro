<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-four-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Refatorar Codend</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="field column is-6">
                  <label class="label">Município</label>
                  <div class="select">
                    <select v-model="id_municipio" class="input">
                      <option value="0">-- Selecione --</option>
                      <option v-for="reg in municipios" :key="reg.id_municipio" :value="reg.id_municipio">
                        {{ reg.nome }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="column is-6">
                  <div class="field">
                    <label class="label">Quarteirão</label>
                    <div class="select">
                      <select v-model="id_quarteirao" class="input">
                        <option value="0">-- Selecione --</option>
                        <option v-for="reg in quarteiraos" :key="reg.id_quarteirao" :value="reg.id_quarteirao">
                          {{ reg.numero }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <footerCard @submit="refactor" @cancel="null" @aux="details" :cFooter="cFooter" />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import codendService from "@/services/codend.service";

export default {
  data() {
    return {
      municipios: [],
      quarteiraos: [],
      id_municipio: 0,
      id_quarteirao: 0,
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
    footerCard,
    ConfirmDialog,
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  methods: {
    async refactor() {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Refatorar',
        message: 'Deseja mesmo alterar os Codends dos itens selecionados?',
        okButton: 'Confirmar',
      })
      if (ok) {
        var filt = { id_municipio: this.id_municipio, id_quarteirao: this.id_quarteirao };
        codendService.refactor(filt).then(
          (response) => {
            console.log(response);
            this.showMessage = true;
            this.message = response.data.master + ' ' + response.data.msg;
            this.type = "success";
            this.caption = "Codend";
            setTimeout(() => (this.showMessage = false), 3000);
            (error) => {
              this.message = error;
              this.showMessage = true;
              this.type = "alert";
              this.caption = "Codend";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          })
          .finally(() => {
            document.getElementById('login').classList.remove('is-loading');
          });
      }
    },
    loadMuns() {
      codendService.getMuns()
        .then((res) => {
          this.municipios = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.municipios = [];
        });
  },
  loadQuarts(mun) {
    codendService.getQuarts(mun)
      .then((res) => {
        this.quarteiraos = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.quarteiraos = [];
      })
  }
},
mounted() {
  this.loadMuns();
},
watch: {
  'id_municipio'(value) {
    this.loadQuarts(value);
  },
}
  };
</script>

<style lang="scss" scoped></style>