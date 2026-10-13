<!-- src/components/FiltroWrapper.vue -->
<template>
    <div class="box">
        <section class="section">
            <div class="columns">
                <div class="column is-full">
                    <div class="field">
                        <label class="label">GVE</label>
                        <div class="control">
                            <CmbTerritorio :id_prop="currentUser.id" :tipo="4" :sel="filtros.id_gve"
                                @selLoc="filtros.id_gve = $event" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-full">
                    <div class="field">
                        <label class="label">Município</label>
                        <div class="control">
                            <CmbMunicipio :id_prop="currentUser.id" :sel="filtros.id_municipio"
                                @selMun="filtros.id_municipio = $event" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-full">
                    <div class="field">
                        <label class="label">ATL/Localidade</label>
                        <div class="control">
                            <CmbLocalidade :id_mun="filtros.id_municipio" :sel="filtros.id_localidade"
                                @selLoc="filtros.id_localidade = $event" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-full">
                    <div class="field">
                        <label class="label">Atividade</label>
                        <div class="control">
                            <CmbAuxiliares :tipo="1" @selValue="captura.zona = $event" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns" :v-show="props.ativos.datas">
                <div class="column is-half">
                    <label class="label">Início</label>
                    <div class="field">
                        <div class="control" id="contIni">
                            <input type="date" id="dtIni">
                        </div>
                    </div>
                </div>

                <div class="column is-half">
                    <label class="label">Final</label>
                    <div class="field">
                        <div class="control" id="contFim">
                            <input type="date" id="dtFim">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <hr />
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="buttons is-centered mt-4" data-focus-type="custom-submit-group">
                    <button class="button is-primary is-outlined is-fullwidth" @click="processar">
                        Processar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from 'vue'
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';
import CmbTerritorio from '../forms/CmbTerritorio.vue'
import CmbMunicipio from '../forms/CmbMunicipio.vue';
import CmbLocalidade from '../forms/CmbLocalidade.vue';
import CmbAuxiliares from '../forms/CmbAuxiliares.vue';
import { endOfDay, startOfDay, format } from 'date-fns'
import { useAuthStore } from '@/store/authStore'

const authStore = useAuthStore()

const emit = defineEmits(['submit'])

const props = defineProps(['ativos', 'endpoint'])


const execucoes = ref([])
const variaveis = ref([])
const tipos_rel = ref([])
const filtrosAtivos = reactive({})

const STORAGE_KEY = 'consulta-reportsw'

const filtros = reactive({
    id_gve: 0,
    id_municipio: '',
    id_atividade: 0,
    ref_ativ: 0,
    indicadores: 0,
    cobertura: 1,
    id_execucao: 0,
    id_variavel: 0,
    dt_inicio: '',
    dt_final: '',
    ano: '',
    id_area_nav: 0,
    id_bairro: 0,
    tipo_rel: 0,
    agente: '',
})

/**const filtrosAtivos = computed(() => {
  return Object.keys(filtros.value).reduce((acc, key) => {
    if (props.ativos.value[key] && filtros.value[key] !== '' && filtros.value[key] != null) {
      acc[key] = filtros.value[key]
    }
    return acc
  }, {})
filtrosAtivos.value = Object.keys(filtros).reduce((acc, key) => {
    if (props.ativos[key] && filtros[key] !== null && filtros[key] !== '') {
      acc[key] = filtros[key]
    }
    return acc
  }, {})

})*/

function limparFiltros() {
    Object.keys(filtrosAtivos).forEach((k) => delete filtrosAtivos[k])
    if (props.ativos['ano'] && filtros.ano !== '' && filtros.ano != null) {
        filtrosAtivos.ano = filtros.ano
    }
    if (props.ativos['municipio'] && filtros.id_municipio !== '' && filtros.id_municipio != null) {
        filtrosAtivos.id_municipio = filtros.id_municipio
    }
    if (props.ativos['atividade'] && filtros.id_atividade !== '' && filtros.id_atividade != null) {
        filtrosAtivos.id_atividade = filtros.id_atividade
    }
    if (props.ativos['gve'] && filtros.id_gve !== '' && filtros.id_gve != null) {
        filtrosAtivos.id_gve = filtros.id_gve
    }
    if (props.ativos['execucao'] && filtros.id_execucao !== '' && filtros.id_execucao != null) {
        filtrosAtivos.id_execucao = filtros.id_execucao
    }
    if (props.ativos['variaveis'] && filtros.id_variavel !== '' && filtros.id_variavel != null) {
        filtrosAtivos.id_variavel = filtros.id_variavel
    }
    if (props.ativos['datas'] && filtros.dt_inicio !== '' && filtros.dt_inicio != null) {
        /*let dataIni = new Date(filtros.dt_inicial)
    
        dataIni.setHours(0, 0, 0, 0)
        filtrosAtivos.dt_inicial = dataIni*/
        // 1. Cria o objeto Date a partir do valor do calendar
        const dataIni = new Date(filtros.dt_inicio)

        // 2. Define o horário para 23:59:59.999 no fuso LOCAL
        const dataIniAjustada = startOfDay(dataIni)

        // 3. Formata como string ISO, mas SEM o "Z" no final ou offset
        // Isso garante que o backend receba exatamente o que você vê na tela
        filtrosAtivos.dt_inicio = format(dataIniAjustada, "yyyy-MM-dd'T'HH:mm:ss.SSS")
    }
    if (props.ativos['datas'] && filtros.dt_final !== '' && filtros.dt_final != null) {
        /*let dataFim = new Date(filtros.dt_final)
    
        dataFim.setHours(23, 59, 59, 999)
    
        filtrosAtivos.dt_final = dataFim*/
        // 1. Cria o objeto Date a partir do valor do calendar
        const dataFim = new Date(filtros.dt_final)

        // 2. Define o horário para 23:59:59.999 no fuso LOCAL
        const dataFimAjustada = endOfDay(dataFim)

        // 3. Formata como string ISO, mas SEM o "Z" no final ou offset
        // Isso garante que o backend receba exatamente o que você vê na tela
        filtrosAtivos.dt_final = format(dataFimAjustada, "yyyy-MM-dd'T'HH:mm:ss.SSS")
    }

    filtrosAtivos.tipo_rel = filtros.tipo_rel
}

function processar() {
    limparFiltros()
    //console.log(filtros)
    //console.log(props.ativos)
    //console.log(filtrosAtivos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtros))
    if (filtros.id_variavel > 0) {
        const opt = variaveis.value.find((o) => o.id === Number(filtros.id_variavel))
        filtros.fantVar = opt.nome
    }
    if (filtros.tipo_rel > 0) {
        const opt = tipos_rel.value.find((o) => o.id === Number(filtros.tipo_rel))
        filtros.fantVar = opt.nome
    }
    emit('submit', filtrosAtivos)
}

async function loadCombos() {
    execucoes.value = [
        { id: 1, nome: 'Estado' },
        { id: 2, nome: 'Município' },
        { id: 3, nome: 'ACS' },
        { id: 0, nome: 'Todas' },
        { id: 9, nome: 'Todas Municipais' },
    ]
}

function startCalendar() {
    const teste = document.querySelector('#dtIni');

    if (teste.type == 'text') {
        const elIni = document.querySelector('#contIni');
        elIni.innerHTML = "<input type='date' id='dtIni' />";

        const elFim = document.querySelector('#contFim');
        elFim.innerHTML = "<input type='date' id='dtFim' />";
    }

    var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        //startDate: this.ini_date,
        showHeader: false,
        color: "info",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje'
    };

    var calini = bulmaCalendar.attach('#dtIni', options);

    const element = document.querySelector('#dtIni');

    if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
            filtros.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        element.bulmaCalendar.on('clear', datepicker => {
            filtros.dt_inicio = '';
        });
    }

    options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        //startDate: this.fim_date,
        showHeader: false,
        color: "info",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje'
    };

    var calfim = bulmaCalendar.attach('#dtFim', options);

    const element2 = document.querySelector('#dtFim');

    if (element2) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element2.bulmaCalendar.on('select', datepicker => {
            filtros.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        element2.bulmaCalendar.on('clear', datepicker => {
            filtros.dt_final = '';
        });
    }

}

watch(
    () => props.ativos,
    async (val) => {
        if (props.ativos?.ano) {
            filtros.ano = new Date().getFullYear()
        } else {
            filtros.ano = 0
        }

        if (!props.ativos?.id_execucao && props.ativos?.id_execucao == 0) {
            filtros.value.id_execucao = 0
        }
    },
)


const currentUser = computed(() => authStore.loggedUser);


onMounted(async () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        Object.assign(filtros, JSON.parse(saved))
    }
    loadCombos()
    startCalendar()
})
</script>

<style></style>
