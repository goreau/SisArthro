<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Notificaçõoes Cadastradas</p>
                        <button class="button is-primary is-outlined" @click="newCapt">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-plus-circle" />
                            </span>
                            <span>Novo</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type"
                            :caption="caption" />
                        <div class="columns">
                            <div class="field column is-3 is-offset-3">
                                <label class="label">Município</label>
                                <div class="control">
                                    <CmbListaMun :tabela="tableName" :id_prop="currentUser.id"
                                        @selMun="filtMun = $event" />
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
                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="true"
                            :table-name="tableName" />
                    </div>
                </div>
                <div style="display: none">
                    <span class="icon is-small is-left" name="coisa">
                        <font-awesome-icon icon="fa-solid fa-edit" />
                    </span>
                    <span class="icon is-small is-left" name="coisa2">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </span>
                    <span class="icon is-small is-left" name="coisa3">
                        <font-awesome-icon icon="fa-solid fa-microscope" />
                    </span>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import suspeitoService from "@/services/suspeito.service";
import MyTable from "@/components/forms/MyTable.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";
import CmbListaMun from "@/components/forms/CmbListaMun.vue";

export default {
    name: "ListaSuspeitos",
    data() {
        return {
            filtMun: 0,
            dataTable: [],
            tableName: 'suspeito',
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            columns: [],
            myspan: null,
            myspan2: null,
            myspan3: null,
            id_user: 0
        };
    },
    components: {
        MyTable,
        ConfirmDialog,
        Message,
        CmbListaMun
    },
    methods: {
        newCapt() {
            this.$router.push("/suspeito");
        },
        editCapt(id) {
            this.$router.push(`/editSuspeito/${id}`);
        },
        loadData() {
            suspeitoService.getSuspeitos(this.filtMun)
                .then((response) => {
                    this.dataTable = response.data;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => { });
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
        this.myspan2 = document.getElementsByName("coisa2")[0];
        this.myspan3 = document.getElementsByName("coisa3")[0];



        this.columns = [
            { title: "Número", field: "codigo", minWidth: 200 },
            { title: "Município", field: "municipio", minWidth: 250, responsive: 1, },
            { title: "Notificante", field: "notificante", minWidth: 200, responsive: 1, },
            {
                title: "Data Encontro", field: "dt_encontro", sorter: "date", minWidth: 200, responsive: 2, sorterParams: {
                    format: "dd/MM/yyyy",
                    alignEmptyValues: "top",
                }
            },
            {
                title: "Data Recebimento", field: "dt_recebe", sorter: "date", minWidth: 200, responsive: 2, sorterParams: {
                    format: "dd/MM/yyyy",
                    alignEmptyValues: "top",
                }
            },
            {
                title: "Ações", minWidth: 200, responsive: 0,
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
                        this.$router.push(`/editSuspeito/${row.id_suspeito}`);
                    });

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
                            message: 'Deseja mesmo excluir essa notificação e todas as informações associada a ela?',
                            okButton: 'Confirmar',
                        })
                        if (ok) {
                            suspeitoService.delete(row.id_suspeito)
                                .then(() => {
                                    location.reload();
                                })
                                .catch((err) => {
                                    this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                                    this.showMessage = true;
                                    this.type = "alert";
                                    this.caption = "Notificação";
                                    setTimeout(() => (this.showMessage = false), 3000);
                                })
                        }
                    });

                    const btIdent = document.createElement("button");
                    btIdent.type = "button";
                    btIdent.title = "Identificação";
                    btIdent.disabled = false;
                    btIdent.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btIdent.classList.add("button", "is-info", "is-outlined");
                    btIdent.innerHTML = this.myspan3.innerHTML;
                    btIdent.addEventListener("click", () => {
                        this.$router.push(`/editSuspeitoIdent/${row.id_suspeito}`);
                    });

                    const buttonHolder = document.createElement("span");
                    buttonHolder.appendChild(btEdit);
                    buttonHolder.appendChild(btDel);
                    buttonHolder.appendChild(btIdent);

                    return buttonHolder;
                },
            },
        ];
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
