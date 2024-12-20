<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Endereços Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newEnd">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="columns">
                <div class="field column is-3 is-offset-3">
                  <label class="label">Município</label>
                  <div class="control">
                    <CmbListaMun
                        :tabela="tableName"
                        :id_prop="currentUser.id"
                        @selMun="filtMun = $event"
                      />
                  </div>
              </div>
              <div class="field column is-1 is-offset-2">
                  <label class="label">&nbsp;</label>
                  <div class="control">
                    <button class="button is-link is-fullwidth" @click="loadData">
                      <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                      Carregar
                    </button>
                  </div>
              </div>
          </div>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true" :tableName="tableName"/>
          </div>
        </div>
        <div style="display: none">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </span>
          <span class="icon is-small is-left" name="coisa1">
            <font-awesome-icon icon="fa-solid fa-image" />
          </span>
          <span class="icon is-small is-left" name="coisa3">
            <font-awesome-icon icon="fa-solid fa-dog" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import codendService from "@/services/codend.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import CmbListaMun from "@/components/forms/CmbListaMun.vue";

export default {
  name: "ListaEndereços",
  data() {
    return {
      filtMun: 0,
      dataTable: [],
      isLoading: false,
      columns: [],
      tableName: 'codend',
      myspan: null,
      myspan2: null,
      id_user: 0,
      quart: 0,
    };
  },
  components: {
    MyTable,
    Loader,
    ConfirmDialog,
    CmbListaMun,
  },
  methods: {
    newEnd() {
      this.$router.push("/codend");
    },
    editCapt(id) {
      this.$router.push(`/editEnd/${id}`);
    },
    getFormat(row) {
      return {
        "has-text-danger-dark": row.status == 1,
        "has-text-danger": row.status == 2,
        "has-text-info": row.status == 3,
        "has-text-success": row.status == 9,
        "has-text-info": row.status == 7,
      };
    },
    loadData(filter){
      codendService.getCodends(this.filtMun,filter)
      .then((response) => {
        this.dataTable = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));

    this.columns = [
      { title: "Municipio", field: "municipio", minWidth: 200, responsive:1, },
      { title: "Quarteirao", field: "quarteirao", minWidth: 200, responsive: 3, },
      { title: "Código", field: "codigo", minWidth: 200, responsive: 2, },
      { title: "Endereço", field: "endereco", minWidth: 300, responsive: 1, },
      {
        title: "Ações", minWidth: 350, responsive: 0,
        formatter: (cell, formatterParams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement("button");
          btEdit.type = "button";
          btEdit.title = "Editar";
          btEdit.disabled = this.id_user != row.id_usuario;
          btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
          btEdit.classList.add("button", "is-primary", "is-outlined");
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener("click", () => {
            this.$router.push(`/editCod/${row.id_codend}`);
          });

          /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

          const btDel = document.createElement("button");
          btDel.type = "button";
          btDel.title = "Excluir";
          btDel.disabled = this.id_user != row.id_usuario;
          btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
          btDel.classList.add("button", "is-danger", "is-outlined");
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener("click", async () => {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir esse endereço?',
                okButton: 'Confirmar',
            })
            if (ok) {
              codendService.delete(row.id_codend);
              //location.reload();
              this.$router.replace("/codends");
            }          
          });

          const btCaract = document.createElement("button");
          btCaract.type = "button";
          btCaract.title = "Caracterização";
          //btCaract.disabled = this.id_user != row.id_usuario;
          btCaract.style.cssText = "height: fit-content; margin-left: 1rem;";
          btCaract.classList.add("button", "is-info", "is-outlined");
          btCaract.innerHTML = this.myspan1.innerHTML;
          
          btCaract.addEventListener("click", () => { 
            this.$router.push(`/caracteriza/${row.id_codend}/0`);
          });

          const btAnimal = document.createElement("button");
          btAnimal.type = "button";
          btAnimal.title = "Animal";
          //btCaract.disabled = this.id_user != row.id_usuario;
          btAnimal.style.cssText = "height: fit-content; margin-left: 1rem;";
          btAnimal.classList.add("button", "is-success", "is-outlined");
          btAnimal.innerHTML = this.myspan3.innerHTML;

          btAnimal.addEventListener("click", () => {
            this.$router.push(`/editCaninoCodend/${row.id_codend}`);
          });

          const buttonHolder = document.createElement("span");
          buttonHolder.appendChild(btEdit);
          buttonHolder.appendChild(btDel);
          buttonHolder.appendChild(btCaract);
          buttonHolder.appendChild(btAnimal);


          return buttonHolder;
        },
      },
    ];
  },
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName("coisa")[0];
    this.myspan2 = document.getElementsByName("coisa2")[0];
    this.myspan1 = document.getElementsByName("coisa1")[0];
    this.myspan3 = document.getElementsByName("coisa3")[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;
//
   // this.isLoading = true;

    if (this.$route.params.quart){
      var cd = this.$route.params.quart;
      codendService.getCodend(cd)
      .then(
        async (response) => {
          let data = response.data[0];
          this.loadData(data.id_municipio, data.id_quarteirao);
        },
        (error) => {
          console.log(error);
          this.quart = 0;
        }
      );
    } else {
     // this.loadData(0);
    }
    
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  created() {
    
  },
};
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
