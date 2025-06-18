<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader v-if="isLoading" />
                <div class="card" ref="printArea">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
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
                        <div style="height: 100vh;">
                            <l-map ref="leafletMap" style="height: 850px; width: 100%" :zoom="8"
                                :center="[-23.78, -45.93]" @ready="onMapReady">
                                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <l-control position="topright">
                                    <div class="leaflet-bar leaflet-control">
                                        <a class="leaflet-control-layers-toggle" href="#" title="Layers" role="button"
                                            @click.prevent="toggleLayerBox"></a>
                                        <div class="layer-box" v-show="showLayers"
                                            style="background: white; padding: 10px; width: 150px;">
                                            <label v-for="(layer, key) in tileLayers" :key="key" class="mb-2">
                                                <input type="radio" name="basemap" :value="key" v-model="currentLayer"
                                                    @change="changeLayer(key)" />
                                                {{ layer.name }}
                                            </label>
                                        </div>
                                    </div>
                                </l-control>
                            </l-map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import reportService from "@/services/report.service";
import { LMap, LTileLayer, LControl } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import Legenda from '@/components/mapa/Legenda.vue';
import { createApp, nextTick } from 'vue';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Message from "@/components/general/Message.vue";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('@/assets/marker-icon-red.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
    components: {
        LMap,
        LTileLayer,
        LControl,
        Loader,
        Message
    },
    data() {
        return {
            map: null,
            pontos: [], // sua lista de ~6000 pontos
            markerCluster: null,
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            title: 'Cluster de Capturas',
            strFiltro: '',
            showLayers: false,
            currentLayer: 'streets',
            tileLayers: {
                streets: {
                    name: "Mapa",
                    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    layer: null
                },
                satellite: {
                    name: "Satélite",
                    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                    layer: null
                }
            },
            icons: {
                red: new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                }),
                yellow: new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                }),
                green: new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                }),
            },
        };
    },
    methods: {
        async gerarPDF() {
            const element = this.$refs.printArea;
            const botao = document.querySelector(".no-print");

            if (botao) botao.style.display = "none";

            await nextTick();

            // Captura o elemento como imagem com html2canvas
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true
            });

            if (botao) botao.style.display = "";

            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF("l", "mm", "a4");

            // Conversão px -> mm
            const pageWidth = 297;
            const pageHeight = 210;

            pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
            pdf.save(`${this.title}.pdf`);

            // const imgWidth = pageWidth;
            // const imgHeight = (canvas.height * imgWidth) / canvas.width;

            //pdf.addImage(imgData, "JPEG", 0, 10, imgWidth, imgHeight);
            // pdf.save("mapa-via-jspdf.pdf");
        },
        toggleLayerBox() {
            this.showLayers = !this.showLayers;
        },
        changeLayer(key) {
            if (!this.map) return;

            // Remove todas as camadas
            Object.values(this.tileLayers).forEach(l => {
                if (l.layer && this.map.hasLayer(l.layer)) {
                    this.map.removeLayer(l.layer);
                }
            });

            // Adiciona a nova camada
            const selected = this.tileLayers[key];
            if (!selected.layer) {
                selected.layer = L.tileLayer(selected.url);
            }
            selected.layer.addTo(this.map);
            this.showLayers = false;
        },
        onMapReady(mapInstance) {
            this.map = mapInstance;
            //this.loadMarkers();

            const legendaControl = L.control({ position: 'bottomright' });

            legendaControl.onAdd = function () {
                const container = document.createElement('div');
                container.id = 'vue-legenda';

                // Altere este valor com base na sua lógica (v-model, etc.)
                const tipo = 3;

                // Cria e monta o componente com a prop
                createApp(Legenda, { tipo }).mount(container);

                // Protege contra eventos interferindo no mapa
                L.DomEvent.disableClickPropagation(container);
                L.DomEvent.disableScrollPropagation(container);

                return container;
            };

            legendaControl.addTo(this.map);
        },
        getIconByTipo(qt) {
            if (qt > 10) {
                return this.icons.red;
            } else if (qt >=5 ) {
                return this.icons.yellow;
            } else
                return this.icons.green;
        },
        loadMarkers() {
            // Suponha que você já tenha this.pontos preenchido com os dados
            // Cada ponto deve ter latitude e longitude

            let clusterGroup;

            if (typeof L.markerClusterGroup === 'function') {
                this.markerCluster = L.markerClusterGroup(); // forma recomendada
            } else if (typeof L.MarkerClusterGroup === 'function') {
                this.markerCluster = new L.MarkerClusterGroup();
            } else {
                console.error("MarkerClusterGroup não está disponível.");
                return false;
            }

            //  this.markerCluster = new L.MarkerClusterGroup();//L.markerClusterGroup();//

            this.pontos.forEach((ponto) => {
                
                const marker = L.marker([ponto.latitude, ponto.longitude], {
                    title: ponto.nome || "",
                    icon: this.getIconByTipo(ponto.quant),
                });

                const popupContent = `
                    <div style="min-width: 200px">
                        <strong>Quadra: ${ponto.quadra}</strong><br/>
                        <span><b>Espécie:</b><i> ${ponto.spp}</i></span><br/>
                        <span><b>Tipo:</b> ${ponto.tipo}</span><br/>
                        <span><b>Exemplares:</b> ${ponto.label}</span>
                    </div>
                    `;
                marker.bindPopup(popupContent);
                this.markerCluster.addLayer(marker);
            });

            this.map.addLayer(this.markerCluster);

            // Ajusta o mapa para mostrar todos os pontos com margem
            const allCoords = this.pontos.map(p => [p.latitude, p.longitude]);
            const bounds = L.latLngBounds(allCoords);
            this.map.fitBounds(bounds, { padding: [30, 30] });
        },
    },
    mounted() {
        reportService.getMapa(3, this.filter)
            .then((response) => {
                var data = response.data;
                this.pontos = data.data;
                if (this.pontos.length == 0){
                    this.showMessage = true;
                    this.message = "Nenhum ponto a exibir";
                    this.type = "alert";
                    this.caption = this.title;
                    setTimeout(() => {
                        this.showMessage = false;
                        this.$router.go(-1);
                    }, 5000);
                }
                this.strFiltro = data.filter;

                this.loadMarkers();

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false));
        // Simulação de 6000 pontos aleatórios no Brasil
        /*for (let i = 0; i < 6000; i++) {
            this.pontos.push({
                lat: -33 + Math.random() * 20, // latitude aproximada BR
                lng: -58 + Math.random() * 20, // longitude aproximada BR
                nome: `Ponto ${i + 1}`,
            });
        }*/
    },
    created() {
        this.id = this.$route.params.id;
        this.filter = localStorage.getItem('filterArthroMapa');
    },
};
</script>

<style>
.filter {
    font-size: small;
    font-weight: 600;
    line-height: 3rem;
}

.layer-box label {
    display: block;
    margin-bottom: 5px;
}
</style>
