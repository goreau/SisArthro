<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Exclusão Segura</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <section v-show="!hasData">
                                <div class="columnns is-centered">
                                    <div class="column is-8 is-offset-2">
                                        <fieldset class="fieldset">
                                            <legend>Filtros</legend>
                                            <div class="columns">
                                                <div class="field column">
                                                    <label class="label">Tipo:</label>
                                                    <div class="control has-icons-left has-icons-right">
                                                        <label v-for="lbl in labels" :key="lbl.id" class="radio">
                                                            <input type="radio" name="tipo" :value="lbl.id"
                                                                v-model="filtro.tipo" />
                                                            {{ lbl.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="field column is-6">
                                                    <label class="label">Município</label>
                                                    <div class="control">
                                                        <CmbMunicipio :id_prop="currentUser.id"
                                                            @selMun="filtro.id_municipio = $event" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <button class="button is-primary is-outlined"
                                                        :disabled="filtro.tipo == 0" @click="getRows">
                                                        <span class="icon">
                                                            <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                                        </span>
                                                        <span>Consultar</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </section>
                            <section v-show="hasData">
                                <MyTable :loggedUser="{ id: id_registro, tipo: tpUser }" :data="dataTable"
                                    :columns="columns" :pagination="false" :buttons="[]" :has-exports="false"
                                    :calcHeight="false" persistence-id="RemoveUser" />

                                <div class="columns is-centered">
                                    <div class="column">
                                        <div class="field column is-6">
                                            <label class="label">{{ lblTroca }} a remover</label>
                                            <div class="control">
                                                <div class="control">
                                                    <div class="select">
                                                        <select v-model="registro.sai" class="input">
                                                            <option value="0">-- Selecione --</option>
                                                            <option v-for="reg in dataTable" :key="reg.id"
                                                                :value="reg.id">
                                                                {{ reg.nome }} ( ID {{ reg.id }} )
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field column is-6">
                                            <label class="label">{{ lblTroca }} que receberá</label>
                                            <div class="control">
                                                <div class="control">
                                                    <div class="select">
                                                        <select v-model="registro.fica" class="input">
                                                            <option value="0">-- Selecione --</option>
                                                            <option v-for="reg in dataTable" :key="reg.id"
                                                                :value="reg.id">
                                                                {{ reg.nome }} ( ID {{ reg.id }} )
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="columns">
                                    <div class="column"><button class="button is-danger is-outlined"
                                            :disabled="registro.sai == 0 || registro.fica == 0" @click="doChange">
                                            <span class="icon">
                                                <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                            </span>
                                            <span>Remover</span>
                                        </button></div>
                                    <div class="column">
                                        <button class="button is-success is-outlined" @click="newSearch">
                                            <span class="icon">
                                                <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                            </span>
                                            <span>Refazer</span>
                                        </button>
                                    </div>
                                </div>
                            </section>
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
import administrativoService from "@/services/administrativo.service";
import MyTable from "@/components/forms/MyTable.vue";


export default {
    data() {
        return {
            dataTable: [],
            columns: [],
            labels: [],
            tableName: "removeUsers",
            filtro: {
                tipo: 1,
                id_municipio: 0
            },
            registro: {
                sai: 0,
                fica: 0,
                tipo: 0
            },
            hasData: false,
            usuario: 0,
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            lblTroca: '',
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
        MyTable
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        closeMessage() {
            alert('funfa')
            this.showMessage = false;
        },
        getRows() {
            const idx = this.filtro.tipo - 1;
            this.lblTroca = this.labels[idx].name
            this.registro.tipo = this.filtro.tipo

            administrativoService.getData(JSON.stringify(this.filtro))
                .then((res) => {
                    this.dataTable = res.data;
                    this.hasData = true;
                })
                .catch((err) => {
                    console.log(err.response);
                    this.dataTable = [];
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },
        newSearch() {
            this.dataTable = [];
            this.hasData = false;
        },
        doChange() {
            administrativoService.processa(this.registro)
                .then((res) => {
                    this.showMessage = true;
                    this.message = `Alterações em ${this.lblTroca} processadas!`;
                    this.type = "success";
                    this.caption = this.lblTroca;
                    setTimeout(() => {
                        this.showMessage = false;
                        this.hasData = false;
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error.response);
                    this.message = error.details || "Ocorreu um erro na requisição.";
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = this.lblTroca;
                    setTimeout(() => (this.showMessage = false), 3000);
                });
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
    },
    mounted() {
        this.columns = [
            { headerName: "ID", field: "id" },
            { headerName: "Código", field: "codigo" },
            { headerName: "Nome", field: "nome" },
            { headerName: "Ativo", field: "deleted", formatter: "tickCross", hozAlign: "center", widthGrow: 1 },
            { headerName: "Proprietário", field: "owner" },
        ]

        this.labels = [
            { id: 1, name: 'Localidade' },
            // { id: 2, name: 'Endereço' }
        ]
    },
}

</script>

<style scoped>
.fieldset {
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
}

.fieldset>legend {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
    width: max-content;
    border: 0 none
}
</style>