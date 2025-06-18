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
                <button id="download-pdf" class="button is-danger is-outlined is-small no-print" @click="gerarPDF" title="Exportar PDF">
                  <font-awesome-icon icon="fa-solid fa-file-pdf" />
                </button>
              </div>
            </div>
            <section v-if="id < 4">
              <l-map :zoom="8" style="height: 850px; width: 100%" @ready="onMapReady"
                :center="{ lat: -23.55052, lng: -46.633308 }">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors" />
                <l-marker v-for="ponto in pontos" :key="ponto.id" :lat-lng="[ponto.latitude, ponto.longitude]">
                  <l-icon :icon-url="getIconUrl(ponto.tipo)" :icon-size="iconSize" />
                  <!-- shadow-url="@/assets/marker-shadow.png" /> "/leaflet/images/marker-shadow.png" />-->
                  <l-popup>Detalhes: {{ ponto.label }}</l-popup>
                </l-marker>
                <l-control position="topright">
                  <div class="leaflet-bar leaflet-control">
                    <a class="leaflet-control-layers-toggle" href="#" title="Layers" role="button"
                      @click.prevent="toggleLayerBox"></a>
                    <div class="layer-box" v-show="showLayers" style="background: white; padding: 10px; width: 150px;">
                      <label v-for="(layer, key) in tileLayers" :key="key" class="mb-2">
                        <input type="radio" name="basemap" :value="key" v-model="currentLayer"
                          @change="changeLayer(key)" />
                        {{ layer.name }}
                      </label>
                    </div>
                  </div>
                </l-control>
              </l-map>
            </section>
            <section v-if="id == 4">
              <l-map :zoom="8" style="height: 850px; width: 100%" @ready="onMapReady"
                :center="{ lat: -23.55052, lng: -46.633308 }">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <l-marker v-for="ponto in pontos" :key="ponto.id" :lat-lng="[ponto.latitude, ponto.longitude]"
                  :icon="criarIcone(ponto.quant)">
                  <l-popup>
                    Detalhes: {{ ponto.label }}
                  </l-popup>
                </l-marker>
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
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LIcon, LControl } from "@vue-leaflet/vue-leaflet";
import Legenda from '@/components/mapa/Legenda.vue';
import { createApp, nextTick } from 'vue';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Message from "@/components/general/Message.vue";


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
      center: { lat: -23.55052, lng: -46.633308 },
      iconWidth: 40,
      iconHeight: 40,
      showLayers: false,
      currentLayer: 'streets',
      map: null,
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
    }
  },
  components: {
    Message,
    Loader,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LControl,
    LPopup
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
    getIconUrl(tipo) {
      if (this.id == 1) {
        this.iconWidth = 40;
        return new URL('@/assets/marker-dog.png', import.meta.url).href;
      } else if (this.id == 2) {
        this.iconWidth = 25;
        this.iconHeight = 25;
        switch (tipo) {
          case 40:
            return new URL('@/assets/marker-puca.png', import.meta.url).href;
          case 41:
          case 50:
            return new URL('@/assets/marker-nasci.png', import.meta.url).href;
          case 48:
            return new URL('@/assets/marker-shannon.png', import.meta.url).href;
          default:
            return new URL('@/assets/marker-ail.png', import.meta.url).href;
        }
      } else {
        this.iconWidth = 25;
        return new URL('@/assets/marker-icon-red.png', import.meta.url).href;
      }
    },
    criarIcone(valor) {
      return L.divIcon({
        className: "custom-icon",
        html: `<div class="myMarker">${valor}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    },
    onMapReady(mapInstance) {
      this.map = mapInstance;

      // Inicializa camada padrão
      const defaultLayer = this.tileLayers[this.currentLayer];
      defaultLayer.layer = L.tileLayer(defaultLayer.url);
      defaultLayer.layer.addTo(mapInstance);

      const legendaControl = L.control({ position: 'bottomright' });

      const tipoMapa = this.id;

      legendaControl.onAdd = function () {
        const container = document.createElement('div');
        container.id = 'vue-legenda';

        // Altere este valor com base na sua lógica (v-model, etc.)
        const tipo = tipoMapa;

        // Cria e monta o componente com a prop
        createApp(Legenda, { tipo }).mount(container);

        // Protege contra eventos interferindo no mapa
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        return container;
      };

      legendaControl.addTo(this.map);
    }
  },
  mounted() {
    this.isLoading = true;

    reportService.getMapa(this.id, this.filter)
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id == 1){
      this.title = 'Casos Novos de LVC';
    } else if (this.id == 2){
      this.title = 'Métodos de Captura';
    } else {
      this.title = 'Densidade de L. longipalpis';
    }
    this.filter = localStorage.getItem('filterArthroMapa');
  },
  computed: {
    iconUrl() {
      if (this.id == 2) {
        this.iconWidth = 25;
        return new URL('@/assets/marker-icon-red.png', import.meta.url).href;
      } else {
        this.iconWidth = 40;
        return new URL('@/assets/marker-dog.png', import.meta.url).href;
      }

    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  watch: {
    pontos(newMarkers) {
      if (!this.map || newMarkers.length === 0) return;

      /* newMarkers.forEach(({ lat, lng }) => {
         L.marker([lat, lng]).addTo(this.map.value);
       });*/

      const bounds = L.latLngBounds(newMarkers.map(m => [m.latitude, m.longitude]));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}
</script>

<style>
.layer-box label {
  display: block;
  margin-bottom: 5px;
}

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
</style>