<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-8">
                <Loader v-if="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
                            :pagination="true" :buttons="['boletim']" :has-exports="true" @boletim="gerar"
                            :calcHeight="false" />
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
import caracterizaService from "@/services/caracteriza.service";
import { gerarPDF } from './boletimPend.js';
import { gerarPDFRisco } from './boletimRisco.js';
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";

export default {
    name: "ListaEndereços",
    data() {
        return {
            dataTable: [],
            isLoading: false,
            columns: [],
            tableName: 'pendcaracteriza',
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
        onEditRow(id) {
            this.gerar(id);
        },
        gerar(quart) {
            if (this.tipo == 1) {
                caracterizaService.getPendencias(quart).then(
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
                caracterizaService.getRiscos(quart).then(
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
                caracterizaService.getListPendencia()
                    .then((response) => {
                        this.dataTable = response.data;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => (this.isLoading = false));

                this.columns = [
                    { headerName: 'ID', field: 'id', hide: true },
                    { headerName: "Municipio", field: "municipio" },
                    { headerName: "Área", field: "area" },
                    { headerName: "Quarteirao", field: "quarteirao" },
                    { headerName: "Total Pendentes", field: "pendentes" },
                ];
            } else {
                caracterizaService.getListRisco()
                    .then((response) => {
                        this.dataTable = response.data;
                        this.isLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => (this.isLoading = false));

                this.columns = [
                    { headerName: 'ID', field: 'id', hide: true },
                    { headername: "Municipio", field: "municipio" },
                    { headername: "Área", field: "area" },
                    { headername: "Quarteirao", field: "quarteirao" },
                    { headername: "Total Im Risco", field: "risco" },
                ];
            }
        },
    },
    mounted() {
        this.id_user = this.currentUser.id;
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    watch: {
        // Escuta mudanças especificamente no parâmetro "id"
        '$route.params.id': {
            handler(newId) {
                // 1. Atualiza o tipo
                this.tipo = newId;

                // 2. Atualiza o título baseado no novo ID
                this.title = this.tipo == 1
                    ? 'Imóveis Pendentes na Caracterização'
                    : 'Imóveis de Risco';

                // 3. Recarrega os dados da API/Store
                this.loadData(0);
            },
            immediate: true // Isso faz a lógica rodar assim que o componente é criado
        }
    },
};
</script>

<style scoped>
.button {
    margin-right: 1rem;
}
</style>