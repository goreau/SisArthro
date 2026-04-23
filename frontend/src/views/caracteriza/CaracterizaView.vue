<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Caracterização do Imóvel</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns has-text-centered">
                                <div class="field column is-2">
                                    <label class="label">Ciclo</label>
                                    <div class="control has-icons">
                                        <input type="number" min="1" class="input" name="" id=""
                                            v-model="caracteriza.ciclo">
                                        <span class="is-error" v-if="v$.caracteriza.ciclo.$error">
                                            {{ v$.caracteriza.ciclo.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-6">
                                    <label class="label">CodLoc - Localidade</label>
                                    <div class="control">
                                        <CmbLocalidade :id_mun="id_municipio" :sel="caracteriza.cod_loc"
                                            @selLoc="caracteriza.cod_loc = $event" />
                                    </div>
                                </div>
                                <div class="field column is-1"><label class="label">OU</label></div>
                                <div class="field column is-3">
                                    <label class="label">ATL</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.atl">
                                    </div>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-3">
                                    <label class="label">Situação do Imóvel</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="7" @selValue="caracteriza.situacao = $event"
                                            :sel="caracteriza.situacao"
                                            :errclass="{ 'is-danger': v$.caracteriza.situacao.$error }" />
                                        <span class="is-error" v-if="v$.caracteriza.situacao.$error">
                                            {{ v$.caracteriza.situacao.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Tipo do Imóvel</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="8" @selValue="caracteriza.tipo_imovel = $event"
                                            :sel="caracteriza.tipo_imovel"
                                            :errclass="{ 'is-danger': v$.caracteriza.tipo_imovel.$error }" />
                                        <span class="is-error" v-if="v$.caracteriza.tipo_imovel.$error">
                                            {{ v$.caracteriza.tipo_imovel.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="column is-2">
                                    <label class="label">Vegetação</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="vegetacao" type="checkbox"
                                            name="vegetacao" true-value="1" v-model="caracteriza.vegetacao">
                                        <label for="vegetacao"></label>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Mat. Orgânica</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="mat_organica" type="checkbox"
                                            name="mat_organica" true-value="1" v-model="caracteriza.mat_organica">
                                    </div>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-1 is-offset-1">
                                    <label class="label">Galinha</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="galinha" type="checkbox"
                                            name="galinha" true-value="1" v-model="caracteriza.galinha">
                                        <label for="galinha"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cão</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="cao" type="checkbox" name="cao"
                                            true-value="1" v-model="caracteriza.cao">
                                        <label for="cao"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Porco</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="porco" type="checkbox"
                                            name="porco" true-value="1" v-model="caracteriza.porco">
                                        <label for="porco"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cavalo</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="cavalo" type="checkbox"
                                            name="cavalo" true-value="1" v-model="caracteriza.cavalo">
                                        <label for="cavalo"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Coelho</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="coelho" type="checkbox"
                                            name="coelho" true-value="1" v-model="caracteriza.coelho">
                                        <label for="coelho"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Outros</label>
                                    <div class="field checkbox">
                                        <input class="checkmark is-large is-info" id="outros" type="checkbox"
                                            name="outros" true-value="1" v-model="caracteriza.outros">
                                        <label for="outros"></label>
                                    </div>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Descrever</label>
                                    <div class="control has-icons">
                                        <input type="text" name="" class="input" id="" placeholder="Descrever"
                                            v-model="caracteriza.ot_especifica"
                                            :class="{ 'is-danger': v$.caracteriza.ot_especifica.$error }">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.ot_especifica.$error">
                                        {{ v$.caracteriza.ot_especifica.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-4">
                                    <label class="label">Nº Cães</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.num_cao">
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Nº Cães Positivos</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id=""
                                            v-model="caracteriza.num_cao_pos">
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Ano Detecção</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="ano_identifica" id="ano_identifica"
                                            v-model="caracteriza.ano_identifica">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.ano_identifica.$error">
                                        {{ v$.caracteriza.ano_identifica.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3 is-offset-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input ref="myDateInput" type="text" id="dtCaract">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.dt_caracterizacao.$error">
                                        {{ v$.caracteriza.dt_caracterizacao.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Responsável</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.responsavel"
                                            :class="{ 'is-danger': v$.caracteriza.responsavel.$error }">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.responsavel.$error">
                                        {{ v$.caracteriza.responsavel.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="back" :cFooter="cFooter" />
                    </footer>
                    <hr>
                    <div class="card-content">
                        <MyTable :loggedUser="{ id: id_user, tipo: tpUser }" :data="dataTable" :columns="columns"
                            :pagination="false" :buttons="['edit', 'delete']" :has-exports="false" @edit="onEditRow"
                            :calcHeight="true" @delete="onDeleteRow" :deletedId="delId" />
                    </div>
                </div>

            </div>
        </div>
        <confirm-dialog ref="confirmDialog"></confirm-dialog>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import caracterizaService from "@/services/caracteriza.service";
import codendService from '@/services/codend.service';
import MyTable from "@/components/forms/MyTable.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
import useValidate from "@vuelidate/core";
import {
    maxValue$,
    minValue$,
    combo$,
    integer$,
    maxLength$,
    minLength$,
    requiredIf$,
    required$,
} from "../../components/forms/validators.js";
import ConfirmDialog from "@/components/forms/ConfirmDialog.vue";


export default {
    data() {
        return {
            dataTable: [],
            columns: [],
            id_municipio: 0,
            caracteriza: {
                ciclo: '0',
                id_caracterizacao: 0,
                id_codend: 0,
                situacao: 0,
                tipo_imovel: 0,
                vegetacao: 0,
                mat_organica: 0,
                galinha: 0,
                cao: 0,
                porco: 0,
                cavalo: 0,
                coelho: 0,
                outros: 0,
                ot_especifica: '',
                num_cao: 0,
                num_cao_pos: 0,
                ano_identifica: 0,
                dt_caracterizacao: '',
                responsavel: '',
                id_usuario: 0,
                cod_loc: 0,
                atl: '',
            },
            mytpimovel: 0,
            tableName: 'caracterizaLst',
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: 'Voltar',
                aux: true
            },
            delId: null,
            tpUser: 0,
            id_user: 0,
        };
    },
    validations() {
        var valid = {
            caracteriza: {
                ot_especifica: {
                    maxLength: maxLength$(100),
                    requiredIf: requiredIf$(this.caracteriza.outros == 1),
                },
                responsavel: {
                    maxLength: maxLength$(100)
                },
                situacao: {
                    minValue: combo$(1)
                },
                tipo_imovel: {
                    minValue: combo$(1)
                },
                dt_caracterizacao: { required$, },
                ciclo: { required$, minValue: 1, integer$ },
                ano_identifica: {
                    requiredIf: requiredIf$(this.caracteriza.num_cao_pos > 0),
                }
            },
        };
        /*   if (this.caracteriza.num_cao_pos > 0){
               valid['this.caracteriza.ano_identifica']={
                   required$,
                   minValue: minValue$(2000),
                   maxValue: maxValue$(new Date().getFullYear()),
                   maxLength: maxLength$(4),
                   minLength: minLength$(4)
               };
           };*/
        return valid;
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    components: {
        Message,
        Loader,
        footerCard,
        CmbAuxiliares,
        CmbLocalidade,
        ConfirmDialog,
        MyTable,
    },
    methods: {
        onEditRow(id) {
            this.loadData(id)
            //  this.$router.push(`/editCaracteriza/${id}`);
        },
        async onDeleteRow(id) {
            const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa caracterização?',
                okButton: 'Confirmar',
            })
            if (ok) {
                caracterizaService.delete(id)
                    .then(
                        (response) => {
                            this.delId = id
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Unidade";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
            }
        },
        loadData(id) {
            this.isLoading = true;

            caracterizaService.getCaracteriza(id).then(
                async (response) => {
                    let data = response.data[0];
                    this.caracteriza.id_caracterizacao = id
                    this.caracteriza.id_codend = data.id_codend;
                    this.caracteriza.ciclo = data.ciclo;
                    this.caracteriza.situacao = data.situacao;
                    this.caracteriza.tipo_imovel = data.tipo_imovel;
                    this.caracteriza.vegetacao = data.vegetacao;
                    this.caracteriza.mat_organica = data.mat_organica;
                    this.caracteriza.galinha = data.galinha;
                    this.caracteriza.cao = data.cao;
                    this.caracteriza.porco = data.porco;
                    this.caracteriza.cavalo = data.cavalo;
                    this.caracteriza.coelho = data.coelho;
                    this.caracteriza.outros = data.outros;
                    this.caracteriza.ot_especifica = data.ot_especifica;
                    this.caracteriza.num_cao = data.num_cao;
                    this.caracteriza.num_cao_pos = data.num_cao_pos;
                    this.caracteriza.ano_identifica = data.ano_identifica;
                    this.caracteriza.dt_caracterizacao = data.dt_caracterizacao;
                    this.caracteriza.responsavel = data.responsavel;
                    this.caracteriza.cod_loc = data.cod_loc;
                    this.caracteriza.atl = data.atl;
                    this.setCalendarValue(data.dt_caracterizacao);
                },
                (error) => {
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.response.data ||
                        error.message ||
                        error.toString();
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Caracterização";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );



            this.isLoading = false;

        },
        back() {
            this.$router.push(`/codends/${this.caracteriza.id_codend}`);
        },
        setDate($event) {
            if ($event) {
                this.caracteriza.dt_caracterizacao = moment(String($event)).format('YYYY-MM-DD');
            }
        },
        restart() {
            this.caracteriza.ciclo = parseInt(this.caracteriza.ciclo) + 1;
            this.caracteriza.id_caracterizacao = 0;
            //this.caracteriza.id_codend = 0;
            this.caracteriza.cod_loc = 0;
            this.caracteriza.situacao = 0;
            this.caracteriza.tipo_imovel = 0;
            this.caracteriza.vegetacao = 0;
            this.caracteriza.mat_organica = 0;
            this.caracteriza.galinha = 0;
            this.caracteriza.cao = 0;
            this.caracteriza.porco = 0;
            this.caracteriza.cavalo = 0;
            this.caracteriza.coelho = 0;
            this.caracteriza.outros = 0;
            this.caracteriza.ot_especifica = '';
            this.caracteriza.num_cao = 0;
            this.caracteriza.num_cao_pos = 0;
            this.caracteriza.ano_identifica = 0;

            this.v$.$reset();
        },
        setCalendarValue(novaData) {
            const element = this.$refs.myDateInput;
            if (element && element.bulmaCalendar) {
                // O método oficial para setar valor é .value()
                element.bulmaCalendar.value(novaData);
            } else {
                // Se por algum motivo não existir (ex: página recarregou), cria e seta
                this.$nextTick(() => {
                    const inst = this.initCalendar();
                    if (inst) inst.value(novaData);
                });
            }
        },
        initCalendar() {
            if (this.calendarInstance) return;

            const element = this.$refs.myDateInput;
            if (!element) return;

            const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                startDate: this.caracteriza.dt_caracterizacao,
                showHeader: false,
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };

            const calendars = bulmaCalendar.attach(element, options);

            if (calendars.length > 0) {
                this.calendarInstance = calendars[0];

                this.calendarInstance.on('select', (datepicker) => {
                    this.caracteriza.dt_caracterizacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });

                this.$nextTick(() => {
                    // Procuramos o input visual que o Bulma criou
                    // Ele sempre tem a classe .datetimepicker-dummy-input
                    const dummyInput = element.parentNode.querySelector('.datetimepicker-dummy-input');

                    if (dummyInput) {
                        dummyInput.removeAttribute('readonly');
                        // Forçamos ele a não ser readonly nem no clique
                        dummyInput.onfocus = () => dummyInput.removeAttribute('readonly');
                    }
                });

                return this.calendarInstance;

                // Sincroniza o calendário com o seu Vue quando o usuário escolhe uma data

            }
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
        getDateFormat(dateString) {
            // Define os padrões para os formatos de data
            const formats = {
                "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$/,
                "DD/MM/YYYY": /^\d{2}\/\d{2}\/\d{4}$/,
                "MM-DD-YYYY": /^\d{2}-\d{2}-\d{4}$/
            };

            // Verifica qual padrão a string de data corresponde
            for (const format in formats) {
                if (formats[format].test(dateString)) {
                    return format;
                }
            }

            return "Formato desconhecido";
        },
        loadTable() {
            this.isLoading = true;
            caracterizaService.getCaracterizas(this.caracteriza.id_codend)
                .then((response) => {
                    this.dataTable = response.data;
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));

            this.restart()
        },
        create() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {

                let preserv = { resp: this.caracteriza.responsavel, date: this.caracteriza.dt_caracterizacao };
                localStorage.setItem('preserv', JSON.stringify(preserv));

                document.getElementById('login').classList.add('is-loading');

                if (this.caracteriza.id_caracterizacao == 0) {

                    caracterizaService.create(this.caracteriza).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Informações cadastradas.";
                            this.type = "success";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                            this.loadTable();
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .catch((err) => {
                            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                        })
                        .finally(() => {
                            document.getElementById('login').classList.remove('is-loading');
                        });
                } else {
                    caracterizaService.update(this.caracteriza).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Informações alteradas.";
                            this.type = "success";
                            this.caption = "Caracterização";
                            setTimeout(() => {
                                this.showMessage = false;
                                this.loadTable();
                            }, 3000);

                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .catch((err) => {
                            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Caracterização";
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
                this.caption = "Caracterização";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.caracteriza.id_usuario = cUser.id;
            this.id_user = this.currentUser.id;
            this.tpUser = this.currentUser.role;
        }

        var obj = localStorage.getItem('preserv');
        if (obj) {
            let preserv = JSON.parse(obj);

            let format = this.getDateFormat(preserv.date);
            if (format == 'YYYY-MM-DD') {
                this.caracteriza.dt_caracterizacao = preserv.date == '' ? '' : moment(String(preserv.date)).format('DD/MM/YYYY');
            } else {
                let partes = preserv.date.split('/');
                preserv.date = partes.reverse().join('-');
                this.caracteriza.dt_caracterizacao = moment(String(preserv.date)).format('DD/MM/YYYY');
            }

            this.caracteriza.responsavel = preserv.resp;
        }


        this.loadTable();


        this.columns = [
            { headerName: "CodEnd", field: "codigo" },
            { headerName: "Ciclo", field: "ciclo" },
            { headerName: "Data", field: "dt_caracterizacao" },
            { headerName: "Situação", field: "situacao" },
            { headerName: "Tipo Imóvel", field: "tipo_imovel" },
            { headerName: "Soma", field: "soma" },
        ];
        this.initCalendar()

        /*    const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                startDate: this.caracteriza.dt_caracterizacao,
                showHeader: false,
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };
     
            var calini = bulmaCalendar.attach('#dtCaract', options);
     
            const element = document.querySelector('#dtCaract');
     
            const input = document.querySelector('.datetimepicker-dummy-input');
            input.removeAttribute('readonly');
            input.setAttribute('value', "__/__/____");
            input.setAttribute('data-mask', "__/__/____");
            this.applyDataMask(input);
     
            input.addEventListener('blur', () => {
                this.caracteriza.dt_caracterizacao = moment(input.value).format('YYYY-MM-DD');
            });
     
            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.caracteriza.dt_caracterizacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }*/
    },
    created() {
        this.caracteriza.id_codend = this.$route.params.master;
        this.caracteriza.id_caracterizacao = this.$route.params.id;

        codendService.getCodend(this.caracteriza.id_codend).then(
            async (response) => {
                let data = response.data[0];
                this.id_municipio = data.id_municipio;
            },
        );
    },
    watch: {
        mytpimovel(value) {
            this.caracteriza.tipo_imovel = value;
            //document.getElementById("vegetacao").focus();
            const checkbox = this.$refs.vegetacao;
            if (checkbox) {
                checkbox.focus(); // Tenta focar o checkbox
                console.warn("Checkbox focado!");
            } else {
                console.warn("Checkbox não encontrado!");
            }
            // this.$refs.vegetacao.$el.focus();

        },
        'caracteriza.cod_loc'(value) {
            if (value > 0) {
                this.caracteriza.atl = '';
            }
        },
        'caracteriza.atl'(value) {
            if (value != '') {
                this.caracteriza.cod_loc = 0;
            }
        }
    }
};
</script>

<style scoped>
.checkmark {
    width: 2rem;
    height: 2rem;
    -webkit-appearance: none;
    /* Remove o estilo padrão */
    appearance: none;
    /* Remove o estilo padrão */
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
}

.checkmark:checked::after {
    content: '✔';
    color: #00d1b2;
    font-size: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
