<template>
    <div class="container">

        <div class="message is-primary">
            <div class="message-header">Tipo de Relatório</div>
            <div class="message-body">
                <button class="button is-link" @click="seleciona">Processar</button>
            </div>
        </div>

        <div class="message is-info" v-if="tipoSelecionado">
            <div class="message-header" style="cursor: pointer" @click="filtroAberto = !filtroAberto">
                <span>Filtros</span>
                <span class="icon">
                    <i :class="filtroAberto ? 'fas fa-angle-up' : 'fas fa-angle-down'"></i>
                </span>
            </div>
            <div class="message-body" v-show="filtroAberto">
                <button class="button is-link" @click="processarDados">Processar</button>
            </div>
        </div>

        <div class="box" v-if="resultadosCarregados">
            <h2 class="subtitle">Resultados</h2>

        </div>

    </div>
</template>

<script>
export default {
    name: "Indicadores",
    data() {
        return {
            tipoSelecionado: false,
            resultadosCarregados: false,
            filtroAberto: false
        }
    },
    methods: {
        processarDados() {
            this.resultadosCarregados = true
        },
        seleciona() {
            this.tipoSelecionado = true
        }
    }
}

</script>

<style scoped>
.message-body {
    transition: all 0.3s ease-in-out;
}
</style>