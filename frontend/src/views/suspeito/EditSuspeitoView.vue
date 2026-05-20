<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Notificação de Artrópodes</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Número</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Preenc. Automático"
                                            v-model="suspeito.codigo" readonly disabled />
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">1 - Notificante
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4 is-offset-3">
                                    <label class="label">Unidade</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="id_notifica" value="1"
                                                v-model="suspeito.id_notifica" :disabled="currentUser.role == 3" />
                                            1 - IP
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="id_notifica" value="2"
                                                v-model="suspeito.id_notifica" />
                                            2 - Município
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="id_notifica" value="3"
                                                v-model="suspeito.id_notifica" />
                                            3 - Outra Instituição
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.id_notifica.$error">
                                        {{ v$.suspeito.id_notifica.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">&nbsp;</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="suspeito.notif_espec"
                                            :disabled="suspeito.id_notifica < 3"
                                            :class="{ 'is-danger': v$.suspeito.notif_espec.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.notif_espec.$error">
                                            {{ v$.suspeito.notif_espec.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">2 - Morador ou
                                    responsável
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Nome do responsável pelo encontro"
                                            v-model="suspeito.notificante" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.notificante.$error">
                                        {{ v$.suspeito.notificante.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">CodSis - Município</label>
                                    <div class="control">
                                        <CmbMunicipio :id_prop="currentUser.id" :sel="suspeito.id_municipio"
                                            @selMun="suspeito.id_municipio = $event"
                                            :errclass="{ 'is-danger': v$.suspeito.id_municipio.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.id_municipio.$error">
                                            {{ v$.suspeito.id_municipio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Bairro</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="suspeito.bairro" />
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-5">
                                    <label class="label">Endereço</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Endereço (logradouro e número)"
                                            v-model="suspeito.endereco" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.endereco.$error">
                                        {{ v$.suspeito.endereco.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Telefone</label>
                                    <div class="control">
                                        <input class="input" type="text"
                                            placeholder="Telefone do responsável pelo encontro"
                                            v-model="suspeito.telefone" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.telefone.$error">
                                        {{ v$.suspeito.telefone.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Referência</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Ponto de referência"
                                            v-model="suspeito.referencia" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.referencia.$error">
                                        {{ v$.suspeito.referencia.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">3 - Local de Encontro
                                </div>
                            </div>

                            <!---->
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Ambiente</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="1" :sel="suspeito.id_ambiente"
                                            @selValue="suspeito.id_ambiente = $event"
                                            :errclass="{ 'is-danger': v$.suspeito.id_ambiente.$error }" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.id_ambiente.$error">
                                        {{ v$.suspeito.id_ambiente.$errors[0].$message }}
                                    </span>
                                </div>

                                <div class="field column is-3">
                                    <label class="label">Localidade/ATL</label>
                                    <div class="control">
                                        <CmbLocalidade :id_mun="suspeito.id_municipio" :sel="suspeito.id_localidade"
                                            @selLoc="suspeito.id_localidade = $event" />
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-8">
                                    <label class="label">Local de Encontro</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Descrever"
                                            v-model="suspeito.encontro" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.encontro.$error">
                                        {{ v$.suspeito.encontro.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtSusp">
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.dt_encontro.$error">
                                        {{ v$.suspeito.dt_encontro.$errors[0].$message }}
                                    </span>
                                </div>

                                <div class="field column is-2">
                                    <label class="label">Quantidade</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Ponto de referência"
                                            v-model="suspeito.qt_insetos" />
                                    </div>
                                    <span class="is-error" v-if="v$.suspeito.qt_insetos.$error">
                                        {{ v$.suspeito.qt_insetos.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">4 - Posto de Coleta
                                </div>
                            </div>


                            <!---->
                            <div class="columns">
                                <div class="field column is-5">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Nome da localidade"
                                            v-model="suspeito.responsavel"
                                            :class="{ 'is-danger': v$.suspeito.responsavel.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.responsavel.$error">
                                            {{ v$.suspeito.responsavel.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Local</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="" v-model="suspeito.local"
                                            :class="{ 'is-danger': v$.suspeito.local.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.local.$error">
                                            {{ v$.suspeito.local.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Recebimento</label>
                                    <div class="control">
                                        <div class="control">
                                            <input type="text" id="dtRec">
                                        </div>
                                        <span class="is-error" v-if="v$.suspeito.dt_recebe.$error">
                                            {{ v$.suspeito.dt_recebe.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">5 - Instituto Pasteur
                                </div>
                            </div>
                            <!---->
                            <div class="columns">
                                <div class="field column is-5">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Recebedor no IP"
                                            v-model="suspeito.recebedor"
                                            :class="{ 'is-danger': v$.suspeito.recebedor.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.recebedor.$error">
                                            {{ v$.suspeito.recebedor.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Local</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Setor e Município do recebimento"
                                            v-model="suspeito.setor"
                                            :class="{ 'is-danger': v$.suspeito.setor.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.setor.$error">
                                            {{ v$.suspeito.setor.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Recebimento</label>
                                    <div class="control">
                                        <div class="control" style="z-index: 9000;">
                                            <input type="text" id="dtPasteur">
                                        </div>
                                        <span class="is-error" v-if="v$.suspeito.dt_pasteur.$error">
                                            {{ v$.suspeito.dt_pasteur.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">6 - Resultado
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-5 is-offset-3">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Nome do recebedor no laboratório"
                                            v-model="suspeito.laboratorio"
                                            :class="{ 'is-danger': v$.suspeito.laboratorio.$error }" />
                                        <span class="is-error" v-if="v$.suspeito.laboratorio.$error">
                                            {{ v$.suspeito.laboratorio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Recebimento</label>
                                    <div class="control">
                                        <div class="control">
                                            <input type="text" id="dtLab">
                                        </div>
                                        <span class="is-error" v-if="v$.suspeito.dt_laboratorio.$error">
                                            {{ v$.suspeito.dt_laboratorio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="edit" @cancel="null" @aux="null" :cFooter="cFooter" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
    <br><br>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import suspeitoService from "@/services/suspeito.service";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
    requiredIf$,
    maxLength$,
    minLength$
} from "../../components/forms/validators.js";


export default {
    components: {
        Loader,
        Message,
        CmbAuxiliares,
        CmbMunicipio,
        CmbLocalidade,
        footerCard
    },
    data() {
        return {
            suspeito: {
                codigo: "",
                dt_encontro: "",
                id_notifica: 0,
                notif_espec: '',
                bairro: '',
                id_municipio: 0,
                notificante: "",
                endereco: '',
                telefone: '',
                referencia: '',
                id_ambiente: 0,
                id_localidade: 0,
                qt_insetos: 0,
                encontro: '',
                dt_encontro: "",
                dt_pasteur: "",
                laboratorio: "",
                dt_laboratorio: "",
                recebedor: '',
                local: '',
                setor: '',
                dt_recebe: '',
                id_usuario: 0,
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: '',
                aux: false
            }
        };
    },
    validations() {
        return {
            suspeito: {
                dt_encontro: { required$, },
                dt_recebe: { required$, },
                dt_pasteur: { required$, },
                dt_laboratorio: { required$, },
                id_notifica: { required$, },
                notif_espec: { requiredIf: requiredIf$(this.suspeito.id_notifica == 3), maxLength: maxLength$(30) },
                notificante: { required$, },
                endereco: { required$, maxLength: maxLength$(40) },
                telefone: { maxLength: maxLength$(16) },
                referencia: { maxLength: maxLength$(40) },
                id_municipio: { minValue: combo$(1), },
                id_ambiente: { minValue: combo$(1), },
                id_localidade: { minValue: combo$(1) },
                encontro: { required$, maxLength: maxLength$(30), minLength: minLength$(3) },
                qt_insetos: { required$ },
                tipo_ativ: { requiredIf: requiredIf$(this.suspeito.atividade == 32) },
                recebedor: { required$, maxLength: maxLength$(50) },
                responsavel: { required$, maxLength: maxLength$(40) },
                laboratorio: { required$, maxLength: maxLength$(40) },
                local: { required$, maxLength: maxLength$(50) },
                setor: { required$, maxLength: maxLength$(40) },
            },
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        setDate($event) {
            if ($event) {
                this.suspeito.dt_encontro = moment(String($event)).format('YYYY-MM-DD');
            }
        },
        edit() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');

                suspeitoService.edit(this.suspeito).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Notificação alterada com sucesso!";
                        this.type = "success";
                        this.caption = "Notificação";
                        setTimeout(() => {
                            this.showMessage = false;
                        }, 3000);
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Notificação";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                )
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Notificação";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById('login').classList.remove('is-loading');
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Notificação";
                setTimeout(() => (this.showMessage = false), 3000);
            }
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
                startDate: this.suspeito.dt_encontro,
            };

            bulmaCalendar.attach('#dtSusp', options);
            options.startDate = this.suspeito.dt_recebe;
            bulmaCalendar.attach('#dtRec', options);
            options.startDate = this.suspeito.dt_pasteur;
            bulmaCalendar.attach('#dtPasteur', options);
            options.startDate = this.suspeito.dt_laboratorio;
            bulmaCalendar.attach('#dtLab', options);

            const elementS = document.querySelector('#dtSusp');

            const input = document.querySelector('.datetimepicker-dummy-input');
            input.removeAttribute('readonly');
            input.setAttribute('value', "__/__/____");
            input.setAttribute('data-mask', "__/__/____");
            this.applyDataMask(input);

            input.addEventListener('blur', () => {
                this.suspeito.dt_encontro = moment(input.value).format('YYYY-MM-DD');
            })

            if (elementS) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                elementS.bulmaCalendar.on('select', datepicker => {
                    this.suspeito.dt_encontro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }

            const elementR = document.querySelector('#dtRec');

            if (elementR) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                elementR.bulmaCalendar.on('select', datepicker => {
                    this.suspeito.dt_recebe = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }

            const elementP = document.querySelector('#dtPasteur');

            if (elementP) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                elementP.bulmaCalendar.on('select', datepicker => {
                    this.suspeito.dt_pasteur = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }

            const elementL = document.querySelector('#dtLab');

            if (elementL) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                elementL.bulmaCalendar.on('select', datepicker => {
                    this.suspeito.dt_laboratorio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        },
        loadData() {
            this.isLoading = true;

            suspeitoService.getSuspeito(this.suspeito.id_suspeito).then(
                (response) => {
                    let data = response.data;
                    this.suspeito.id_municipio = data.id_municipio;
                    this.suspeito.dt_encontro = data.dt_encontro;
                    this.suspeito.bairro = data.bairro;
                    this.suspeito.codigo = data.codigo;
                    this.suspeito.dt_laboratorio = data.dt_laboratorio;
                    this.suspeito.dt_pasteur = data.dt_pasteur;
                    this.suspeito.dt_recebe = data.dt_recebe;
                    this.suspeito.encontro = data.encontro;
                    this.suspeito.endereco = data.endereco;
                    this.suspeito.id_ambiente = data.id_ambiente;
                    this.suspeito.id_localidade = data.id_localidade;
                    this.suspeito.id_notifica = data.id_notifica;
                    this.suspeito.laboratorio = data.laboratorio;
                    this.suspeito.local = data.local;
                    this.suspeito.notif_espec = data.notif_espec;
                    this.suspeito.notificante = data.notificante;
                    this.suspeito.qt_insetos = data.qt_insetos;
                    this.suspeito.recebedor = data.recebedor;
                    this.suspeito.responsavel = data.responsavel;
                    this.suspeito.referencia = data.referencia;
                    this.suspeito.setor = data.setor;
                    this.suspeito.telefone = data.telefone;

                    //this.edt_date = moment(String(data.dt_suspeito)).format('DD/MM/YYYY');
                    this.municipio = data.municipio;

                    this.startCalendar();
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
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;
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
        }
    },
    created() {
        this.suspeito.id_suspeito = this.$route.params.id;
        this.loadData();
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.suspeito.id_usuario = cUser.id;
        }
    },
};
</script>

<style scoped>
.datetimepicker-dummy.is-info .datetimepicker-clear-button {
    color: brown;
    background-color: aqua;
}

.cabeca {
    /*padding: 0 !important;*/
    border-top: 1px solid;
    font-weight: bold;
}
</style>
