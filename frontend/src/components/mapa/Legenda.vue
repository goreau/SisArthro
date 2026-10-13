<template>
    <div class="info legenda">
        <strong>Legenda:</strong><br />
        <section v-if="tipo == 1">
            <img src="@/assets/marker-dog.png" class="icone" /> Caso de LV canina<br />
        </section>
        <section v-if="tipo == 2">
            <img src="@/assets/marker-ail.png" class="icone" /> AIL<br />
            <img src="@/assets/marker-shannon.png" class="icone" /> Shannon<br />
            <img src="@/assets/marker-puca.png" class="icone" /> Manual<br />
            <img src="@/assets/marker-nasci.png" class="icone" /> Aspiradores<br />
            <img src="@/assets/marker-icon-red.png" class="icone" /> Outros

        </section>
        <section v-if="tipo == 5">
            <i class="iconep" style="background: rgba(0, 102, 255, 0.5)"></i>Localidade<br />
        </section>
        <section v-if="tipo > 2 && tipo != 5">
            <i class="iconep" style="background: red;"></i>Quantidade<br />
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