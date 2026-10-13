<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader :active="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Construir Relatório</p>
                        <button class="button is-info is-outlined" @click="newFilter" v-show="pivotData.length">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-repeat" />
                            </span>
                            <span>Refazer</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <section v-show="!pivotData.length > 0">
                            <crossTab :data="campos" @options="gerarRelatorio" />
                        </section>
                        <section v-if="pivotData.length > 0">
                            <div class="box mt-5">
                                <h4 class="rel_title">{{ pivotFantasia }}</h4>
                                <h5>{{ filtros }}</h5>
                                <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="pivotData" :columns="pivotColumns"
                                    :pagination="true" :buttons="[]" :has-exports="true" :calc-height="false"
                                    :tree-data="treeRel" has-graf="true" @chart="toGrafico" />

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import crossTab from '@/components/report/crossTab.vue'
import Loader from '@/components/general/Loader.vue'
import reportService from '@/services/report.service'
import MyTable from '@/components/forms/MyTable.vue'
import Message from '@/components/general/Message.vue'
import { useReportStore } from '@/store/reportStore'

const reportStore = useReportStore()

export default {
    data() {
        return {
            campos: [],
            pivotData: [],
            pivotColumns: [],
            pivotFantasia: '',
            filtros: '',
            isLoading: false,
            treeRel: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
        };
    },
    components: {
        MyTable,
        Loader,
        Message,
        crossTab
    },
    methods: {
        closeMessage() {
            this.showMessage = false
        },
        toGrafico() {
            reportStore.setTable(this.pivotData, this.pivotColumns, this.campos, this.pivotFantasia)
            this.$router.push('/chart')
        },
        newFilter() {
            this.pivotData = []
            this.pivotColumns = []
        },
        async gerarRelatorio(options) {
            try {
                this.isLoading = true
                const result = await reportService.getCrossTab(options)
                if (result.error) {
                    this.type = 'alert'
                    this.message = result.message
                    this.caption = 'Verifique'
                    this.showMessage = true
                    campos.value = []
                } else {
                    console.log(result)
                    this.pivotData = result.data.rows
                    this.pivotColumns = result.data.colunas
                    this.pivotFantasia = result.data.fantasia
                    let retFilter = result.data.filtros
                    this.filtros = retFilter.join(', ')
                }
            } finally {
                this.isLoading = false
            }
        }
    },
    async mounted() {
        try {
            this.isLoading = true
            if (this.$route.query.returnFrom === 'grafico') {
                this.pivotData = reportStore.tableData
                this.pivotColumns = reportStore.tableColumns
                this.campos = reportStore.tableOptions
                this.pivotFantasia = reportStore.tableTitle
            } else {
                const result = await reportService.getCrossVars()
                if (result.error) {
                    console.log(result.error)
                    this.campos = []
                } else {
                    console.log(result)
                    this.campos = result.data
                }
            }
        } finally {
            this.isLoading = false
        }
    }
}


</script>

<style>
.container {
    max-width: 800px;
    margin: auto;
}

.rel_title {
    font-size: larger;
    font-weight: bold;
    color: rgb(2, 2, 92);
}

.button {
    margin-right: 1rem;
}
</style>
