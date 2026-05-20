<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Usuário/Município</p>
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
                                                    <label class="label">Nível:</label>
                                                    <div class="control has-icons-left has-icons-right">
                                                        <label class="radio">
                                                            <input type="radio" name="nivel" value="1"
                                                                v-model="filtro.role" />
                                                            1 - Estado
                                                        </label>
                                                        <label class="radio">
                                                            <input type="radio" name="nivel" value="2"
                                                                v-model="filtro.role" />
                                                            2 - Regional
                                                        </label>
                                                        <label class="radio">
                                                            <input type="radio" name="nivel" value="3"
                                                                v-model="filtro.role" />
                                                            3 - Município
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="field column is-6" v-if="filtro.role == 1">
                                                    <label class="label">Local</label>
                                                    <input type="text" class="input" value="Estado" readonly="true">
                                                </div>
                                                <div class="field column is-6" v-if="filtro.role == 3">
                                                    <label class="label">Município</label>
                                                    <div class="control">
                                                        <CmbMunicipio :id_prop="currentUser.id"
                                                            @selMun="local = $event" />
                                                    </div>
                                                </div>
                                                <div class="column is-6" v-if="filtro.role == 2">
                                                    <div class="field">
                                                        <label class="label">Regional</label>
                                                        <div class="control">
                                                            <CmbTerritorio :id_prop="currentUser.id" :tipo="1"
                                                                @selLoc="local = $event" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <button class="button is-primary is-outlined"
                                                        :disabled="filtro.role == 0" @click="findUsers">
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
                                <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable"
                                    :columns="columns" :pagination="false" :buttons="[]" :has-exports="false"
                                    :calcHeight="false" persistence-id="RemoveUser" />

                                <div class="columns is-centered">
                                    <div class="column">
                                        <div class="field column is-6">
                                            <label class="label">Usuário a remover</label>
                                            <div class="control">
                                                <div class="control">
                                                    <div class="select">
                                                        <select v-model="user.sai" class="input">
                                                            <option value="0">-- Selecione --</option>
                                                            <option v-for="user in dataTable" :key="user.id"
                                                                :value="user.id">
                                                                {{ user.nome }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field column is-6">
                                            <label class="label">Usuário que receberá</label>
                                            <div class="control">
                                                <div class="control">
                                                    <div class="select">
                                                        <select v-model="user.fica" class="input">
                                                            <option value="0">-- Selecione --</option>
                                                            <option v-for="user in dataTable" :key="user.id"
                                                                :value="user.id">
                                                                {{ user.nome }}
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
                                            :disabled="user.sai == 0 || user.fica == 0" @click="doChange">
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
import authService from "@/services/auth.service";
import MyTable from "@/components/forms/MyTable.vue";


export default {
    data() {
        return {
            dataTable: [],
            columns: [],
            tableName: "removeUsers",
            filtro: {
                role: 1,
                id_municipio: 0
            },
            user: {
                sai: 0,
                fica: 0
            },
            hasData: false,
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
        findUsers() {
            authService.getListaTroca(JSON.stringify(this.filtro))
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
            authService.trocaUsers(this.user)
                .then((res) => {
                    this.showMessage = true;
                    this.message = "Usuário removido";
                    this.type = "success";
                    this.caption = "Usuário";
                    setTimeout(() => {
                        this.showMessage = false;
                        this.hasData = false;
                    }, 5000);
                })
                .catch((err) => {
                    console.log(err.response);
                    this.message = error;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
                })
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
        this.columns = [
            { headerName: "ID", field: "id" },
            { headerName: "Nome", field: "name" },
            { headerName: "Login", field: "username" },
            { headerName: "Local", field: "local" },
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