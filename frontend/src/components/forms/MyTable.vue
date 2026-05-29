<!-- src/components/MyDataTable.vue -->
<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import {
    ColumnAutoSizeModule,
    CustomFilterModule,
    DateFilterModule,
    LocaleModule,
    ModuleRegistry,
    NumberFilterModule,
    PaginationModule,
    TextFilterModule,
    themeAlpine,
    ValidationModule,
    ClientSideRowModelModule,
    ClientSideRowModelApiModule,
    CellStyleModule
} from 'ag-grid-community'

import localeText from '@/utils/agGridLocale'
import { CsvExportModule } from 'ag-grid-community'
import tickCrossRenderer from '@/components/general/tickCrossRender.vue'
import { integer } from '@vuelidate/validators'
import { shallowRef, markRaw } from 'vue'

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ClientSideRowModelApiModule,
    CsvExportModule,
    ValidationModule,
    ColumnAutoSizeModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule,
    PaginationModule,
    LocaleModule,
    CellStyleModule,
])

const paginationPageSizeSelector = [12, 20, 50, 100]

const props = defineProps({
    data: Array,
    columns: {
        type: Array,
        default: () => [],
    },
    pagination: Boolean,
    buttons: {
        type: Array,
        default: () => [],
    },
    loggedUser: {
        type: Object,
        default: () => { },
    },
    hasExports: {
        type: Boolean,
        default: false
    },
    hasGraf: {
        type: Boolean,
        default: false,
    },
    calcHeight: {
        type: Boolean,
        default: false,
    },
    treeData: {
        type: Boolean,
        default: false
    },
    useDetail: {
        type: Boolean,
        default: false
    },
    detailColumns: {
        type: Array,
        default: () => [],
    },
    deletedId: {
        type: Number,
        default: null
    },
    persistenceId: {
        type: String,
        required: true,
        default: 'tabela'
    }
})
const emit = defineEmits([
    'edit',
    'delete',
    'caracteriza',
    'reset',
    'impersonate',
    'animais',
    'boletim',
    'identifica',
])

const gridApi = ref(null)
const columnApi = ref(null)
const gridWrapper = ref(null)

const agGridColumns = ref([])

const alturasFixas = ref(0)
const rowHeight = 50 // altura média de cada linha, ajuste conforme seu grid
const baseHeight = 60 // altura base (header + margens), ajuste se necessário

//const rows = ref([...props.data])
const rows = shallowRef([])

const onFirstDataRendered = (params) => {
    setTimeout(() => {

        autoSizeAll()
    }, 0)
}

/*const onFirstDataRendered = () => {
  setTimeout(() => {
    autoSizeAll()
  }, 0)
}*/

function onFilterChanged(params) {
    const filterModel = params.api.getFilterModel();
    // Salva no localStorage vinculado a uma chave específica desta tela
    localStorage.setItem(`filter_state_${props.persistenceId}`, JSON.stringify(filterModel));
}


function onGridReady(params) {
    gridApi.value = params.api
    columnApi.value = params.columnApi
    //  console.log('SET columnApi', params.columnApi)
    //autoSizeColumns()
    const savedFilter = localStorage.getItem(`filter_state_${props.persistenceId}`);
    if (savedFilter) {
        const model = JSON.parse(savedFilter);
        params.api.setFilterModel(model);
    }
}

function autoSizeAll() {
    if (!columnApi.value) return

    const allColumnIds = columnApi.value.getAllColumns().map((col) => col.getColId())
    columnApi.value.autoSizeColumns(allColumnIds, false)
}

function shouldDisableButton(row, name) {
    if (!props.loggedUser) return
    if (name == 'reset' || name == 'impersonate' || row.owner_id < 0) {
        return props.loggedUser.tipo > 1
    } else if (name == 'boletim') {
        return false
    } else {
        return props.loggedUser.id !== 0 && row.owner_id != props.loggedUser.id
    }
}

const myAutoGroupColumnDef = {
    headerName: "Captura",
    minWidth: 300,
    cellRendererParams: {
        suppressCount: true
    },
    valueGetter: (params) => {
        const d = params.data;

        if (!d) return params.value; // grupo

        return `${d.municipio} | ${d.codigo} | ${d.dt_captura}`;
    }
};


const getFilteredRows = () => {
    const rows = []
    const count = gridApi.value.getDisplayedRowCount()

    for (let i = 0; i < count; i++) {
        const rowNode = gridApi.value.getDisplayedRowAtIndex(i)
        rows.push(rowNode.data)
    }

    return rows
}

async function download_xlsx() {
    const XLSX = await import('xlsx')
    const { saveAs } = await import('file-saver')

    const data = getFilteredRows()

    // achata as colunas (com suporte a children)
    const exportCols = flattenColumns(props.columns).filter(
        (col) => col.field && col.field !== 'acoes',
    )

    const exportData = data.map((row) =>
        Object.fromEntries(
            exportCols.map((col) => {
                let value = row[col.field]

                // Se o valor for uma string que contém apenas números (ou decimal), converte
                // Verifica se não é nulo/vazio e se é um número válido
                if (typeof value === 'string' && value.trim() !== '' && !isNaN(value)) {
                    value = Number(value)
                }

                return [col.exportHeader, value]
            }),
        ),
    )

    // monta os dados já com headers "pai - filho"
    /* const exportData = data.map((row) =>
      Object.fromEntries(exportCols.map((col) => [col.exportHeader, row[col.field]])),
    )*/

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([excelBuffer]), 'SisArthro.xlsx')
}

function flattenColumns(columns, parentHeader = '') {
    const result = []
    columns.forEach((col) => {
        if (col.children) {
            // recursivo
            result.push(...flattenColumns(col.children, col.headerName))
        } else {
            // monta o header concatenando pai + filho
            const header = parentHeader ? `${parentHeader} - ${col.headerName}` : col.headerName
            result.push({ ...col, exportHeader: header })
        }
    })
    return result
}

async function download_pdf() {
    const jsPDF = (await import('jspdf')).default
    const autoTable = (await import('jspdf-autotable')).default

    const doc = new jsPDF({ orientation: 'landscape' })

    // achata colunas igual ao Excel
    const exportCols = flattenColumns(props.columns).filter(
        (col) => col.field && col.field !== 'acoes',
    )

    const headers = exportCols.map((col) => col.exportHeader)

    const rows = getFilteredRows().map((row) => exportCols.map((col) => row[col.field]))

    autoTable(doc, {
        head: [headers],
        body: rows,
    })

    doc.save('SisArthro.pdf')
}

function toGrafico() {
    emit('chart')
}

/*watch(
    () => props.data,
    async (val) => {
        rows.value = [...val]

        if (columnApi.value) {
            nextTick(() => autoSizeAll())
        }
    },
    { deep: true },
)*/
watch(
    () => props.data,
    (val) => {
        if (gridApi.value) {
            // markRaw protege o array contra reatividade do Vue
            const data = markRaw(val || []);
            gridApi.value.setGridOption('rowData', data);
        }
        // Se precisar do rows para outros fins, mantenha o shallowRef:
        rows.value = val;
    },
    { immediate: true }
)

watch(
    () => props.deletedId,
    (id) => {
        if (!id || !gridApi.value) return

        const rowNode = gridApi.value.getRowNode(id)

        if (rowNode) {
            gridApi.value.applyTransaction({
                remove: [rowNode.data]
            })
        }
    }
)

watch(
    () => props.columns,
    () => {
        agGridColumns.value = [
            ...props.columns.map((col) => ({
                ...col,
                sortable: true,
                filter: true,
                resizable: true,
                valueFormatter: col.repeat ? repeatFormatter : undefined,

            })),
            props.buttons?.length ? createActionsColumn() : null,
        ].filter(Boolean)
    },
    { immediate: true },
)
//cellClassRules: col.repeat ? repeatStyleRules : undefined,
//(col.field)

onMounted(() => {
    let footer = document.querySelector('#footer')?.offsetHeight || 0
    let header = document.querySelector('.conteudo')?.offsetHeight || 0
    alturasFixas.value = footer + header * 4 + 100
    /**nextTick(() => {
        if (gridApi.value && props.pagination) {
            //gridApi.value.setPaginationSetPageSize(20)
        }
    })*/
    setTimeout(() => {
        gridApi.value?.sizeColumnsToFit()
    }, 150)
})


const repeatFormatter = (params) => {
    // 1. Se for a primeira linha, sempre exibe o valor
    if (!params.node || params.node.rowIndex === 0) return params.value;

    // 2. Obtém o nó da linha anterior na visualização do Grid
    const prevNode = params.api.getDisplayedRowAtIndex(params.node.rowIndex - 1);

    // 3. Compara os IDs. Se forem iguais, retorna '...'
    // Nota: O acesso a 'data.id' assume que seu objeto tem a propriedade 'id'
    if (prevNode && prevNode.data && prevNode.data.master === params.data.master) {
        return '...';
    }

    // 4. Se for um ID novo, retorna o valor original
    return params.value;
};

// Coluna de ações customizada
function createActionsColumn() {
    var definedWidth = 0
    if (props.buttons.length == 0) {
        return {}
    } else {
        definedWidth = props.buttons.length * 80
    }
    return {
        headerName: 'Ações',
        field: 'acoes',
        cellRenderer: ({ data }) => {
            const container = document.createElement('div')
            const addButton = (icon, title, emitName, className = 'is-success') => {
                if (!props.buttons.includes(emitName)) return
                const btn = document.createElement('button')
                btn.innerHTML = `<i class="${icon}"></i>`
                btn.title = title
                btn.className = `button is-small is-outlined ${className}`
                btn.disabled = shouldDisableButton(data, emitName)
                btn.onclick = () => emit(emitName, data.id)
                container.appendChild(btn)
            }

            addButton('fas fa-edit', 'Editar', 'edit')
            addButton('fas fa-trash', 'Excluir', 'delete', 'is-danger')
            addButton('fas fa-microscope', 'Identificação', 'identifica', 'is-primary')
            addButton('fas fa-image', 'Caracterização', 'caracteriza', 'is-info')
            if (props.loggedUser.tipo == 1) {
                addButton('fas fa-power-off', 'Reset', 'reset', 'is-warning')
                addButton('fas fa-user-secret', 'Logar como', 'impersonate', 'is-info')
            }
            addButton('fas fa-dog', 'Animais', 'animais', 'is-info')
            addButton('fas fa-file-pdf', 'Boletim', 'boletim', 'is-info')

            return container
        },
        minWidth: definedWidth,
        suppressSizeToFit: true,
        pinned: 'right',
    }
}

const gridHeight = ref('auto');

watch(
    () => rows.value.length,
    async () => {
        if (!props.calcHeight) {
            gridHeight.value = `calc(100vh - ${alturasFixas.value}px)`
        } else {
            // nextTick garante que o Vue terminou de processar a nova linha no template
            await nextTick();

            const qt = Math.max(rows.value.length, 1);
            const alt = Math.min((qt * rowHeight) + baseHeight, 500);

            gridHeight.value = `${alt}px`;
        }
    },
    { immediate: true } // Calcula assim que o componente monta
);

/*const gridHeight = computed(() => {
    console.log("Calculando altura. Qtd linhas:", rows.value.length);
    if (!props.calcHeight) return `calc(100vh - ${alturasFixas.value}px)`
    let qt = rows.value.length == 0 ? 1 : rows.value.length
    let alt = Math.min(qt * rowHeight + baseHeight, 500)
    return alt + 'px'
})*/

defineExpose({
    getFilteredRows,
    tickCrossRenderer,
    clearFilters() {
        gridApi.value?.setFilterModel(null)
    },
})
//

/**
 *  //height: 40rem"
    :style="{ height: gridHeight + 'px' }"

      //:rowData="rows"



      :autoGroupColumnDef="myAutoGroupColumnDef" :groupDefaultExpanded="1"
            :groupDisplayType="'singleColumn'"
 */
</script>

<template>
    <div class="columns">
        <div class="column has-text-right">
            <span class="has-text-right export" v-if="hasGraf">
                <button class="button is-info is-outlined is-small" title="Gráfico" @click="toGrafico">
                    <font-awesome-icon icon="fa-solid fa-chart-column" />
                </button>
            </span>
            <span class="has-text-right export" v-if="hasExports">
                <button class="button is-success is-outlined is-small" title="Excel" @click="download_xlsx">
                    <font-awesome-icon icon="fa-solid fa-file-excel" />
                </button>
                <button class="button is-danger is-outlined is-small" title="Pdf" @click="download_pdf">
                    <font-awesome-icon icon="fa-solid fa-file-pdf" />
                </button>
            </span>
        </div>
    </div>
    <div ref="gridWrapper">
        <AgGridVue :theme="themeAlpine" :style="{ width: '100%', height: gridHeight }" :treeData="treeData"
            :columnDefs="agGridColumns" :pagination="pagination" :paginationPageSize="12" :rowData="null"
            :pagination-auto-page-size="false" :localeText="localeText" :autoGroupColumnDef="myAutoGroupColumnDef"
            :groupDefaultExpanded="1" :groupDisplayType="'singleColumn'"
            :getRowId="params => params.data?.id?.toString()" :paginationPageSizeSelector="paginationPageSizeSelector"
            @grid-ready="onGridReady" @first-data-rendered="onFirstDataRendered" @filter-changed="onFilterChanged" />
    </div>
</template>

<style>
.button {
    margin-left: 1rem;
    padding: 1rem;
    border-radius: 0.4rem !important;
}

.export {
    padding: 1rem;
}
</style>
