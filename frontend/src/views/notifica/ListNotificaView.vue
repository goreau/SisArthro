<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Notificações</p>
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
                        <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
                            :pagination="true" :buttons="['edit', 'delete']" :has-exports="true" @edit="onEditRow"
                            :calcHeight="false" @delete="onDeleteRow" :deletedId="delId" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import notificaService from "@/services/notifica.service";
import MyTable from "@/components/forms/MyTable.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import moment from 'moment';
import Message from "@/components/general/Message.vue";

export default {
    name: "ListaNotificas",
    data() {
        return {
            dataTable: [],
            tableName: 'notifica',
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            columns: [],
            delId: null,
            id_user: 0,
            tpUser: 0,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
        };
    },
    components: {
        MyTable,
        ConfirmDialog,
        Message
    },
    methods: {
        newCapt() {
            this.$router.push("/notifica");
        },
        onEditRow(id) {
            this.$router.push(`/editNotifica/${id}`);
        },
        async onDeleteRow(id) {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa notificação e todas as coletas associada a ela?',
                okButton: 'Confirmar',
            })
            if (ok) {
                notificaService.delete(id)
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


        notificaService.getNotificas({})
            .then((response) => {
                this.dataTable = response.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { });

        this.columns = [
            { headerName: 'ID', field: 'id', hide: true },
            { headerName: "Código", field: "codigo" },
            { headerName: "Município", field: "municipio" },
            { headerName: "Notificante", field: "unidade" },
            { headerName: "Data", field: "data" },
            { headerName: "Cão", field: "nome" },
            { headerName: 'Prop', field: 'owner_id', hide: true },
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
