<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">
                            Inquérito Canino - Animais
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-7 has-text-centered cabeca">Identificação</div>
                                <div class="column is-5 has-text-centered cabeca">
                                    Coleta
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Cod End</label>
                                    <div class="select">
                                        <select v-model="inquerito_det.id_codend" class="input">
                                        <option value="0">-- Selecione --</option>
                                        <option v-for="reg in codends" :key="reg.id_codend" :value="reg.id_codend">
                                            {{ reg.codigo }}
                                        </option>
                                        </select>
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.id_codend.$error">
                                        {{ v$.inquerito_det.id_codend.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Animal</label>
                                    <div class="select">
                                        <select v-model="inquerito_det.id_canino_det" class="input">
                                        <option value="0">-- Selecione --</option>
                                        <option v-for="reg in inqueritos" :key="reg.id_canino_det" :value="reg.id_canino_det">
                                            {{ reg.animal }}
                                        </option>
                                        </select>
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.id_canino_det.$error">
                                        {{ v$.inquerito_det.id_canino_det.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Situação</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="15" @selValue="inquerito_det.id_situacao = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.id_situacao.$error,
                                        }" :sel="inquerito_det.id_situacao" />
                                        <span class="is-error" v-if="v$.inquerito_det.id_situacao.$error">
                                            {{ v$.inquerito_det.id_situacao.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Coleta</label>
                                    <div class="control">
                                        <input type="text" data-role="date" id="dtColeta">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.dt_coleta.$error">
                                        {{ v$.inquerito_det.dt_coleta.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-5 has-text-centered cabeca">DPP</div>
                                <div class="column is-5 has-text-centered cabeca">
                                    Elisa
                                </div>
                                <div class="column is-2 has-text-centered cabeca">
                                    Final
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-2">
                                    <label class="label">Data Exame</label>
                                    <div class="control">
                                        <input type="text" id="dtDpp">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.dt_dpp.$error">
                                        {{ v$.inquerito_det.dt_dpp.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="16" @selValue="inquerito_det.res_dpp = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.res_dpp.$error,
                                        }" :sel="inquerito_det.res_dpp"/>
                                        <span class="is-error" v-if="v$.inquerito_det.res_dpp.$error">
                                            Informe o valor desse campo
                                            {{ v$.inquerito_det.res_dpp.$errors[0].$message }}
                                        </span>
                                        
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Exame</label>
                                    <div class="control">
                                        <input type="text" id="dtElisa">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.dt_elisa.$error">
                                        {{ v$.inquerito_det.dt_elisa.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="16" @selValue="inquerito_det.res_elisa = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.res_elisa.$error,
                                        }" :sel="inquerito_det.res_elisa" />
                                        <span class="is-error" v-if="v$.inquerito_det.res_elisa.$error">
                                            Informe o valor desse campo
                                            {{ v$.inquerito_det.res_elisa.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Resultado Final</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="19" @selValue="inquerito_det.res_final = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.res_final.$error,
                                        }" :sel="inquerito_det.res_final"/>
                                        <span class="is-error" v-if="v$.inquerito_det.res_final.$error">
                                            {{ v$.inquerito_det.res_final.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!----->
                            <div class="columns">
                                <div class="column is-7 has-text-centered cabeca">Coleira</div>
                                <div class="column is-5 has-text-centered cabeca">
                                    Desfecho
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Ciclo</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="" v-model="inquerito_det.coleira_ciclo"
                                            :class="{ 'is-danger': v$.inquerito_det.coleira_ciclo.$error }" />
                                        <span class="is-error" v-if="v$.inquerito_det.coleira_ciclo.$error">
                                            {{ v$.inquerito_det.coleira_ciclo.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Troca</label>
                                    <div class="control">
                                        <input type="text" id="dtColeira">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.dt_coleira.$error">
                                        {{ v$.inquerito_det.dt_coleira.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Situacao</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="17" @selValue="inquerito_det.res_coleira = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.res_coleira.$error,
                                        }" :sel="inquerito_det.res_coleira"/>
                                        <span class="is-error" v-if="v$.inquerito_det.res_coleira.$error">
                                            {{ v$.inquerito_det.res_coleira.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>    
                                <div class="field column is-3">
                                    <label class="label">Código</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="18" @selValue="inquerito_det.id_desfecho = $event" :errclass="{
                                            'is-danger': v$.inquerito_det.id_desfecho.$error,
                                        }" :sel="inquerito_det.id_desfecho" />
                                        <span class="is-error" v-if="v$.inquerito_det.id_desfecho.$error">
                                            {{ v$.inquerito_det.id_desfecho.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>    
                                <div class="field column is-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtDesfecho">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito_det.dt_desfecho.$error">
                                        {{ v$.inquerito_det.dt_desfecho.$errors[0].$message }}
                                    </span>
                                </div>                            
                            </div>                           
                        </div>
                        <footer class="card-footer">
                            <footerCard @submit="edit" @cancel="null" @aux="details" :cFooter="cFooter" />
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import inqueritoService from "@/services/inquerito.service";
import codendService from "@/services/codend.service";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css"; 
import moment from 'moment';
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import { required$, combo$, integer$, requiredIf$ } from "../../components/forms/validators.js";


export default {
    components: {
        Loader,
        Message,
        CmbAuxiliares,
        footerCard,
    },
    data() {
        return {
            master: {},
            quart:{},
            codends: [],
            inqueritos: [],
            inquerito_det: {
                id_inquerito_det: 0,
                id_inquerito: 0,
                id_codend: 0, 
                id_canino_det: 0, 
                id_situacao: 0, 
                dt_coleta: "",
                dt_dpp: '', 
                res_dpp: 0,
                dt_elisa: "",
                res_elisa: 0,
                res_final: 0,
                coleira_ciclo: 0,
                dt_coleira: '',
                res_coleira: 0,
                id_desfecho: 0, 
                dt_desfecho: ''
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: "Salvar",
                strCancel: "Cancelar",
                strAux: "Coletas",
                aux: true,
            },
        };
    },
    validations() {
        const minValueF = (value, vm) =>{
            if (vm.id_situacao == 1115){
                return value>0; 
            } 
            return true;
        };
        return {
            inquerito_det: {
                dt_coleta: { requiredIf: requiredIf$(this.inquerito_det.id_situacao == 1115)},
                dt_dpp: { requiredIf: requiredIf$(this.inquerito_det.id_situacao == 1115 && this.inquerito_det.res_dpp != 1123) },
                dt_elisa: { requiredIf: requiredIf$(this.inquerito_det.id_situacao == 1115 && this.inquerito_det.res_elisa != 1123) },
                dt_coleira: { requiredIf: requiredIf$(this.inquerito_det.id_situacao == 1115 && this.inquerito_det.res_coleira == 1124) },
                dt_desfecho: { required$ },
                id_codend: { minValue: combo$(1) },
                id_situacao: { minValue: combo$(1) },
                id_canino_det: { minValue: combo$(1) },
                res_dpp: { minValueF },
                res_elisa: { minValueF },
                res_final: { requiredIf: requiredIf$(this.inquerito_det.id_situacao == 1115) },
                res_coleira: { minValue: combo$(1) },
                id_desfecho: { minValue: combo$(1) },
                coleira_ciclo: { integer$ },
            },
        };
    },
    methods: {
        details() {
            this.$router.push("/inquerito_dets/" + this.inquerito_det.id_inquerito);
        },
        loadData() {
            this.isLoading = true;

            inqueritoService.getInqueritoDet(this.inquerito_det.id_inquerito_det).then(
                async (response) => {
                    let data = response.data;
                    this.inquerito_det.id_inquerito = data.id_inquerito;
                    this.quart = data.id_quarteirao;
                    this.getCodends();
                    this.inquerito_det.id_codend = data.id_codend;
                    this.getAnimais();
                    this.inquerito_det.id_canino_det = data.id_canino_det;
                    this.inquerito_det.id_desfecho = data.id_desfecho;
                    this.inquerito_det.id_situacao = data.id_situacao;
                    this.inquerito_det.res_coleira = data.res_coleira;
                    this.inquerito_det.res_dpp = data.res_dpp;
                    this.inquerito_det.res_elisa = data.res_elisa;
                    this.inquerito_det.res_final = data.res_final;
                    this.inquerito_det.coleira_ciclo = data.coleira_ciclo;
                    this.inquerito_det.dt_coleira = data.dt_coleira;
                    this.inquerito_det.dt_coleta = data.dt_coleta;
                    this.inquerito_det.dt_desfecho = data.dt_desfecho;
                    this.inquerito_det.dt_dpp = data.dt_dpp;
                    this.inquerito_det.dt_elisa = data.dt_elisa;
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
                    this.caption = "Inquérito";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );


            this.isLoading = false;
        },

        edit() {           
            this.v$.$validate(); // checks all inputs
            console.log(this.v$);
            if (!this.v$.$error) {
                document.getElementById("login").classList.add("is-loading");

                inqueritoService
                    .editDet(this.inquerito_det)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Coleta alterada com sucesso!";
                        this.type = "success";
                        this.caption = "Inquérito";
                        setTimeout(() => {
                            (this.showMessage = false);
                            location.reload();
                        }, 2000);
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Inquérito";
                            setTimeout(() => (this.showMessage = false), 3000);
                        };
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Inquérito";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById("login").classList.remove("is-loading");
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Inquérito";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        getCodends() {
            codendService.getCodendsByQuadra(this.quart)
            .then((res) => {
                this.codends = res.data;
            })
            .catch((err) => {
                this.codends = [];
            })
        },
        getAnimais() {
            codendService.getAnimalByCodend(this.inquerito_det.id_codend)
            .then((res) => {
                this.caninos = res.data;
            })
            .catch((err) => {
                this.caninos = [];
            })
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
            var options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                showHeader: false,
                startDate: this.inquerito_det.dt_coleta,
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };
            
            var calcol = bulmaCalendar.attach('#dtColeta', options);
            options.startDate = this.inquerito_det.dt_dpp;
            var caldpp = bulmaCalendar.attach('#dtDpp', options);
            options.startDate = this.inquerito_det.dt_elisa;
            var calel = bulmaCalendar.attach('#dtElisa', options);
            options.startDate = this.inquerito_det.dt_coleira;
            var calcole = bulmaCalendar.attach('#dtColeira', options);
            options.startDate = this.inquerito_det.dt_desfecho;
            var caldesf = bulmaCalendar.attach('#dtDesfecho', options);

            const element = document.querySelector('#dtColeta');
            const element1 = document.querySelector('#dtDpp');
            const element2 = document.querySelector('#dtElisa');
            const element3 = document.querySelector('#dtColeira');
            const element4 = document.querySelector('#dtDesfecho');

            const input = document.querySelectorAll('.datetimepicker-dummy-input');
            for (let i = 0; i < input.length; i++) {
                input[i].removeAttribute('readonly');
                input[i].setAttribute('value', "__/__/____");
                input[i].setAttribute('data-mask', "__/__/____");
                this.applyDataMask(input[i]);

                input[i].addEventListener('blur', (e) => {
                    switch(i){
                        case 0:
                            this.inquerito_det.dt_coleta = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 1:
                            this.inquerito_det.dt_dpp = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 2:
                            this.inquerito_det.dt_elisa = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 3:
                            this.inquerito_det.dt_coleira = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 4:
                            this.inquerito_det.dt_desfecho = moment(e.value).format('YYYY-MM-DD');
                            break;
                    }
                    
                })

            }
            

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.inquerito_det.dt_coleta = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element1) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element1.bulmaCalendar.on('select', datepicker => {
                    this.inquerito_det.dt_dpp = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element2) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element2.bulmaCalendar.on('select', datepicker => {
                    this.inquerito_det.dt_elisa = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element3) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element3.bulmaCalendar.on('select', datepicker => {
                    this.inquerito_det.dt_coleira = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element4) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element4.bulmaCalendar.on('select', datepicker => {
                    this.inquerito_det.dt_desfecho = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        }
    },
    mounted() {},
    created() {
        this.inquerito_det.id_inquerito_det = this.$route.params.id;
        
        this.loadData();  
    },
    watch: {
        'inquerito_det.id_codend'(value) {
            this.getAnimais();
        },
    }
};
</script>

<style scoped>
.cabeca {
    /*padding: 0 !important;*/
    border-bottom: 1px solid;
    font-weight: bold;
}
</style>
