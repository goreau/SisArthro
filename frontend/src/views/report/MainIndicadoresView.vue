<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <div class="dvTipo">
                            <div class="tile is-ancestor">
                                <div class="tile is-parent is-6">
                                    <div class="tile is-child box">
                                        <h2 class="title is-6 has-text-centered">Indicadores de LVC</h2>
                                        <ul>
                                            <li v-for="(item, index) in operacionais" :key="item.to">
                                                <label class="radio">
                                                    <input type="radio" name="operacional" :value="index + 1"
                                                        v-model="tipo_indic" />
                                                    {{ index + 1 }}. {{ item.label }} </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="tile is-parent is-6">
                                    <div class="tile is-child box">
                                        <h2 class="title is-6 has-text-centered">Indicadores de Vetor e Ambiente</h2>
                                        <ul>
                                            <li v-for="(item, index) in vetores" :key="item.to">
                                                <label class="radio">
                                                    <input type="radio" name="vetor" :value="index + 20"
                                                        v-model="tipo_indic" />
                                                    {{ index + 1 }}. <span v-html="item.label"></span> </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section class="section" v-show="tipo_indic > 0">
                            <div class="dvTipo">
                                <label class="label has-text-centered">Filtros:</label>
                                <hr>
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
                                <div class="columns">
                                    <div class="column is-3 is-offset-2">
                                        <label class="label">Ano</label>
                                        <div class="select is-primary">
                                            <select v-model="filter.ano" class="input">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="year in years" :key="year" :value="year">{{ year }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="column is-3 is-offset-2">
                                        <label class="label">Ciclo</label>
                                        <div class="field">
                                            <input type="number" class="input" id="ciclo" v-model="filter.ciclo">
                                        </div>
                                    </div>
                                </div>
                                <section class="section" v-if="tipo_indic > 0">
                                    <div class="columns is-centered">
                                        <div class="column is-4">
                                            <div class="control">
                                                <button class="button is-link submit-btn is-fullwidth" id="login"
                                                    @click="processar">
                                                    <span class="btico"><font-awesome-icon
                                                            icon="fa-solid fa-check" /></span>
                                                    Processar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section v-if="hasData">
                                    <Loader v-if="isLoading" />
                                    <div class="box-com-borda has-text-centered">

                                        <div class="container is-wide" v-for="(indic, index) in indics" :key="index">
                                            <div class="columns is-vcentered is-fullwidth">
                                                <!-- Coluna 1: descrição -->
                                                <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                                    <span class="divisor" v-html="indic.titulo + ' ='" />
                                                </div>

                                                <!-- Coluna 2: fórmula dividida -->
                                                <div class="column is-narrow">
                                                    <div class="long-division">
                                                        <div class="quotient">
                                                            {{ indic.quocient }}
                                                        </div>
                                                        <div class="dividend">
                                                            {{ indic.divisor }}
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Coluna 3: sinal de igualdade -->
                                                <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                                    <span class="divisor">=</span>
                                                </div>

                                                <!-- Coluna 4: fórmula com números -->
                                                <div class="column is-narrow">
                                                    <div class="long-division">
                                                        <div class="quotientn">{{ indic.numerator }}</div>
                                                        <div class="dividendn">{{ indic.denominator }}</div>
                                                    </div>
                                                </div>

                                                <!-- Coluna 5: resultado final -->
                                                <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                                    <span class="divisor">= {{ indic.indic }}</span>
                                                </div>
                                            </div>
                                            <span v-if="index < indics.length - 1">
                                                <br>
                                            </span>
                                        </div>
                                    </div>
                                </section>
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
import Loader from "@/components/general/Loader.vue";
import reportService from "@/services/report.service";

export default {
    name: "Indicadores",
    data() {
        return {
            id: 0,
            filter: {},
            ini_date: '',
            fim_date: '',
            years: [],
            hasData: false,
            title: 'Indicadores',
            strFiltro: '',
            tableName: 'indicadores',
            indic: {},
            indics: [],
            noDate: new Array('103'),
            tipo_indic: 0,
            isLoading: false,
            operacionais: [
                { label: "Positividade Canina no município por ciclo ou por ano", to: "/indicadores/1" },
                { label: "Coeficiente de prevalência da área prioritária ou do município", to: "/indicadores/2" },
                { label: "Coeficiente de incidência da área prioritária ou do município", to: "/indicadores/3" },
                { label: "Proporção de cães eutanasiados no município", to: "/indicadores/4" },
                { label: "Percentual de cães eutanasiados na área prioritária por ciclo", to: "/indicadores/5" },
                { label: "Percentual de cães com recusa de eutanasia na área prioritária por ciclo", to: "/indicadores/6" },
                { label: "Percentual de cães com recusa de colocação de coleira na área prioritária por ciclo", to: "/indicadores/7" },
                { label: "Percentual de cães soropositivos com coleira na área prioritária por ciclo", to: "/indicadores/8" },
                { label: "Percentual de cães em tratamento para LVC na área prioritária por ciclo", to: "/indicadores/9" },
                { label: "Percentual de cães vacinados para LVC na área prioritária no ciclo", to: "/indicadores/10" }
            ],
            vetores: [
                { label: "Densidade de <em>Lutzomyia longipalpis</em> em AIL por mes, ano ou período de avaliação", to: "/inicio" },
                { label: "Densidade de <em>Lutzomyia longipalpis</em> em captura manual por mes, ano ou período de avaliação", to: "/inicio" },
                { label: "Esforço amostral por método de captura", to: "/servicos" },
                { label: "Cobertura de Imóveis avaliados segundo as caracterísitcas ambientais", to: "/contato" },
                { label: "Cobertura de Visitas para Orientação em Imóveis com Score ≥ 6", to: "/contato" },
                { label: "Taxa de Imóveis de Risco por ano na área prioritária", to: "/contato" },
            ],
        };
    },
    methods: {
        geraIndic() {
            const opcoesIndic = [
                {
                    id: 1,
                    titulo: 'Positividade canina no município por ciclo ou por ano',
                    quocient: 'Nº de casos de LVC no município por ciclo ou por ano x 100',
                    divisor: 'Nº de cães examinados no município por ciclo ou por ano',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 2,
                    titulo: 'Coeficiente de prevalência da área prioritária ou do município',
                    quocient: 'Nº de casos novos e antigos de LVC na ATL ou no município por ciclo ou por ano x 100',
                    divisor: 'Pop. canina examinada na ATL ou por município por ciclo ou por ano',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 3,
                    titulo: 'Coeficiente de incidência da área prioritária ou do município',
                    quocient: 'Nº de casos novos de LVC na área prioritária por ciclo x 100',
                    divisor: 'Pop. canina examinada na área prioritária por ciclo ou por ano',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 4,
                    titulo: 'Proporção de cães eutanasiados no município',
                    quocient: 'Nº de  cães soropositivos em dois testes para LVC eutanasiados por município por ciclo  X 100',
                    divisor: 'Nº cães examinados soropositivos em dois testes para LVC na ATL ou no município por ciclo',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 5,
                    titulo: 'Percentual de cães eutanasiados na área prioritária por ciclo',
                    quocient: 'Nº de  cães soropositivos em dois testes para LVC eutanasiados na área prioritária X 100',
                    divisor: 'Nº cães soropositivos em dois testes para LVC na na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 6,
                    titulo: 'Percentual de cães com recusa de eutanasia na área prioritária por ciclo',
                    quocient: 'Nº de  cães soropoitivos em dois testes para LVC com recusa de eutanasia na área prioritária  X 100',
                    divisor: 'Nº cães soropoitivos em dois testes para LVC na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 7,
                    titulo: 'Percentual de cães com recusa de colocação de coleira na área prioritária por ciclo',
                    quocient: 'Nº de cães com recusa de colocação de coleira na área prioritária X 100',
                    divisor: 'Nº cães existentes na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 8,
                    titulo: 'Percentual de cães soropositivos com coleira na área prioritária por ciclo',
                    quocient: 'Nº de cães soropositivos na área prioritária com coleira  X 100',
                    divisor: 'Nº cães soropoitivos na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 9,
                    titulo: 'Percentual de cães em tratamento para LVC na área prioritária por ciclo',
                    quocient: 'Nº de cães em tratamento para LVC na área prioritária X 100',
                    divisor: 'Nº cães soropositivos na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 10,
                    titulo: 'Percentual de cães vacinados para LVC na área prioritária no ciclo',
                    quocient: 'Nº de cães vacinados para LVC na área prioritária X 100',
                    divisor: 'Nº cães soropositivos na área prioritária',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 20,
                    titulo: 'Densidade de <em>Lutzomyia longipalpis</em> em AIL por mes, ano ou período de avaliação',
                    quocient: 'Nº de exemplares capturados em armadilhas',
                    divisor: 'Nº armadilhas expostas',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 21,
                    titulo: 'Densidade de <em>Lutzomyia longipalpis</em> em captura manual por mes, ano ou período de avaliação',
                    quocient: 'Nº de exemplares capturados manualmente',
                    divisor: 'Nº de capturas executadas',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 22,
                    titulo: 'Esforço amostral por método de captura',
                    quocient: 'Nº de exemplares capturados no método',
                    divisor: 'Total de horas pesquisadas pelo método',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 23,
                    titulo: 'Cobertura de Imóveis avaliados segundo as caracterísitcas ambientais',
                    quocient: 'Nº de  imóveis avaliados na área prioritária por ciclo X 100',
                    divisor: 'Total de imóveis existentes na área prioritária por ciclo',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 24,
                    titulo: 'Cobertura de Visitas para Orientação em Imóveis com Score ≥ 6',
                    quocient: 'Nº de  imóveis orientados com score ≥ 6 na área prioritária por ciclo X 100',
                    divisor: 'Total de imóveis com score ≥ 6 na área prioritária por ciclo',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
                {
                    id: 25,
                    titulo: 'Taxa de Imóveis de Risco por ano na área prioritária',
                    quocient: 'Nº de  imóveis  com score ≥ 6 na área prioritária por ciclo X 100',
                    divisor: 'Total de imóveis avaliados na área prioritária por ciclo',
                    numerator: 0,
                    denominator: 0,
                    indic: 0
                },
            ];

            return opcoesIndic.find(item => item.id === this.tipo_indic);
        },
        processar() {
            var filt = JSON.stringify(this.filter);
            localStorage.setItem('filterArthoIndic', filt);//JSON.stringify(this.filter));

            this.isLoading = true;

            this.indics = [];


            reportService.getIndic(this.tipo_indic, filt)
                .then((response) => {
                    var data = response.data;
                    const dataTable = data.data;
                    this.strFiltro = data.filter;

                    if (this.tipo_indic == 22) {
                        dataTable.forEach(item => {
                            this.indic = this.geraIndic();
                            this.indic.numerator = item.numerador;
                            this.indic.denominator = Number(item.denominador).toFixed(2);
                            this.indic.indic = item.denominador > 0 ? (item.numerador / item.denominador).toFixed(2) + ' Ex/h' : 'N/D';
                            this.indic.titulo += ` (${item.metodo})`;

                            this.indics.push(this.indic);
                        });
                    } else {
                        this.indic = this.geraIndic();
                        this.indic.numerator = dataTable.numerador;
                        this.indic.denominator = dataTable.denominador;
                        if (this.tipo_indic == '20') {
                            this.indic.indic = dataTable.denominador > 0 ? (dataTable.numerador / dataTable.denominador).toFixed(2) + ' Ex/AIL' : 'N/D';
                        } else if (this.tipo_indic == '21') {
                            this.indic.indic = dataTable.denominador > 0 ? (dataTable.numerador / dataTable.denominador).toFixed(2) + ' Ex/Capt' : 'N/D';
                        } else {
                            this.indic.indic = dataTable.denominador > 0 ? (dataTable.numerador * 100 / dataTable.denominador).toFixed(2) + ' %' : 'N/D';
                        }
                        this.indics.push(this.indic);
                    }

                    this.hasData = true;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));

        },
    },
    components: {
        CmbMunicipio,
        Loader,
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

        var obj = localStorage.getItem('filterArthoIndic');

        if (obj) {
            this.filter = JSON.parse(obj);
        }
    }
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

.box-com-borda {
    border: 4px double #ff3860;
    /* espessura + tipo double + cor */
    padding: 5rem;
    background-color: aliceblue;
}

.no-wrap {
    white-space: nowrap;
}

.container {
    font-size: 1rem;
    font-family: Helvetica;
    min-width: auto;
}

.container.is-wide {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.long-division {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*font-size: 0.9rem;*/
    line-height: 1.2;
}

.long-division .quotient {
    white-space: nowrap;
}

.quotient {
    border-bottom: 1px solid #000;
    padding: 0 4px 2px 4px;
    text-align: center;
}

.dividend {
    padding-top: 2px;
    text-align: center;
    /*font-size: 0.85rem;*/
}

.quotientn {
    padding: 0 4px 2px 4px;
    text-align: center;
}

.dividendn {
    padding-top: 2px;
    text-align: center;
    border-top: 1px solid #000;
    /*font-size: 0.85rem;*/
}
</style>