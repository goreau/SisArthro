<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <div class="dvTipo">
                            <div class="columns is-centered">
                                <div class="column is-6">
                                    <div class="tile is-ancestor">
                                        <div class="tile is-parent">
                                            <div class="tile is-child box">
                                                <ul class="mt-3">
                                                    <li v-for="(item, index) in operacionais" :key="item.to">
                                                        <label class="radio">
                                                            <input type="radio" name="operacional" :value="index + 1"
                                                                v-model="tipo_mapa" v-html="index + 1 + '. ' + item.label" />
                                                                <span v-html="index + 1 + '. ' + item.label"></span>
                                                            </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section class="section" v-show="tipo_mapa > 0">
                            <div class="dvTipo">
                                <label class="label has-text-centered">Filtros:</label>
                                <hr>
                                <section>
                                    <div class="columns">
                                        <div class="column is-8 is-offset-2">
                                            <div class="field">
                                                <label class="label">GVE</label>
                                                <div class="control">
                                                    <CmbTerritorio :id_prop="currentUser.id" :tipo="4"
                                                        :sel="filter.id_gve" @selLoc="filter.id_gve = $event" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div class="columns">
                                        <div class="column is-8 is-offset-2">
                                            <div class="field">
                                                <label class="label">Município</label>
                                                <div class="control">
                                                    <CmbMunicipio :id_prop="currentUser.id" :sel="filter.id_municipio"
                                                        @selMun="filter.id_municipio = $event" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section v-show="noAgravo.indexOf(tipo_mapa) == -1">
                                    <div class="columns">
                                        <div class="field column is-8 is-offset-2">
                                            <label class="label">Agravo</label>
                                            <div class="control">
                                                <CmbAuxiliares :tipo="2" @selValue="filter.agravo = $event" :sel="filter.agravo" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <div class="columns">
                                        

                                        
                                    </div>
                                </section>
                                <section  v-show="noDate.indexOf(tipo_mapa) == -1">
                                    <div class="columns">
                                        <div class="column is-2 is-offset-2">
                                            <label class="label">Ano</label>
                                            <div class="select is-primary">
                                                <select v-model="filter.ano" class="input">
                                                    <option value="0">--Selecione--</option>
                                                    <option v-for="year in years" :key="year" :value="year">{{ year }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column is-2 is-offset-1">
                                            <label class="label">Início</label>
                                            <div class="field">
                                                <div class="control" id="contIni">
                                                    <input type="date" id="dtIni">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="column is-2 is-offset-1">
                                            <label class="label">Final</label>
                                            <div class="field">
                                                <div class="control" id="contFim">
                                                    <input type="date" id="dtFim">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                        <section class="section" v-if="tipo_mapa > 0">
                            <div class="columns is-centered">
                                <div class="column is-4">
                                    <div class="control">
                                        <button class="button is-link submit-btn is-fullwidth" id="login"
                                            @click="processar">
                                            <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                                            Processar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import CmbMunicipio from '@/components/forms/CmbMunicipio.vue';
import CmbTerritorio from '@/components/forms/CmbTerritorio.vue';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';
import CmbAuxiliares from '@/components/forms/CmbAuxiliares.vue';

export default {
    name: "Mapas",
    data() {
        return {
            id: 0,
            filter: {},
            ini_date: '',
            fim_date: '',
            dataTable: [],
            tipo_mapa: 0,
            years: [],
            title: 'Mapas',
            strFiltro: '',
            tableName: 'mapas',
            indic: {},
            noDate: [100],
            noAgravo: [1],
            operacionais: [
                { label: "Casos Novos de LVC", to: "/mapa/1" },
                { label: "Métodos de Captura", to: "/mapa/2" },
                { label: "Cluster de Capturas", to: "/clusterCaptura" },
                { label: "Densidade de <i>L. longipalpis</i>", to: "/mapa/4" },
                { label: "Densidade de <i>L. longipalpis</i> - Cluster", to: "/cluster" }
            ],
        };
    },
    methods: {
        processar() {
            var filt = JSON.stringify(this.filter);
            localStorage.setItem('filterArthroMapa', filt);

            const item = this.operacionais[this.tipo_mapa - 1];
            if (item?.to) {
                this.$router.push(item.to);
            } else {
                alert("Por favor, selecione uma opção válida.");
            }
        },
        setDateIni($event) {
            if ($event && $event.length > 0) {
                this.filter.dt_inicio = moment(String($event)).format("YYYY-MM-DD");
            } else {
                this.filter.dt_inicio = '';
            }
        },
        setDateFim($event) {
            if ($event && $event.length > 0) {
                this.filter.dt_final = moment(String($event)).format("YYYY-MM-DD");
            } else {
                this.filter.dt_final = '';
            }
        },
    },
    components: {
        CmbMunicipio,
        CmbTerritorio,
        CmbAuxiliares,
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.id_usuario = cUser.id;
        }

        const currentYear = new Date().getFullYear();
        this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);

        var obj = localStorage.getItem('filterArthroMapa');
        if (obj) {
            this.filter = JSON.parse(obj);

            if (this.filter.dt_inicio){
                this.ini_date = this.filter.dt_inicio == '' ? '' : moment(String(this.filter.dt_inicio)).format('DD/MM/YYYY');
            }
            if (this.filter.dt_final){
                this.fim_date = this.filter.dt_final == '' ? '' : moment(String(this.filter.dt_final)).format('DD/MM/YYYY');
            }
        }

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
            startDate: this.ini_date,
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
                this.filter.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
            });

            element.bulmaCalendar.on('clear', datepicker => {
                this.filter.dt_inicio = '';
            });
        }

        options = {
            type: "date",
            dateFormat: "dd/MM/yyyy",
            startDate: this.fim_date,
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
                this.filter.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
            });

            element2.bulmaCalendar.on('clear', datepicker => {
                this.filter.dt_final = '';
            });
        }

    },
}
</script>

<style scoped>
li {
    padding-top: 1rem;
}

.dvTipo {
    border: 1px solid #aaa;
    border-radius: 4px;
    position: relative;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    width: 100%;
}
</style>