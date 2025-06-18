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

                        <section>
                            <l-map :zoom="8" style="height: 850px; width: 100%"
                                :center="{ lat: -23.55052, lng: -46.633308 }" @ready="onMapReady">
                            </l-map>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import reportService from "@/services/report.service";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet.markercluster'; // <- JS
import 'leaflet.markercluster/dist/MarkerCluster.css'; // <- CSS
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'; // <- CSS padrão
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
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
    data() {
        return {
            id: 0,
            filter: {},
            pontos: [],
            title: 'Densidade de L. longipalpis - Cluster',
            strFiltro: '',
            map: null,
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            markers: null,
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
        }
    },
    components: {
        Loader,
        LMap,
        LTileLayer,
        Message
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
        onMapReady(mapInstance) {
            this.map = mapInstance;


            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);


            const legendaControl = L.control({ position: 'bottomright' });

            legendaControl.onAdd = function () {
                const container = document.createElement('div');
                container.id = 'vue-legenda';

                // Altere este valor com base na sua lógica (v-model, etc.)
                const tipo = 5;

                // Cria e monta o componente com a prop
                createApp(Legenda, { tipo }).mount(container);

                // Protege contra eventos interferindo no mapa
                L.DomEvent.disableClickPropagation(container);
                L.DomEvent.disableScrollPropagation(container);

                return container;
            };

            legendaControl.addTo(this.map);


        },
        loadPontos() {
            let clusterGroup;

            if (typeof L.markerClusterGroup === 'function') {
                clusterGroup = L.markerClusterGroup({
                    iconCreateFunction: function (cluster) {
                        const markers = cluster.getAllChildMarkers();
                        const totalQuant = markers.reduce((sum, m) => sum + (m.options.quant || 0), 0);

                        return L.divIcon({
                            html: `<div>${totalQuant}</div>`,
                            className: 'custom-cluster',
                            iconSize: [40, 40]
                        });
                    }
                });
            } else if (typeof L.MarkerClusterGroup === 'function') {
                clusterGroup = new L.markerClusterGroup({
                    iconCreateFunction: function (cluster) {
                        const markers = cluster.getAllChildMarkers();
                        const totalQuant = markers.reduce((sum, m) => sum + (m.options.quant || 0), 0);

                        return L.divIcon({
                            html: `<div>${totalQuant}</div>`,
                            className: 'custom-cluster',
                            iconSize: [40, 40]
                        });
                    }
                });
            } else {
                console.error("MarkerClusterGroup não está disponível.");
                return false;
            }


            const bounds = [];

            this.pontos.forEach(point => {

                const quant = point.quant || 0;

                let icon = this.icons.green;
                if (quant >= 10) {
                    icon = this.icons.red;
                } else if (quant >= 5) {
                    icon = this.icons.yellow;
                }

                const marker = L.marker([point.latitude, point.longitude], {
                    icon,
                    quant
                });



                clusterGroup.addLayer(marker);
                bounds.push([point.latitude, point.longitude]);
            });

            this.map.addLayer(clusterGroup);
            this.markers = clusterGroup;

            if (bounds.length) {
                this.map.fitBounds(bounds, { padding: [50, 50] });
            }


        }
    },
    mounted() {
        this.isLoading = true;


        reportService.getMapa(4, this.filter)
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

                this.loadPontos();

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false));
    },
    created() {
        this.id = this.$route.params.id;
        this.filter = localStorage.getItem('filterArthroMapa');
    },
}

</script>

<style>
.filter {
    font-size: small;
    font-weight: 600;
    line-height: 3rem;
}

.custom-cluster {
    background-color: #d32020;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
}

@media print {
    .no-print {
        display: none !important;
    }
}
</style>