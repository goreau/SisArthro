<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader :active="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Gráficos</p>
                        <button class="button is-info is-outlined" @click="goBack">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-rotate-back" />
                            </span>
                            <span>Voltar</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <fieldset class="fieldset">
                            <legend>Tipo de Gráfico</legend>
                            <div class="field">
                                <label v-for="item in tipos" :key="item.id" class="radio">
                                    <input type="radio" name="tabela" :value="item.id" v-model="type" />
                                    {{ item.nome }}
                                </label>
                            </div>
                        </fieldset>
                        <div class="graficoContent" v-if="data.length > 0">
                            <ChartWrapper class="chart-container" :type="type" :title="title" :columns="columns"
                                :data="data" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import ChartWrapper from '@/components/report/chartWrapper.vue'
import Loader from '@/components/general/Loader.vue'
import { onMounted, ref } from 'vue'
import { useReportStore } from '@/store/reportStore'
import { useRouter } from 'vue-router'

const store = useReportStore()
const router = useRouter()

const columns = ref([])
const data = ref([])
const title = ref('')
const type = ref('bar')

const tipos = ref([])

var isLoading = ref(false)

function goBack() {
    router.push({ name: 'dinamico', query: { returnFrom: 'grafico' } })
}

onMounted(() => {
    data.value = store.tableData
    columns.value = store.tableColumns
    title.value = store.tableTitle

    tipos.value = [
        { id: 'bar', nome: 'Coluna' },
        { id: 'line', nome: 'Linha' },
        { id: 'pie', nome: 'Pizza' },
    ]
})
</script>

<style scoped>
.graficoContent {
    height: 800px;
}

.chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
    /* pelo menos isso */
}

.button {
    margin-right: 1rem;
}
</style>
