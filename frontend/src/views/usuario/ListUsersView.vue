<template>
  <div class="main-container">

    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />

        <div class="card">
          <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
          <header class="card-header">
            <p class="card-header-title is-centered">Usuários Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newUser">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns" :pagination="true"
              :buttons="['edit', 'delete', 'reset', 'impersonate']" :has-exports="true" @edit="onEditRow"
              :calcHeight="false" @delete="onDeleteRow" @impersonate="onImpersonate" @reset="onReset"
              :deletedId="delId" />
          </div>

        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import authService from "@/services/auth.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: 'ListaUsers',
  data() {
    return {
      dataTable: [],
      isLoading: false,
      columns: [],
      tableName: 'users',
      delId: null,
      id_user: 0,
      tpUser: 0,
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
    }
  },
  components: {
    Message,
    MyTable,
    Loader,
    ConfirmDialog

  },
  methods: {
    newUser() {
      this.$router.push('/user');
    },
    onEditRow(id) {
      this.$router.push(`/editUser/${id}`);
    },
    onImpersonate(id) {
      const row = this.dataTable.find(item => item.id === id);
      const user = { username: row.username, password: 'AH@g654321' }
      const resp = authService.impersonate(user)
        .then((resp) => {
          console.log(resp)
          this.$store.dispatch('auth/impersonate', resp);
          this.$router.push({ name: 'home' });
        },
          (error) => {
            this.message = error;

            this.showMessage = true;
            this.type = "alert";
            this.caption = "Usuário";
            setTimeout(() => (this.showMessage = false), 3000);
          })
        .catch((error) => {
          this.message = error;

          this.showMessage = true;
          this.type = "alert";
          this.caption = "Usuário";
          setTimeout(() => (this.showMessage = false), 3000);
        })
    },
    async onReset(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Resetar',
        message: 'Deseja mesmo restaurar a senha desse usuário para o padrão inicial?',
        okButton: 'Confirmar',
      })
      if (ok) {
        authService.resetSenha({ id: id }).then(
          (response) => {
            this.showMessage = true;
            this.message = "Senha do usuário restaurada com sucesso.";
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async onDeleteRow(id) {
      const ok = await this.$refs.confirmDialog.show({
        title: 'Excluir',
        message: 'Deseja mesmo excluir esse usuário?',
        okButton: 'Confirmar',
      })
      if (ok) {
        authService.delete(id);
        this.delId = id;
      }
    },
    getFormat(row) {
      return {
        'has-text-danger-dark': row.status == 1,
        'has-text-danger': row.status == 2,
        'has-text-info': row.status == 3,
        'has-text-success': row.status == 9,
        'has-text-info': row.status == 7
      }
    }
  },
  closeMessage() {
    alert('funfa')
    this.showMessage = false;
  },
  mounted() {
    this.id_user = this.currentUser.id;
    this.tpUser = this.currentUser.role;

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.isLoading = true;
    authService.list()
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.isLoading = false);

    this.columns = [
      { headerName: 'ID', field: 'id', hide: true },
      { headerName: 'Nome', field: 'name', },
      { headerName: 'Login', field: 'username', },
      { headerName: 'Município', field: 'municipio', },
      { headerName: 'Nivel', field: 'role', },
      { headerName: 'Prop', field: 'owner_id', hide: true },
    ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
}
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>