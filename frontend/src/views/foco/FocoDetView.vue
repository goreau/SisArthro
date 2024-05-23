<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">
                            Investigação de Foco - Animais
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-8 has-text-centered cabeca">Identificação</div>
                                <div class="column is-4 has-text-centered cabeca">
                                    Coleta
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Cod End</label>
                                    <div class="select">
                                        <select v-model="foco_det.id_codend" class="input">
                                        <option value="0">-- Selecione --</option>
                                        <option v-for="reg in codends" :key="reg.id_codend" :value="reg.id_codend">
                                            {{ reg.codigo }}
                                        </option>
                                        </select>
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.id_codend.$error">
                                        {{ v$.foco_det.id_codend.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Animal</label>
                                    <div class="select">
                                        <select v-model="foco_det.id_canino_det" class="input">
                                        <option value="0">-- Selecione --</option>
                                        <option v-for="reg in caninos" :key="reg.id_canino_det" :value="reg.id_canino_det">
                                            {{ reg.animal }}
                                        </option>
                                        </select>
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.id_canino_det.$error">
                                        {{ v$.foco_det.id_canino_det.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Situação</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="20" @selValue="foco_det.id_situacao = $event" :errclass="{
                                            'is-danger': v$.foco_det.id_situacao.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.id_situacao.$error">
                                            {{ v$.foco_det.id_situacao.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-12 has-text-centered cabeca">Sinais</div>
                            </div>
                            <div class="columns">
                                <div class="column is-1" v-for="reg in sinais" :key="reg.id_auxiliares">
                                    <label class="checkbox sinal">
                                            <input type="checkbox" name="sinais" :value="reg.id_auxiliares" @click="()=>{selectSinal(reg.id_auxiliares)}" />
                                            <br>{{ reg.descricao }}
                                    </label>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-12 has-text-centered cabeca">Parasitológico</div>
                            </div>
                            <div class="columns">
                                <div class="field column is-2">
                                    <label class="label">Data Coleta</label>
                                    <div class="control">
                                        <input type="text" id="dt_pcol">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.paras_dt_col.$error">
                                        {{ v$.foco_det.dt_dpp.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Tipo Amostra</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="22" @selValue="foco_det.paras_tipo = $event" :errclass="{
                                            'is-danger': v$.foco_det.paras_tipo.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.paras_tipo.$error">
                                            {{ v$.foco_det.paras_tipo.$errors[0].$message }}
                                        </span>     
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Exame</label>
                                    <div class="control">
                                        <input type="text" id="dt_pex">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.paras_dt_ex.$error">
                                        {{ v$.foco_det.paras_dt_ex.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="23" @selValue="foco_det.paras_result = $event" :errclass="{
                                            'is-danger': v$.foco_det.paras_result.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.paras_result.$error">
                                            {{ v$.foco_det.paras_result.$errors[0].$message }}
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-7 has-text-centered cabeca">DPP</div>
                                <div class="column is-5 has-text-centered cabeca">Elisa</div>
                            </div>
                            <div class="columns">
                                <div class="field column is-2">
                                    <label class="label">Data Coleta</label>
                                    <div class="control">
                                        <input type="text" id="dt_dppcol">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.dpp_dt_col.$error">
                                        {{ v$.foco_det.dpp_dt_col.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Exame</label>
                                    <div class="control">
                                        <input type="text" id="dt_dppex">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.dpp_dt_ex.$error">
                                        {{ v$.foco_det.dpp_dt_ex.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="16" @selValue="foco_det.dpp_result = $event" :errclass="{
                                            'is-danger': v$.foco_det.dpp_result.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.dpp_result.$error">
                                            {{ v$.foco_det.dpp_result.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Data Coleta</label>
                                    <div class="control">
                                        <input type="text" id="dt_elisacol">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.elisa_dt_col.$error">
                                        {{ v$.foco_det.elisa_dt_col.$errors[0].$message }}
                                    </span>
                                </div>
                               <!-- <div class="field column is-2">
                                    <label class="label">Data Exame</label>
                                    <div class="control">
                                        <input type="text" id="ddtElisa">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.elisa_dt_ex.$error">
                                        {{ v$.foco_det.elisa_dt_ex.$errors[0].$message }}
                                    </span>
                                </div>-->
                                <div class="field column is-3">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="16" @selValue="foco_det.elisa_result = $event" :errclass="{
                                            'is-danger': v$.foco_det.elisa_result.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.elisa_result.$error">
                                            {{ v$.foco_det.elisa_result.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!----->
                            <div class="columns">
                                <div class="column is-6 is-offset-3 has-text-centered cabeca">
                                    Desfecho
                                </div>
                            </div>
                            <div class="columns">    
                                <div class="field column is-4 is-offset-3">
                                    <label class="label">Código</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="18" @selValue="foco_det.id_desfecho = $event" :errclass="{
                                            'is-danger': v$.foco_det.id_desfecho.$error,
                                        }" />
                                        <span class="is-error" v-if="v$.foco_det.id_desfecho.$error">
                                            {{ v$.foco_det.id_desfecho.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>    
                                <div class="field column is-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtDesfecho">
                                    </div>
                                    <span class="is-error" v-if="v$.foco_det.dt_desfecho.$error">
                                        {{ v$.foco_det.dt_desfecho.$errors[0].$message }}
                                    </span>
                                </div>                            
                            </div>                           
                        </div>                        
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import focoService from "@/services/foco.service";
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
            caninos: [],
            sinais: [],
            foco_det: {
                id_foco: 0,
                id_codend: 0, 
                id_canino_det: 0, 
                id_situacao: 0, 
                paras_dt_col: "",
                paras_tipo: 0,
                paras_dt_ex: "",
                paras_result: 0,
                dpp_dt_col: '', 
                dpp_dt_ex: '',
                dpp_result: 0,
                elisa_dt_col: "",
                elisa_dt_ex: "",
                elisa_result: 0,
                sinais: [],
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
            foco_det: {
                paras_dt_col: { },
                paras_dt_ex: {  },
                paras_result: {  },
                paras_tipo: { },
                dpp_dt_col: {  },
                dpp_dt_ex: { },
                dpp_result: {  },
                elisa_dt_col: {  },
                elisa_result: {  },
                id_codend: { minValue: combo$(1) },
                id_canino_det: { minValue: combo$(1) },
                dt_desfecho: { required$ },
                id_desfecho: { minValue: combo$(1) },
                id_situacao: { minValue: combo$(1) },
            },
        };
    },
    methods: {
        details() {
            this.$router.push("/foco_dets/" + this.foco_det.id_foco);
        },
        selectSinal(id){
            if(this.foco_det.sinais.includes(id)){
                const idx = this.foco_det.sinais.indexOf(id);
                this.foco_det.sinais.splice(idx, 1);
            }else{
                this.foco_det.sinais.push(id)
            }
      },
        create() {           
            this.v$.$validate(); // checks all inputs
            console.log(this.v$);
            if (!this.v$.$error) {
                document.getElementById("login").classList.add("is-loading");

                focoService
                    .createDet(this.foco_det)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Coleta registrada com sucesso!";
                        this.type = "success";
                        this.caption = "Inv Foco";
                        setTimeout(() => {
                            (this.showMessage = false);
                            location.reload();
                        }, 2000);
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Inv Foco";
                            setTimeout(() => (this.showMessage = false), 3000);
                        };
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Inv Foco";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById("login").classList.remove("is-loading");
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Inv Foco";
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
            codendService.getAnimalByCodend(this.foco_det.id_codend)
            .then((res) => {
                this.caninos = res.data;
            })
            .catch((err) => {
                this.caninos = [];
            })
        },
        getSinais() {
            focoService.getComboSinais()
            .then((res) => {
                this.sinais = res.data;
            })
            .catch((err) => {
                this.sinais = [];
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
            const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                showHeader: false,
                dateStart: '',
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };
            
            var calcol = bulmaCalendar.attach('#dt_pcol', options);
            var caldpp = bulmaCalendar.attach('#dt_pex', options);
            var calel = bulmaCalendar.attach('#dt_dppcol', options);
            var calcole = bulmaCalendar.attach('#dt_dppex', options);
            var calcolex = bulmaCalendar.attach('#dt_elisacol', options);
            var caldesf = bulmaCalendar.attach('#dtDesfecho', options);

            const element = document.querySelector('#dt_pcol');
            const element1 = document.querySelector('#dt_pex');
            const element2 = document.querySelector('#dt_dppcol');
            const element3 = document.querySelector('#dt_dppex');
            const element4 = document.querySelector('#dt_elisacol');
            const element5 = document.querySelector('#dtDesfecho');

            const input = document.querySelectorAll('.datetimepicker-dummy-input');
            for (let i = 0; i < input.length; i++) {
                input[i].removeAttribute('readonly');
                input[i].setAttribute('value', "__/__/____");
                input[i].setAttribute('data-mask', "__/__/____");
                this.applyDataMask(input[i]);

                input[i].addEventListener('blur', (e) => {
                    switch(i){
                        case 0:
                            this.foco_det.paras_dt_col = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 1:
                            this.foco_det.paras_dt_ex = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 2:
                            this.foco_det.dpp_dt_col = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 3:
                            this.foco_det.dpp_dt_ex = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 4:
                            this.foco_det.elisa_dt_col = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 5:
                            this.foco_det.dt_desfecho = moment(e.value).format('YYYY-MM-DD');
                            break;
                    }
                    
                })

            }
            

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.foco_det.dt_coleta = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element1) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element1.bulmaCalendar.on('select', datepicker => {
                    this.foco_det.dt_dpp = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element2) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element2.bulmaCalendar.on('select', datepicker => {
                    this.foco_det.dt_elisa = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element3) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element3.bulmaCalendar.on('select', datepicker => {
                    this.foco_det.dt_coleira = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element4) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element4.bulmaCalendar.on('select', datepicker => {
                    this.foco_det.dt_desfecho = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        }
    },
    mounted() {this.startCalendar();},
    created() {
        this.foco_det.id_foco = this.$route.params.master;
        this.quart = this.$route.params.quart;
        
        this.getCodends();
        this.getSinais();
    },
    watch: {
        'foco_det.id_codend'(value) {
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
.sinal {
    font-size: x-small;
}
</style>
