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
                        <!-- <div class="columns">
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
                        </div>-->
                        <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
                            :pagination="true" :buttons="['edit', 'delete', 'identifica']" :has-exports="true"
                            @edit="onEditRow" :calcHeight="false" @delete="onDeleteRow" @identifica="onIdentifica"
                            :deletedId="delId" />
                    </div>
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
            delId: null,
            id_user: 0,
            tpUser: 0
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
        onEditRow(id) {
            this.$router.push(`/editSuspeito/${id}`);
        },
        async onDeleteRow(id) {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa notificação e todas as informações associada a ela?',
                okButton: 'Confirmar',
            })
            if (ok) {
                suspeitoService.delete(id)
                    .then(() => {
                        this.delId = id
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Notificação";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
            }
        },
        onIdentifica(id) {
            this.$router.push(`/editSuspeitoIdent/${id}`);
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
        this.tpUser = this.currentUser.role;

        this.columns = [
            { headerName: 'ID', field: 'id', hide: true },
            { headerName: "Número", field: "codigo" },
            { headerName: "Município", field: "municipio" },
            { headerName: "Notificante", field: "notificante" },
            { headerName: "Data Encontro", field: "dt_encontro" },
            { headerName: "Data Recebimento", field: "dt_recebe" },
            { headerName: 'Prop', field: 'owner_id', hide: true },
        ];

        this.loadData()
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
