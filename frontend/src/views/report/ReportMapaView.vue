<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <div class="card" ref="printArea">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                        <button class="button is-info is-outlined" @click="goBack">
                            <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-rotate-back" />
                            </span>
                            <span>Voltar</span>
                        </button>
                    </header>
                    <div class="card-content">
                        <Loader :active="isLoading" />
                        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type"
                            :caption="caption" />
                        <div class="columns">
                            <div class="column is-8 is-offset-1">
                                <span class="filter">{{ strFiltro }}</span>
                            </div>
                            <div class="column is-1 is-offset-2">
                                <button id="download-pdf" class="button is-danger is-outlined is-small no-print"
                                    @click="gerarPDF" title="Exportar PDF">
                                    <font-awesome-icon icon="fa-solid fa-file-pdf" />
                                </button>
                            </div>
                        </div>

                        <!-- Contêiner do Mapa do OpenLayers -->
                        <div style="position: relative;">
                            <div ref="mapContainer" style="height: 850px; width: 100%;"></div>

                            <!-- Caixa de Camadas Customizada (Substitui o LControl do Leaflet) -->
                            <div v-show="showLayers" class="ol-custom-layer-box"
                                style="position: absolute; top: 10px; right: 10px; z-index: 1000; background: white; padding: 10px; width: 150px; border: 1px solid #ccc; border-radius: 4px;">
                                <label v-for="(layer, key) in tileLayers" :key="key" class="mb-2">
                                    <input type="radio" name="basemap" :value="key" v-model="currentLayer"
                                        @change="changeLayer(key)" />
                                    {{ layer.name }}<br>
                                </label>
                            </div>

                            <!-- Botão flutuante para abrir o menu de camadas -->
                            <button @click="toggleLayerBox" class="button is-gosth is-outlined"
                                style="position: absolute; top: 10px; right: 10px; z-index: 999;" title="Layers">
                                <span class="icon is-small">
                                    <i class="fas fa-layer-group"></i>
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="popup" class="ol-popup">
        <div id="popup-content"></div>
    </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import reportService from "@/services/report.service";
import Message from "@/components/general/Message.vue";
import Legenda from '@/components/mapa/Legenda.vue';
import { createApp, nextTick } from 'vue';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Importações do OpenLayers
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import XYZ from 'ol/source/XYZ.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import { Style, Icon, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style.js';
import Overlay from 'ol/Overlay.js';
import ClusterSource from 'ol/source/Cluster.js';
import { useGeographic } from 'ol/proj.js';


export default {
    data() {
        return {
            id: 0,
            filter: {},
            pontos: [],
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            title: 'Mapa',
            strFiltro: '',
            showLayers: false,
            currentLayer: 'streets',
            map: null,
            clusterSource: null,
            vectorSource: null,
            vectorLayer: null,
            container: null,
            content: null,
            overlay: null,
            tileLayers: {
                streets: {
                    name: "Mapa",
                    source: new OSM()
                },
                satellite: {
                    name: "Satélite",
                    source: new XYZ({
                        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        attributions: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    })
                }
            }
        }
    },
    components: {
        Message,
        Loader
    },
    mounted() {
        this.container = document.getElementById('popup')
        this.content = document.getElementById('popup-content')
        this.overlay = new Overlay({
            element: this.container,
            autoPan: true,
            positioning: 'bottom-center', // Ancre embaixo e no centro do elemento
            offset: [0, -10],// Centraliza o mapa suavemente se o popup ficar fora da tela
            autoPanAnimation: { duration: 250 }
        });

        this.initMap();
        this.carregarDados();
    },
    created() {
        this.id = this.$route.params.id;

        switch (Number(this.id)) {
            case 1:
                this.title = 'Casos Novos de LVC';
                break;
            case 2:
                this.title = 'Métodos de Captura';
                break;
            case 3:
                this.title = 'Cluster de Capturas';
                break;
            case 4:
                this.title = `Densidade de <i>L. longipalpis</i>`;
                break;
            case 5:
                this.title = 'Localidades Cadastradas';
                break;
            default:
                this.title = 'Não registrado';
                break;
        }
        this.filter = localStorage.getItem('filterArthroMapa');
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'mapas' })
        },
        closeMessage() {
            this.showMessage = false;
        },
        initMap() {
            // 1. Cria a fonte e camada vetorial para os pontos
            this.vectorSource = new VectorSource();

            if (this.id === '5') {
                this.vectorLayer = new VectorLayer({
                    source: this.vectorSource,
                });
            } else {

                //  this.vectorLayer = new VectorLayer({ source: this.vectorSource });

                this.clusterSource = new ClusterSource({
                    distance: 50,
                    minDistance: 0, // Distância em pixels para agrupar os pontos (ajuste conforme preferir)
                    source: this.vectorSource,
                });

                this.vectorLayer = new VectorLayer({
                    source: this.clusterSource,
                    style: (feature) => {
                        // Pega os pontos que estão agrupados dentro deste cluster
                        const size = feature.get('features').length;
                        const featuresAgrupadas = feature.get('features');
                        const somaTotal = featuresAgrupadas.reduce((acc, f) => acc + (f.get('dados').quant || 1), 0);

                        // Se houver apenas 1 ponto no grupo, renderiza o marcador normal
                        if (size === 1 || this.id === '2') {
                            const pontoOriginal = feature.get('features')[0].get('dados');
                            return this.getFeatureStyle(pontoOriginal);
                        }

                        // Se houver mais de 1 ponto, desenha a bola de cluster somada
                        return new Style({
                            image: new CircleStyle({
                                radius: 18,
                                fill: new Fill({ color: '#db343c' }),
                                stroke: new Stroke({ color: '#000000', width: 3 }),
                            }),
                            text: new Text({
                                text: String(somaTotal), // Mostra a quantidade de pontos somados no grupo
                                fill: new Fill({ color: '#fff' }),
                                font: 'bold 12px sans-serif'
                            })
                        });
                    }
                });
            }
            // 2. Camada base inicial (OSM)
            const baseLayer = new TileLayer({ source: this.tileLayers.streets.source });

            // 3. Inicializa o mapa do OpenLayers apontando para o ref="mapContainer"
            this.map = new Map({
                target: this.$refs.mapContainer,
                layers: [baseLayer, this.vectorLayer],
                view: new View({
                    center: fromLonLat([-46.633308, -23.55052]), // São Paulo (Lon, Lat no OL)
                    zoom: 8
                })
            });
            this.map.addOverlay(this.overlay);



            this.map.on('singleclick', (evt) => {
                const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);

                if (feature) {
                    const coordinate = evt.coordinate;

                    const clusteredFeatures = feature.get('features');

                    let labelText = '';

                    if (clusteredFeatures && clusteredFeatures.length > 0) {
                        // Se for um cluster, pegamos a primeira feature de dentro dele
                        const realFeature = clusteredFeatures[0];

                        // Verifica se os seus dados estão aninhados em 'dados' (como apareceu no seu log)
                        const dados = realFeature.get('dados');
                        labelText = dados ? dados.label : realFeature.get('label');
                    } else {
                        // Se for uma feature normal (sem cluster)
                        const dados = feature.get('dados');
                        labelText = dados ? dados.label : feature.get('label');
                    }

                    // Atualiza o conteúdo do seu popup
                    this.content.innerHTML = `Detalhes: ${labelText || 'Sem label'}`;
                    // Posiciona o popup na coordenada do clique
                    this.overlay.setPosition(coordinate);
                } else {
                    // Esconde o popup se clicar fora
                    this.overlay.setPosition(undefined);
                }
            });

            // 4. Adiciona o controle customizado da Legenda via Vue (equivalente ao L.control do Leaflet)
            this.adicionarLegendaControl();
        },
        carregarTextoDasCoordenadas(geo) {
            const geojson = JSON.parse(geo.fant_coordenadas)
            if (geojson && geojson.coordinates && geojson.coordinates[0]) {
                // Pega a lista de pares [long, lat]
                const pontos = geojson.coordinates[0]

                const loc = pontos.map(p => ({
                    label: geo.label,
                    latitude: p[1],   // Geralmente o índice 1 é a latitude
                    longitude: p[0]   // Geralmente o índice 0 é a longitude
                }))
                return this.criarFeatureViaGeoJson(loc)
            }
        },
        criarFeatureViaGeoJson(geojson) {
            if (!geojson || geojson.length === 0) {
                return null;
            }
            const lbl = geojson[0].label

            useGeographic();

            const ring = geojson.map(item => [
                Number(item.longitude),
                Number(item.latitude)
            ]);

            // Fecha o anel
            const primeiro = ring[0];
            const ultimo = ring[ring.length - 1];

            if (
                primeiro[0] !== ultimo[0] ||
                primeiro[1] !== ultimo[1]
            ) {
                ring.push([...primeiro]);
            }

            const feature = new Feature({
                geometry: new Polygon([ring]),
                label: lbl
            });

            feature.setStyle(new Style({
                stroke: new Stroke({ color: '#0066ff', width: 1.5 }),
                fill: new Fill({ color: 'rgba(0, 102, 255, 0.5)' }),
            }));

            return feature;
        },
        adicionarLegendaControl() {
            const container = document.createElement('div');
            container.id = 'vue-legenda';

            // Monta o componente de Legenda
            createApp(Legenda, { tipo: Number(this.id) }).mount(container);

            const legendaOverlay = new Overlay({
                element: container,
                positioning: 'bottom-right',
                stopEvent: true
            });

            // Posiciona fixo no canto inferior direito via CSS overlay do OL
            // Ou podemos injetar diretamente no DOM do mapa:
            this.$refs.mapContainer.appendChild(container);
            container.style.position = 'absolute';
            container.style.bottom = '10px';
            container.style.right = '10px';
            container.style.zIndex = '1000';
        },

        carregarDados() {
            this.isLoading = true;
            reportService.getMapa(this.id, this.filter)
                .then((response) => {
                    const data = response.data;
                    this.pontos = data.data;
                    if (this.pontos.length == 0) {
                        this.showMessage = true;
                        this.message = "Nenhum ponto a exibir";
                        this.type = "alert";
                        this.caption = this.title;
                        setTimeout(() => {
                            this.showMessage = false;
                            this.$router.go(-1);
                        }, 5000);
                    } else {
                        this.atualizarMarcadoresNoMapa();
                    }
                    this.strFiltro = data.filter;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => { this.isLoading = false });
        },

        atualizarMarcadoresNoMapa() {
            this.vectorSource.clear();

            if (this.id === '5') {
                const features = this.pontos.map(pol => {
                    return this.carregarTextoDasCoordenadas(pol)
                })
                this.vectorSource.addFeatures(features);
            } else {

                const features = this.pontos.map(ponto => {
                    // Converte Lon/Lat para projeção interna do OpenLayers (EPSG:3857)
                    const coords = fromLonLat([ponto.longitude, ponto.latitude]);
                    const feature = new Feature({
                        geometry: new Point(coords),
                        dados: ponto
                    });

                    // Define o estilo do marcador (ícone personalizado ou badge com número para id=4)
                    feature.setStyle(this.getFeatureStyle(ponto));
                    return feature;
                });

                this.vectorSource.addFeatures(features);

                this.clusterSource.refresh();
            }

            // Dá o zoom automático abrangendo todos os pontos (equivalente ao fitBounds)
            const extent = this.vectorSource.getExtent();
            if (!isNaN(extent[0])) {
                this.map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 15 });
            }
        },

        getFeatureStyle(ponto) {
            if (this.id === '5') {

                return new Style({
                    stroke: new Stroke({ color: '#ff0000', width: 3 }),
                    fill: new Fill({ color: 'rgba(255, 0, 0, 0.05)' }),
                })

            } else if (this.id > 2) {
                // Estilo com número dentro (equivalente ao criarIcone do Leaflet)
                return new Style({
                    image: new CircleStyle({
                        radius: 15,
                        fill: new Fill({ color: '#db343c' })
                    }),
                    text: new Text({
                        text: String(ponto.quant || ''),
                        fill: new Fill({ color: '#fff' }),
                        font: 'bold 12px sans-serif'
                    })
                });
            } else {
                const url = this.getIconUrl(ponto.tipo);
                console.log('ID:', this.id, 'Tipo:', ponto.tipo, 'URL:', url);
                // Ícone de imagem baseado no tipo
                return new Style({
                    image: new Icon({
                        src: url,
                    })
                });
            }
        },

        getIconUrl(tipo) {
            if (this.id == 1) {
                return new URL('@/assets/marker-dog.png', import.meta.url).href;
            } else if (this.id == 2) {
                switch (tipo) {
                    case 1: return new URL('@/assets/marker-ail.png', import.meta.url).href;
                    case 2: return new URL('@/assets/marker-nasci.png', import.meta.url).href;
                    case 3: return new URL('@/assets/marker-shannon.png', import.meta.url).href;
                    case 4: return new URL('@/assets/marker-puca.png', import.meta.url).href;
                    default: return new URL('@/assets/marker-icon-red.png', import.meta.url).href;
                }
            } else {
                return new URL('@/assets/marker-icon-red.png', import.meta.url).href;
            }
        },


        toggleLayerBox() {
            this.showLayers = !this.showLayers;
        },

        changeLayer(key) {
            if (!this.map) return;
            const selected = this.tileLayers[key];
            // Substitui a camada base (índice 0)
            const layers = this.map.getLayers();
            layers.setAt(0, new TileLayer({ source: selected.source }));
            this.showLayers = false;
        },

        async gerarPDF() {
            const element = this.$refs.printArea;
            const botao = document.querySelector(".no-print");

            if (botao) botao.style.display = "none";
            await nextTick();

            const canvas = await html2canvas(element, { scale: 2, useCORS: true });
            if (botao) botao.style.display = "";

            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF("l", "mm", "a4");
            pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
            pdf.save(`${this.title}.pdf`);
        }
    }
}
</script>

<style>
.myMarker {
    background-color: #db343c;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.filter {
    font-size: small;
    font-weight: 600;
    line-height: 3rem;
}

.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 150px;
}

/* Seta opcional para o balão apontar para o ponto */
.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: white;
    border-width: 10px;
    left: 50%;
    margin-left: -10px;
}

.button {
    margin-right: 1rem;
}
</style>