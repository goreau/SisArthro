<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Hábito Alimentar</p>
                    </header>
                    <div class="card-content">
                        <div class="tile is-ancestor">
                            <div class="tile is-vertical">
                                <div class="tile">
                                    <div class="tile is-parent is-vertical">
                                        <article class="tile is-child conteudo">
                                            <div class="columns">
                                                <div class="field column is-6">
                                                    <label class="label">CodSis - Município</label>
                                                    <div class="control">
                                                        <CmbMunicipio :id_prop="currentUser.id"
                                                            :sel="alimentar.id_municipio"
                                                            @selMun="alimentar.id_municipio = $event" />
                                                    </div>
                                                </div>
                                                <div class="field column is-6">
                                                    <label class="label">Captura</label>
                                                    <div class="control">
                                                        <div class="select">
                                                            <select v-model="alimentar.id_fk" class="input" :class="{
                                                                'is-danger': v$.alimentar.id_fk.$error,
                                                            }">
                                                                <option value="0">-- Selecione --</option>
                                                                <option v-for="reg in fks" :key="reg.id_captura"
                                                                    :value="reg.id_captura">
                                                                    {{ reg.codigo }}
                                                                </option>
                                                            </select>
                                                            <span class="is-error" v-if="v$.alimentar.id_fk.$error">
                                                                {{
                                                                    v$.alimentar.id_fk.$errors[0].$message
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                        <article class="tile is-child conteudo">
                                            <div class="columns">
                                                <div class="field column is-3">
                                                    <label class="label">Pool</label>
                                                    <div class="control">
                                                        <div class="select">
                                                            <select v-model="alimentar.pool" class="input" :class="{
                                                                'is-danger': v$.alimentar.pool.$error,
                                                            }">
                                                                <option value="0">-- Selecione --</option>
                                                                <option v-for="reg in listPool" :value="reg.pool"
                                                                    :key="reg.pool">
                                                                    {{ reg.pool }}
                                                                </option>
                                                            </select>
                                                            <span class="is-error" v-if="v$.alimentar.pool.$error">
                                                                {{
                                                                    v$.alimentar.pool.$errors[0].$message
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="field column is-3">
                                                    <label class="label">Data Extração</label>
                                                    <div class="control">
                                                        <input type="text" id="dtExtr">
                                                    </div>
                                                    <span class="is-error" v-if="v$.alimentar.dt_extracao.$error">
                                                        {{
                                                            v$.alimentar.dt_extracao.$errors[0].$message
                                                        }}
                                                    </span>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">Placa</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.placa_e" :class="{
                                                                'is-danger': v$.alimentar.placa_e.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.placa_e.$error">
                                                            {{ v$.alimentar.placa_e.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">Posição</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.posicao_e" :class="{
                                                                'is-danger': v$.alimentar.posicao_e.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.posicao_e.$error">
                                                            {{ v$.alimentar.posicao_e.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="field column is-3">
                                                    <p>&nbsp;</p>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">Data PCR</label>
                                                    <div class="control">
                                                        <input type="text" id="dtPcr">
                                                    </div>
                                                    <span class="is-error" v-if="v$.alimentar.dt_pcr.$error">
                                                        {{
                                                            v$.alimentar.dt_pcr.$errors[0].$message
                                                        }}
                                                    </span>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">Placa</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.placa_p" :class="{
                                                                'is-danger': v$.alimentar.placa_p.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.placa_p.$error">
                                                            {{ v$.alimentar.placa_p.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">Posição</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.posicao_p" :class="{
                                                                'is-danger': v$.alimentar.posicao_p.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.posicao_p.$error">
                                                            {{ v$.alimentar.posicao_p.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column is-10 is-offset-1 has-text-centered cabeca">Resultado
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="field column is-3 is-offset-3">
                                                    <label class="label">CITB</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.citb" :class="{
                                                                'is-danger': v$.alimentar.citb.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.citb.$error">
                                                            {{ v$.alimentar.citb.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="field column is-3">
                                                    <label class="label">COI</label>
                                                    <div class="control">
                                                        <input class="input" type="text" placeholder="Nome"
                                                            v-model="alimentar.coi" :class="{
                                                                'is-danger': v$.alimentar.coi.$error,
                                                            }" />
                                                        <span class="is-error" v-if="v$.alimentar.coi.$error">
                                                            {{ v$.alimentar.coi.$errors[0].$message }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                        <article class="tile is-child conteudo">
                                            <div class="columns">
                                                <div class="column is-10 is-offset-1 has-text-centered cabeca">Amostras
                                                    examinadas
                                                </div>
                                            </div>
                                            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataTable"
                                                :columns="columns" :pagination="false" :buttons="['edit', 'delete']"
                                                :has-exports="false" @edit="onEditRow" :calc-height="true"
                                                @delete="onDeleteRow" :persistence-id="$options.name" />
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <footerCard @submit="create" @cancel="null" @aux="results" :cFooter="cFooter" />
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal" @post="postContent" :msg="message">
        <template v-slot:header>
            {{ title }}
        </template>

        <template v-slot:body>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Espécie</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="detalhe.id_especie" class="input" :class="{
                                    'is-danger': v$.detalhe.id_especie.$error,
                                }">
                                    <option value="0">-- Selecione --</option>
                                    <option v-for="reg in listSpp" :value="reg.id" :key="reg.id">
                                        {{ reg.nome }}
                                    </option>
                                </select>
                                <span class="is-error" v-if="v$.detalhe.id_especie.$error">
                                    {{
                                        v$.detalhe.id_especie.$errors[0].$message
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">% Identidade</label>
                        <div class="control">
                            <input id="valor" class="input" type="text" placeholder="Nome"
                                v-model="detalhe.identidade" />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <label class="label">&nbsp;</label>
                    <button id="postVal" type="button" class="button is-primary is-outlined is-fullwidth"
                        @click="insert" aria-label="Incluir">
                        Incluir
                    </button>
                </div>
            </div>
            <div class="columns">
                <div class="column is-10 is-offset-1 has-text-centered cabeca">Resultados
                </div>
            </div>
            <MyTable :loggedUser="{ id: 0, tipo: 0 }" :data="dataDet" :columns="columnsDet" :pagination="false"
                :buttons="['delete']" :has-exports="false" :calc-height="true" @delete="onDeleteDet"
                :persistence-id="$options.name" />
        </template>

        <template v-slot:footer>
            {{ message }}
        </template>
    </Modal>
</template>

<script>
import CmbMunicipio from '@/components/forms/CmbMunicipio.vue';
import FooterCard from '@/components/forms/FooterCard.vue';
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import Message from '@/components/general/Message.vue';
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
} from "../../components/forms/validators.js";
import capturaService from '@/services/captura.service.js';
import alimentarService from '@/services/alimentar.service.js';
import Modal from '@/components/forms/Modal.vue';

export default {
    components: {
        Loader,
        Message,
        CmbMunicipio,
        FooterCard,
        MyTable,
        Modal
    },
    data() {
        return {
            alimentar: {
                id_alimentar: 0,
                id_municipio: 0,
                id_fk: 0,
                pool: '0',
                dt_extracao: '',
                placa_e: '',
                posicao_e: '',
                dt_pcr: '',
                placa_p: '',
                posicao_p: '',
                citb: 0,
                coi: 0,
                fonte: 1,
                id_usuario: 0,
                details: []
            },
            detalhe: {
                id: 0,
                id_alimentar: 0,
                id_especie: 0,
                fant_especie: '',
                identidade: 0
            },
            appCalendars: {},
            master: 0,
            columns: [],
            fks: [],
            listPool: [],
            listSpp: [],
            dataTable: [],
            dataDet: [],
            detalheIdCounter: 0,
            columnsDet: [
                { headerName: 'UID', field: 'id', hide: true },
                { headerName: 'Espécie', field: 'fant_especie' },
                { headerName: 'Identidade', field: 'identidade' }
            ],
            id_municipio: 0,
            v$: useValidate(),
            showMessage: false,
            isLoading: false,
            isModalVisible: false,
            message: '',
            tpAux: 0,
            title: 'Espécies em hábito alimentar',
            cFooter: {
                strSubmit: "Salvar",
                strCancel: "Cancelar",
                strAux: "Resultados",
                aux: true,
                disabled: true,
            },
        }
    },
    validations() {
        return {
            alimentar: {
                dt_extracao: { required$, },
                dt_pcr: { required$, },
                id_municipio: { minValue: combo$(1) },
                id_fk: { required$ },
                pool: {},
                placa_e: {},
                posicao_e: {},
                placa_p: {},
                posicao_p: {},
                citb: {},
                coi: {},
                fonte: 1,
            },
            detalhe: {
                id_especie: { minValue: combo$(1) },
                identidade: { required$, },
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        create() {
            this.v$.alimentar.$validate(); // checks all inputs
            if (!this.v$.alimentar.$error) {
                document.getElementById('login').classList.add('is-loading');

                if (this.alimentar.id_alimentar == 0) {
                    alimentarService.create(this.alimentar).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Hábito alimentar inserido com sucesso!";
                            this.type = "success";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => {
                                this.showMessage = false;
                                this.master = this.alimentar.id_fk;
                                this.getLista();
                            }, 5000);
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .catch((err) => {
                            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => (this.showMessage = false), 3000);
                        })
                        .finally(() => {
                            document.getElementById('login').classList.remove('is-loading');
                        });
                } else {
                    alimentarService.update(this.alimentar).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Hábito alimentar alterado com sucesso!";
                            this.type = "success";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => {
                                this.showMessage = false;
                                this.master = this.alimentar.id_fk;
                                this.getLista();
                            }, 5000);
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .catch((err) => {
                            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Hábito Halimentar";
                            setTimeout(() => (this.showMessage = false), 3000);
                        })
                        .finally(() => {
                            document.getElementById('login').classList.remove('is-loading');
                        });
                }
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Hábito Halimentar";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        results() {
            this.dataDet = this.alimentar.details;
            this.isModalVisible = true;
        },
        closeModal() {
            this.dataDet = [];
            this.isModalVisible = false;
        },
        postContent() {
            this.alimentar.details = this.dataDet;
            this.closeModal();
        },
        insert() {
            this.v$.detalhe.$validate(); // checks all inputs
            if (!this.v$.detalhe.$error) {
                const especieEncontrada = this.listSpp.find(
                    (item) => item.id === this.detalhe.id_especie
                );
                this.detalheIdCounter++;

                // 2. Cria o novo item com a descrição (fant_especie)
                const novoItem = {
                    ...this.detalhe, // Copia id_especie e identidade
                    id: this.detalheIdCounter.toString(),
                    fant_especie: especieEncontrada ? especieEncontrada.nome : 'Não encontrado'
                };
                // 2. Adiciona ao array
                const listaAtualizada = [...this.dataDet, novoItem];


                this.dataDet = []; // Limpa temporariamente
                this.$nextTick(() => {
                    this.dataDet = listaAtualizada; // Reaplica com nova referência
                });

                // 4. Limpa o detalhe para a próxima inclusão
                this.detalhe = { id_especie: 0, identidade: 0 };
                this.v$.detalhe.$reset();
            }
        },
        onDeleteDet(id) {
            const listaAtualizada = this.dataDet.filter(item => item.id !== id);

            this.dataDet = []; // Limpa temporariamente
            this.$nextTick(() => {
                this.dataDet = listaAtualizada; // Reaplica com nova referência
            });
        },
        onEditRow(id) {
            alimentarService.getAlimentar(id)
                .then(async (response) => {
                    let data = response.data;
                    this.alimentar.id_municipio = data.id_municipio;
                    this.alimentar.id_fk = data.id_fk;
                    this.alimentar.pool = data.pool;
                    this.alimentar.dt_extracao = data.dt_extracao;
                    this.alimentar.placa_e = data.placa_e;
                    this.alimentar.posicao_e = data.posicao_e;
                    this.alimentar.dt_pcr = data.dt_pcr;
                    this.alimentar.placa_p = data.placa_p;
                    this.alimentar.posicao_p = data.posicao_p;
                    this.alimentar.citb = data.citb;
                    this.alimentar.coi = data.coi;
                    this.alimentar.id_alimentar = data.id_alimentar;
                    this.alimentar.details = data.details;

                    if (this.appCalendars['dtExtr']) {
                        let dt = moment(String(data.dt_extracao)).format('DD/MM/YYYY');
                        this.appCalendars['dtExtr'].value(dt);
                    }

                    if (this.appCalendars['dtPcr']) {
                        let dt = moment(String(data.dt_pcr)).format('DD/MM/YYYY');
                        this.appCalendars['dtPcr'].value(dt);
                    }

                    this.cFooter.disabled = false;
                })
                .catch((err) => {

                });
        },
        async onDeleteRow(id) {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir esse registro e todas as informações associadas a ele?',
                okButton: 'Confirmar',
            })
            if (ok) {
                alimentarService.delete(id)
                    .then(() => {
                        this.delId = id
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Hábito Alimentar";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
            }
        },
        getPools() {
            capturaService
                .getPools(this.alimentar.id_fk)
                .then((res) => {
                    this.listPool = res.data;
                })
                .catch((err) => {
                    this.listPool = [];
                });
        },
        applyDataMask(field) {
            var mask = field.dataset.mask.split('');

            // For now, this just strips everything that's not a number
            function stripMask(maskedData) {
                function isDigit(char) {
                    return /\d/.test(char);
                }
                return maskedData.split('').filter(isDigit);
            }

            // Replace `_` characters with characters from `data`
            function applyMask(data) {
                return mask.map(function (char) {
                    if (char != '_') return char;
                    if (data.length == 0) return char;
                    return data.shift();
                }).join('')
            }

            function reapplyMask(data) {
                return applyMask(stripMask(data));
            }

            function changed() {
                var oldStart = field.selectionStart;
                var oldEnd = field.selectionEnd;

                field.value = reapplyMask(field.value);

                field.selectionStart = oldStart;
                field.selectionEnd = oldEnd;
            }

            field.addEventListener('click', changed)
            field.addEventListener('keyup', changed)
        },
        startCalendar() {
            const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                showHeader: false,
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };

            var calini = bulmaCalendar.attach('#dtExtr', options);
            this.appCalendars['dtExtr'] = calini[0];

            const element = document.querySelector('#dtExtr');

            const input = document.querySelector('.datetimepicker-dummy-input');
            input.removeAttribute('readonly');
            input.setAttribute('value', "__/__/____");
            input.setAttribute('data-mask', "__/__/____");
            this.applyDataMask(input);

            input.addEventListener('blur', () => {
                this.alimentar.dt_extracao = moment(input.value).format('YYYY-MM-DD');
            })

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.alimentar.dt_extracao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }

            var calpcr = bulmaCalendar.attach('#dtPcr', options);

            this.appCalendars['dtPcr'] = calpcr[0];

            const element2 = document.querySelector('#dtPcr');

            input.addEventListener('blur', () => {
                this.alimentar.dt_pcr = moment(input.value).format('YYYY-MM-DD');
            })

            if (element2) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element2.bulmaCalendar.on('select', datepicker => {
                    this.alimentar.dt_pcr = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        },
        getLista() {
            alimentarService
                .getLista(this.master)
                .then((res) => {
                    this.dataTable = res.data;
                })
                .catch((err) => {
                    this.dataTable = [];
                });
        },
        getCapturas() {
            capturaService
                .getCombo(this.alimentar.id_municipio, false)
                .then((res) => {
                    this.fks = res.data;
                })
                .catch((err) => {
                    this.fks = [];
                });
        },
        getSpp() {
            alimentarService.getSpp(2)
                .then((res) => {
                    this.listSpp = res.data;
                })
                .catch((err) => {
                    this.fks = [];
                });
        }
    },
    watch: {
        "alimentar.id_municipio"(value) {
            this.getCapturas();
        },
        "alimentar.id_fk"(value) {
            this.getPools();
        },
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.alimentar.id_usuario = cUser.id;
        }

        this.startCalendar();

        this.columns = [
            { headerName: "ID", field: "id", hide: true },
            { headerName: "Pool", field: "pool" },
            { headerName: "Extração", field: "dt_extracao" },
            { headerName: "PCR", field: "dt_pcr" },
        ]

        this.getSpp();
    },
    created() {
        this.master = this.$route.params.id;
        if (this.master > 0) {
            this.getLista();
        }
    },
}
</script>

<style scoped>
.conteudo {
    border: 1px solid #aaa;
    border-radius: 4px;
    position: relative;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}

.cabeca {
    /*padding: 0 !important;*/
    border-top: 1px solid;
    font-weight: bold;
}

.modale {
    width: 50rem !important;
}
</style>