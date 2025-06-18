<template>
    <div class="info legenda">
        <strong>Legenda:</strong><br />
        <section v-if="tipo == 1">
            <img src="@/assets/marker-dog.png" class="icone" /> Caso de LV canina<br />
        </section>
        <section v-if="tipo == 2">
            <img src="@/assets/marker-ail.png" class="icone" /> AIL<br />
            <img src="@/assets/marker-shannon.png" class="icone" /> Shannon<br />
            <img src="@/assets/marker-puca.png" class="icone" /> Manual

        </section>
        <section v-if="tipo == 3">
            <div class="item">Clusters</div>
            <div class="item">
                <div class="cluster-icon small">5</div> 1 a 9
            </div>
            <div class="item">
                <div class="cluster-icon medium">50</div> 10 a 99
            </div>
            <div class="item">
                <div class="cluster-icon large">150</div> 100 ou mais
            </div>
            <div class="item">Pontos</div>
            <div class="item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                class="iconep" />10 ou mais
            </div>
            <div class="item">
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png"
                class="iconep" />5 ou mais
            </div>
            <div class="item">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                class="iconep" /> Menos que 5
            </div>
        </section>
        <section v-if="tipo == 4">
            <i class="iconep" style="background: red;"></i>Exemplares<br />
        </section>
        <section v-if="tipo == 5">
            <i class="iconep" style="background: red;"></i>Quantidade<br />
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                class="iconep" />10 ou mais<br />
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png"
                class="iconep" />5 ou mais<br />
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                class="iconep" /> Menos que 5

        </section>
    </div>
</template>

<script>
export default {
    props: ['tipo'],
}
</script>

<style scoped>
.iconep {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 5px;
}

.legenda {
    background: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    line-height: 1.8;
}

.icone {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 5px;
    transform: scale(2);
}

.cluster-icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: rgb(0, 0, 0);
    font-weight: bold;
    text-align: center;
    line-height: 36px;
    margin-right: 10px;
}

.small {
    background-color: rgba(181, 226, 140, 0.6);
}

.medium {
    background-color: rgba(241, 211, 87, 0.6);
}

.large {
    background-color: rgba(253, 156, 115, 0.6);
}
</style>