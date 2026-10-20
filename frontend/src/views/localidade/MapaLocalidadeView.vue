<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader :active="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Coordenadas</p>
                        {{ localCoordenadas.value }}
                    </header>
                    <div class="card-content">
                        <div class="mapa-container" style="height: 700px; width: 100%; position: relative"
                            v-show="activeMapa">
                            <div class="toolbar-container p-2">
                                <button class="button is-info is-outlined" title="Remover último ponto"
                                    @click="removerUltimoPonto">
                                    <span class="icon is-small">
                                        <i class="fas fa-arrow-rotate-left"></i>
                                    </span>
                                </button>
                                <button class="button is-info is-outlined" title="Cancelar desenho"
                                    @click="cancelarDesenho">
                                    <span class="icon is-small">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </div>
                            <div id="map" style="width: 100%; height: 100%"></div>
                        </div>
                        <br>
                        <hr>
                        <br>
                        <div class="field">
                            <div class="columns is-centered">
                                <label class="switch">
                                    <input id="switchMapa" type="checkbox" name="switchMapa" v-model="activeMapa"
                                        @change="alternarVisualizacao">
                                    <span class="slider round"></span>
                                </label>
                                <label for="switchMapa" class="label">Mostrar Mapa</label>
                            </div>
                            <hr>

                            <div class="columns">
                                <div class="column is-10 is-offset-1">
                                    <fieldset class="fieldset">
                                        <legend>Novas coordenadas</legend>
                                        <div class="columns">
                                            <div class="column is-4 is-offset-1">
                                                <input type="text" class="input" v-model="ponto.latitude">
                                            </div>
                                            <div class="column is-4">
                                                <input type="text" class="input" v-model="ponto.longitude">
                                            </div>
                                            <div class="column is-2">
                                                <button type="button" class="button is-primary" @click="adicionarPonto"
                                                    title="Incluir">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-plus"></i>
                                                    </span>
                                                </button>

                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                            <hr>

                            <p class="card-header-title is-centered">Delimitação</p>
                            <div class="columns">
                                <div class="column is-10 is-offset-1">
                                    <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="localCoordenadas"
                                        :columns="columns" :pagination="false" :buttons="['edit', 'delete']"
                                        :has-exports="false" :calcHeight="true" @edit="onEditRow" :deleted-id="delId"
                                        @delete="onDeleteRow" persistence-id="Localidade" />

                                    <p class="help is-info">
                                        * Dica: Polígonos fecham no mesmo ponto inicial. Se não fechar, o sistema
                                        fechará automaticamente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="voltaLocalidade" @cancel="null" @aux="limparMapa" :cFooter="cFooter" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script setup>
import Loader from '@/components/general/Loader.vue';
import Message from '@/components/general/Message.vue';
import MyTable from '@/components/forms/MyTable.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import FooterCard from '@/components/forms/FooterCard.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM.js';
import Draw from 'ol/interaction/Draw.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useGeographic } from 'ol/proj.js';

const geojsonFormat = new GeoJSON()
const confirmDialog = ref(null)

import { useLocalidadeStore } from '@/store/localidadeStore'

import 'ol/ol.css'

// Facilita o uso de coordenadas em Longitude/Latitude ([lon, lat])
useGeographic();

var ponto = ref({
    id: 0,
    latitude: '',
    longitude: ''
})

const cFooter = {
    strSubmit: "Salvar",
    strCancel: "Cancelar",
    strAux: "Limpar",
    aux: true,
}


const columns = [
    { headerName: "Latitude", field: "latitude" },
    { headerName: "Longitude", field: "longitude" },
]

var localCoordenadas = ref([])

const router = useRouter()

let map;
let source = new VectorSource();
let vectorLayer;
let drawInteraction;


let isLoading = ref(false)
let showMessage = ref(false)
let activeMapa = ref(false)

let message = ref('')
let type = ref('')
let caption = ref('')
let delId = ref(0)

const localidadeStore = useLocalidadeStore()

function generateId() {
    return Date.now().toString() + Math.random().toString(36).substring(2)
}

function alternarVisualizacao() {
    if (activeMapa.value) {
        irParaMapa();
    }
}

async function limparMapa() {
    if (localCoordenadas.value.length > 0) {
        const ok = await confirmDialog.value.show({
            title: 'Desfazer',
            message: 'Deseja mesmo descartar as coordenadas inseridas até agora?',
            okButton: 'Confirmar',
        })
        if (ok) {
            localCoordenadas.value = []
        }
    }
}

function removerUltimoPonto() {
    if (drawInteraction) {
        drawInteraction.removeLastPoint();
    }
}

// Cancela o desenho atual por completo e limpa o rascunho
function cancelarDesenho() {
    if (drawInteraction) {
        drawInteraction.abortDrawing();
    }
}

function irParaMapa() {

    setTimeout(() => {
        if (map) {
            map.updateSize();
        }

        if (source) {
            // 1. Remove temporariamente a interação do Draw para evitar conflito com o source.clear()
            if (drawInteraction) {
                map.removeInteraction(drawInteraction);
            }

            // 2. Agora o clear() roda limpo sem o Draw reclamar
            source.clear();

            // 3. Adiciona a feature gerada pela tabela
            const feature = criarFeatureViaGeoJson();
            if (feature) {
                source.addFeature(feature);

                const extent = feature.getGeometry().getExtent();
                if (extent && !extent.some(isNaN)) {
                    map.getView().fit(extent, {
                        padding: [50, 50, 50, 50],
                        maxZoom: 16
                    });
                }
            }

            // 4. Reaplica a interação do Draw para o usuário poder desenhar de novo se quiser
            if (drawInteraction) {
                map.addInteraction(drawInteraction);
            }
        }
    }, 50);
}

function voltaLocalidade() {
    sincronizarCoordenadasParaStore()
    // Volta para a tela do formulário (que reaparecerá totalmente preenchida)
    router.back()
}

function onEditRow(id) {
    const row = localCoordenadas.value.find(item => item.id === id);
    if (row) {
        ponto.value = Object.assign({}, row);
    }
}

async function onDeleteRow(id) {
    localCoordenadas.value = localCoordenadas.value.filter((i) => i.id != id);
    delId.value = id;
}

function formatarCoordenada(campo) {
    const valorOriginal = ponto.value[campo]

    if (valorOriginal === null || valorOriginal === '' || valorOriginal === undefined) return null

    // 1. Substitui vírgula por ponto decimal
    let str = String(valorOriginal).trim().replace(',', '.')
    let num = parseFloat(str)

    if (isNaN(num)) return null

    // 2. Garante o sinal negativo (hemisférios Sul e Oeste)
    if (num > 0) {
        num = -num
    }

    // 3. Corrige a falta de ponto decimal se o valor for muito alto
    // Exemplo: -2355054 vira -23.55054
    if (campo === 'latitude') {
        while (Math.abs(num) > 90) {
            num = num / 10
        }
    } else if (campo === 'longitude') {
        while (Math.abs(num) > 180) {
            num = num / 10
        }
    }


    return Number(num.toFixed(6))
}

function adicionarPonto() {
    //const lat = Number(String(ponto.value.latitude).replace(',', '.'));
    // const lng = Number(String(ponto.value.longitude).replace(',', '.'));
    const lat = formatarCoordenada('latitude')
    const lng = formatarCoordenada('longitude')

    if (isNaN(lat) || isNaN(lng)) {
        console.error("Latitude ou Longitude inválida!");
        return;
    }

    const dadosTratados = {
        id: ponto.value.id && ponto.value.id !== 0 ? ponto.value.id : generateId(),
        latitude: lat,
        longitude: lng
    };

    if (dadosTratados.id && ponto.value.id !== 0) {
        // MODO EDIÇÃO
        localCoordenadas.value = localCoordenadas.value.map(item =>
            item.id === dadosTratados.id ? dadosTratados : item
        );
    } else {
        // MODO INCLUSÃO
        localCoordenadas.value = [...localCoordenadas.value, dadosTratados];
    }

    ponto.value = {
        id: 0,
        latitude: '',
        longitude: ''
    }

    gridApi.refreshCells()
}

function closeMessage() {
    showMessage.value = false
}

function initMapa() {
    source = new VectorSource();
    vectorLayer = new VectorLayer({
        source: source,
    });

    // 2. Inicializar o Mapa
    map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            vectorLayer,
        ],
        view: new View({
            center: [-48.548, -22.896],
            zoom: 7,
        }),
    });

    // 3. Adicionar a interação de Desenho
    drawInteraction = new Draw({
        source: source,
        type: 'Polygon',
    });
    map.addInteraction(drawInteraction);

    // 4. Capturar e Salvar as Coordenadas ao finalizar o desenho
    drawInteraction.on('drawend', (event) => {
        const polygonFeature = event.feature;
        const geometry = polygonFeature.getGeometry();

        const geometryOnly = geojsonFormat.writeGeometryObject(geometry);

        // 1. Atualiza a propriedade no store
        localidadeStore.localidade.coordenadas = geometryOnly;
        localidadeStore.setCoordenadas(geometryOnly);

        // 2. Atualiza a tabela na mesma hora
        carregarTextoDasCoordenadas();
    });
}

function criarFeatureViaGeoJson() {
    if (!localCoordenadas.value || localCoordenadas.value.length === 0) {
        return null;
    }

    // 1. Mapeia os pontos da tabela para o formato [longitude, latitude] do GeoJSON
    const ring = localCoordenadas.value.map(item => [
        Number(item.longitude),
        Number(item.latitude)
    ]);

    // 2. Garante que o polígono está fechado (primeiro e último iguais)
    const primeiro = ring[0];
    const ultimo = ring[ring.length - 1];
    if (primeiro[0] !== ultimo[0] || primeiro[1] !== ultimo[1]) {
        ring.push([...primeiro]);
    }

    // 3. Monta o objeto GeoJSON em memória (sem mexer no store desnecessariamente aqui)
    const geojsonPolygon = {
        type: "Polygon",
        coordinates: [ring]
    };

    // 4. Como você está usando `useGeographic()`, o OpenLayers já trabalha nativamente com Lon/Lat (EPSG:4326)
    const format = new GeoJSON();
    const feature = format.readFeature(geojsonPolygon);

    return feature;
}


function carregarTextoDasCoordenadas() {
    const geojson = localidadeStore.localidade.coordenadas

    if (geojson && geojson.coordinates && geojson.coordinates[0]) {
        // Pega a lista de pares [long, lat]
        const pontos = geojson.coordinates[0]

        localCoordenadas.value = pontos.map(p => ({
            id: generateId(),
            latitude: p[1],   // Geralmente o índice 1 é a latitude
            longitude: p[0]   // Geralmente o índice 0 é a longitude
        }))
    }
}

function sincronizarCoordenadasParaStore() {
    // Garante que temos pelo menos um polígono válido (geralmente um polígono precisa de pelo menos 3 ou 4 pontos)
    if (!localCoordenadas.value || localCoordenadas.value.length === 0) {
        localidadeStore.setCoordenadas(null);
        return;
    }

    // Mapeia os pontos da tabela de volta para o formato [longitude, latitude] do GeoJSON
    const ring = localCoordenadas.value.map(item => [
        Number(item.longitude),
        Number(item.latitude)
    ]);

    // O GeoJSON exige que o polígono seja fechado (o primeiro e o último ponto devem ser iguais).
    // Verificamos se o último ponto é igual ao primeiro; se não for, adicionamos o primeiro ao final.
    const primeiro = ring[0];
    const ultimo = ring[ring.length - 1];

    if (primeiro[0] !== ultimo[0] || primeiro[1] !== ultimo[1]) {
        ring.push([...primeiro]);
    }

    // Monta a estrutura padrão de um Polygon do GeoJSON
    const geojsonPolygon = {
        type: "Polygon",
        coordinates: [ring]
    };

    // Atualiza o store com o objeto pronto
    localidadeStore.setCoordenadas(geojsonPolygon);
}

onMounted(() => {
    initMapa()
    carregarTextoDasCoordenadas()
})

</script>

<style lang="scss" scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #01182b;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.toolbar-container {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
    /* Garante que a barra fique por cima dos tiles do OpenLayers */
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(4px);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>