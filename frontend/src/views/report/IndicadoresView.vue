<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Loader v-if="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">{{ title }}</p>
                    </header>
                    <div class="card-content">
                        <span class="filter">{{ strFiltro }}</span>
                        
                        <!--
                        {{ dataTable }}
                        {{ indic }}
                        <section>
                            <table class="table is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Animal</th>
                                        <th>Exame</th>
                                        <th>Resultado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="2">Cão 1</td>
                                        <td>Exame 1</td>
                                        <td>Positivo</td>
                                    </tr>
                                    <tr>
                                        <td>Exame 2</td>
                                        <td>Negativo</td>
                                    </tr>
                                    <tr>
                                        <td>Cão 2</td>
                                        <td>Exame 1</td>
                                        <td>Negativo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        <section class="section">
                            <div class="container">
                                <div class="tile is-ancestor">
                              
                                    <div class="tile is-vertical is-4">
                                        <div class="tile">
                                            <div class="tile is-parent">
                                                <article class="tile is-child box has-text-centered">
                                                    <p class="title">Uma Coisa x 100</p>
                                                </article>
                                            </div>
                                        </div>
                                        <div class="tile">
                                            <div class="tile is-parent">
                                                <article class="tile is-child box has-text-centered">
                                                    <p class="title">Outra Coisa</p>
                                                </article>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div class="tile is-parent is-1">
                                        <article class="tile is-child box has-text-centered">
                                            <p class="title">=</p>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </section>-->

                        <section>
                            <div class="section">
                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">5) Proporção de cães eutanasiados no município =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães soropositivos em dois testes para LVC eutanasiados por município  por ciclo  X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães examinados soropositivos em dois testes para LVC na ATL ou no município por ciclo
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
                                                <div class="quotient">{{ dataTable.twice_eutanasia }}</div>
                                                <div class="dividend">{{ dataTable.twice_pos }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_5 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>

                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">6) Percentual de cães eutanasiados na área prioritária por ciclo =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães soropositivos em dois testes para LVC eutanasiados na área prioritária X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães soropositivos em dois testes para LVC na na área prioritária
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
                                                <div class="quotient">{{ dataTable.twice_eutanasia }}</div>
                                                <div class="dividend">{{ dataTable.twice_pos }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_6 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>

                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">7) Percentual de cães com recusa de eutanásia na área
                                                prioritária por ciclo =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães soropositivos em dois testes para LVC com recusa de
                                                    eutanásia na área prioritária X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães soropositivos em dois testes para LVC na área prioritária
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
                                                <div class="quotient">{{ dataTable.twice_recusa }}</div>
                                                <div class="dividend">{{ dataTable.twice_pos }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_7 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>

                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">8) Percentual de cães com recusa de colocação de coleira na área prioritária por ciclo =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães com recusa de colocação de coleira X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães existentes na área prioritária
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
                                                <div class="quotient">{{ dataTable.recusa_coleira }}</div>
                                                <div class="dividend">{{ dataTable.num_caes }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_8 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>

                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">9) Percentual de cães soropositivos com coleira na área prioritária por ciclo =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães soropositivos na área prioritária com coleira X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães soropositivos na área prioritária
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
                                                <div class="quotient">{{ dataTable.encoleirado }}</div>
                                                <div class="dividend">{{ dataTable.soropositivo }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_9 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>

                                <div class="container is-wide">
                                    <div class="columns is-vcentered is-fullwidth">
                                        <!-- Coluna 1: descrição -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">10) Percentual de cães em tratamento para LVC na área prioritária por ciclo =</span>
                                        </div>

                                        <!-- Coluna 2: fórmula dividida -->
                                        <div class="column is-narrow">
                                            <div class="long-division">
                                                <div class="quotient">
                                                    Nº de cães em tratamento para LVC na área prioritária X 100
                                                </div>
                                                <div class="dividend">
                                                    Nº cães soropositivos na área prioritária
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
                                                <div class="quotient">{{ dataTable.tratamento }}</div>
                                                <div class="dividend">{{ dataTable.soropositivo }}</div>
                                            </div>
                                        </div>

                                        <!-- Coluna 5: resultado final -->
                                        <div class="column is-narrow has-text-right is-flex is-align-items-end">
                                            <span class="divisor">=  {{ indic.indic_10 }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="divide">&nbsp;</div>
                            </div>
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

export default {
    name: "Indicadores",
    data() {
        return {
            id: 0,
            filter: {},
            dataTable: [],
            isLoading: false,
            title: 'Indicadores',
            strFiltro: '',
            tableName: 'indicadores',
            indic: {},
        };
    },
    components: {
        Loader,
    },
    mounted() {
        this.isLoading = true;

        reportService.getRelat(this.id, this.filter)
            .then((response) => {
                var data = response.data;
                this.dataTable = data.data[0];
                this.strFiltro = data.filter;

                this.indic.indic_5 = this.dataTable.twice_pos > 0 ? (this.dataTable.twice_eutanasia * 100 / this.dataTable.twice_pos).toFixed(2) + ' %' : 'N/D';
                this.indic.indic_6 = this.dataTable.twice_pos > 0 ? (this.dataTable.twice_eutanasia * 100 / this.dataTable.twice_pos).toFixed(2) + ' %' : 'N/D';
                this.indic.indic_7 = this.dataTable.twice_pos > 0 ? (this.dataTable.twice_recusa * 100 / this.dataTable.twice_pos).toFixed(2) + ' %' : 'N/D';
                this.indic.indic_8 = this.dataTable.num_caes > 0 ? (this.dataTable.recusa_coleira * 100 / this.dataTable.num_caes).toFixed(2) + ' %' : 'N/D';
                this.indic.indic_9 = this.dataTable.soropositivo > 0 ? (this.dataTable.encoleirado * 100 / this.dataTable.soropositivo).toFixed(2) + ' %' : 'N/D';
                this.indic.indic_10 = this.dataTable.soropositivo > 0 ? (this.dataTable.tratamento * 100 / this.dataTable.soropositivo).toFixed(2) + ' %' : 'N/D';

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false));

        //this.createColumns();
    },
    created() {
        this.id = this.$route.params.id;
        this.filter = localStorage.getItem('filterRelArthro');
    },
}
</script>

<style>
.divide {
    min-height: 3rem;
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

/*.divisor {
  font-size: 0.95rem;
}*/
</style>
