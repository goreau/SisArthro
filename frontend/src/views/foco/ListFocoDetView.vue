<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Coletas Cadastradas</p>
                        <button class="button is-primary is-outlined" @click="newCapt">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-plus-circle" />
                            </span>
                            <span>Novo</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <Loader v-if="isLoading" />
                        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type"
                            :caption="caption" />
                        <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable" :columns="columns"
                            :pagination="true" :buttons="['edit', 'delete']" :has-exports="false" @edit="onEditRow"
                            :calcHeight="false" @delete="onDeleteRow" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import focoService from "@/services/foco.service";
import MyTable from "@/components/forms/MyTable.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";
import moment from 'moment';

export default {
    name: "ListaCaninos",
    data() {
        return {
            dataTable: [],
            tableName: 'foco_det',
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            columns: [],
            myspan: null,
            myspan2: null,
            master: 0,
            quart: 0,
            id_user: 0
        };
    },
    components: {
        MyTable,
        Loader,
        ConfirmDialog,
    },
    methods: {
        newCapt() {
            this.$router.push(`/foco_det/${this.master}/${this.quart}`);
        },
        onEditRow(id) {
            this.$router.push(`/editFocoDet/${id}`);
        },
        async onDeleteRow(id) {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa foco e todas as informações associada a ela?',
                okButton: 'Confirmar',
            })
            if (ok) {
                focoService.deleteDet(row.id_foco_det)
                    .then(() => {
                        location.reload();
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Foco";
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

        this.isLoading = true;
        focoService.getFocosDet(this.master)
            .then((response) => {
                this.dataTable = response.data;
                if (response.data.length > 0) {
                    this.quart = response.data[0].id_quarteirao;
                } else {
                    this.quart = this.$route.params.quart;
                }

                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false));

        this.columns = [
            { headerName: "Codend", field: "codend" },
            { headerName: "Animal", field: "nome" },
            { headerName: "Situação", field: "situacao" },
            { headerName: "Desfecho", field: "desfecho" },
            { headerName: "Data", field: "data" },
        ];
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    created() {
        this.master = this.$route.params.master;
    },
};
</script>

<style scoped>
.button {
    margin-right: 1rem;
}
</style>
