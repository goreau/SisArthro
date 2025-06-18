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
                        <section>
                            <div class="columns">
                                <div class="column is-3 is-offset-2"><a href="#" @click.prevent="callData(1)">Canino</a>
                                </div>
                                <div class="column is-3 is-offset-2"><a href="#"
                                        @click.prevent="callData(2)">Captura</a></div>
                            </div>
                        </section>
                        <section v-show="hasData">
                            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true"
                                :tableName="tableName" />
                        </section>
                        <!-- Modal (Bulma) -->
                        <div class="modal" :class="{ 'is-active': modalAberto }">
                            <div class="modal-background" @click="fecharModal"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Detalhes do Registro</p>
                                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                                </header>
                                <section class="modal-card-body">
                                    <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                                    <div class="columns">
                                        <div class="column">
                                            <label class="label">ID</label>
                                            <div class="control">
                                                <input class="input" type="text" :value="registroEditando.id" readonly disabled />
                                            </div>
                                        </div>
                                        <div class="column">
                                            <label class="label">ID</label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="registroEditando.latitude"/>
                                            </div>
                                        </div>
                                        <div class="column">
                                            <label class="label">ID</label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="registroEditando.longitude" />
                                            </div>
                                        </div>
                                    </div>
                                                                        
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success" id="login" @click="salvarEdicao">Salvar</button>
                                    <button class="button" @click="fecharModal">Cancelar</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: none">
                <span class="icon is-small is-left" name="coisa">
                    <font-awesome-icon icon="fa-solid fa-edit" />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import gerencialService from "@/services/gerencial.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import Message from "@/components/general/Message.vue";

export default {
    name: "ListaEndereços",
    data() {
        return {
            hasData: false,
            dataTable: [],
            isLoading: false,
            columns: [],
            tableName: 'coords',
            myspan: null,
            myspan2: null,
            id_user: 0,
            tabela: 0,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            title: 'Lista de Coordenadas',
            modalAberto: false,
            registroEditando: {
                id: null,
                tabela: 0,
                latitude: '',
                longitude: '',
            }
        };
    },
    components: {
        MyTable,
        Loader,
        Message,
    },
    methods: {
        abrirModal(registro) {
            // Cópia para edição (evita alterar diretamente antes de salvar)
            this.registroEditando = { ...registro };
            this.registroEditando.tabela = this.tabela;
            this.modalAberto = true;
        },
        fecharModal() {
            this.modalAberto = false;
            this.registroEditando = { id: null, latitude: '', longitude: '', tabela: 0 };
        },
        salvarEdicao() {
            const index = this.dataTable.findIndex(r => r.id === this.registroEditando.id);
            if (index !== -1) {
                this.dataTable[index] = { ...this.registroEditando };
                document.getElementById('login').classList.add('is-loading');
                gerencialService.putCoordenadas({ ...this.registroEditando })
                .then(
                        (response) => {
                            this.callData(this.tabela);
                            this.fecharModal();
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Coordenadas";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Coordenadas";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById('login').classList.remove('is-loading');
                    });
                // Aqui você pode fazer um POST/PUT na API também se quiser salvar no backend
            }
            
        },
        callData(tab) {
            this.tabela = tab;
            gerencialService.getCoordenadas(tab)
                .then((response) => { 
                    this.dataTable = [...response.data];//response.data;
                    this.isLoading = false;
                    this.hasData = true;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));
        },
        createColumns() {
            this.columns = [
                { title: "ID", field: "id", minWidth: 100, responsive: 1, },
                { title: "Municipio", field: "municipio", minWidth: 200, responsive: 1, },
                { title: "Latitude", field: "latitude", minWidth: 200, responsive: 3, },
                { title: "Longitude", field: "longitude", minWidth: 200, responsive: 3, },
                {
                    title: "Ações", minWidth: 200, responsive: 0,
                    formatter: (cell, formatterParams) => {
                        const row = cell.getRow().getData();

                        const btEdit = document.createElement("button");
                        btEdit.type = "button";
                        btEdit.title = "Alterar";
                        btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
                        btEdit.classList.add("button", "is-success", "is-outlined");
                        btEdit.innerHTML = this.myspan.innerHTML;
                        btEdit.disabled = this.id_user != row.owner && this.currentUser.nivel > 1;
                        btEdit.addEventListener("click", () => {
                            this.abrirModal(row);
                        });

                        const buttonHolder = document.createElement("span");
                        buttonHolder.appendChild(btEdit);



                        return buttonHolder;
                    },
                },
            ];
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
    },
    mounted() {
        this.id_user = this.currentUser.id;

        this.myspan = document.getElementsByName("coisa")[0];

        this.tipo = this.$route.params.id;

        this.createColumns();

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