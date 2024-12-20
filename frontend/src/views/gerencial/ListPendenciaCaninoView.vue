<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader v-if="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true"
                            :tableName="tableName" />
                    </div>
                </div>
                <div style="display: none">
                    <span class="icon is-small is-left" name="coisa">
                        <font-awesome-icon icon="fa-solid fa-edit" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import caninoService from "@/services/canino.service";
import { gerarPDF } from './caninoPend.js';
import { gerarPDFRisco } from './caninoInquerito.js';
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";

export default {
    name: "ListaEndereços",
    data() {
        return {
            dataTable: [],
            isLoading: false,
            columns: [],
            tableName: 'pendcanino',
            myspan: null,
            myspan2: null,
            id_user: 0,
            quart: 0,
            tipo: 1,
            title: '',
        };
    },
    components: {
        MyTable,
        Loader,
    },
    methods: {
        gerar(quart) {
            if (this.tipo == 1){
                caninoService.getPendencias(quart).then(
                    (response) => {
                        let data = response.data;
                        gerarPDF(data);  
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
                        this.caption = "Ajuda";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                );
            } else {
                caninoService.getInquerito(quart).then(
                    (response) => {
                        let data = response.data;
                        gerarPDFRisco(data);  
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
                        this.caption = "Ajuda";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                );
            }

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
        loadData(filter) {
            if (this.tipo == 1) {
                caninoService.getListPendencia()
                    .then((response) => {
                        this.dataTable = response.data;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => (this.isLoading = false));

                this.columns = [
                    { title: "Municipio", field: "municipio", minWidth: 200, responsive: 1, },
                    { title: "Área", field: "area", minWidth: 200, responsive: 3, },
                    { title: "Quarteirao", field: "quarteirao", minWidth: 200, responsive: 3, },
                    { title: "Total Pendentes", field: "pendentes", minWidth: 200, responsive: 2, },
                    {
                        title: "Ações", minWidth: 350, responsive: 0,
                        formatter: (cell, formatterParams) => {
                            const row = cell.getRow().getData();

                            const btBoletim = document.createElement("button");
                            btBoletim.type = "button";
                            btBoletim.title = "Boletim";
                            btBoletim.style.cssText = "height: fit-content; margin-left: 1rem;";
                            btBoletim.classList.add("button", "is-info", "is-outlined");
                            btBoletim.innerHTML = this.myspan.innerHTML;
                            btBoletim.addEventListener("click", () => {
                                this.gerar(row.id_quarteirao);
                            });

                            const buttonHolder = document.createElement("span");
                            buttonHolder.appendChild(btBoletim);



                            return buttonHolder;
                        },
                    },
                ];
            } else {
                caninoService.getListInquerito()
                    .then((response) => {
                        this.dataTable = response.data;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => (this.isLoading = false));

                this.columns = [
                    { title: "Municipio", field: "municipio", minWidth: 200, responsive: 1, },
                    { title: "Área", field: "area", minWidth: 200, responsive: 3, },
                    { title: "Quarteirao", field: "quarteirao", minWidth: 200, responsive: 3, },
                    { title: "Total Animais", field: "animais", minWidth: 200, responsive: 2, },
                    {
                        title: "Ações", minWidth: 350, responsive: 0,
                        formatter: (cell, formatterParams) => {
                            const row = cell.getRow().getData();

                            const btBoletim = document.createElement("button");
                            btBoletim.type = "button";
                            btBoletim.title = "Boletim";
                            btBoletim.style.cssText = "height: fit-content; margin-left: 1rem;";
                            btBoletim.classList.add("button", "is-info", "is-outlined");
                            btBoletim.innerHTML = this.myspan.innerHTML;
                            btBoletim.addEventListener("click", () => {
                                this.gerar(row.id_quarteirao);
                            });

                            const buttonHolder = document.createElement("span");
                            buttonHolder.appendChild(btBoletim);



                            return buttonHolder;
                        },
                    },
                ];
            }



        },
    },
    mounted() {
        this.id_user = this.currentUser.id;

        this.myspan = document.getElementsByName("coisa")[0];

        this.tipo = this.$route.params.id;

        this.title = this.tipo == 1 ? 'Imóveis Pendentes no Cadastro de Cães' : 'Imóveis para Inquérito Canino';

        this.loadData(0);

    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },

};
</script>

<style scoped>
.button {
    margin-right: 1rem;
}
</style>