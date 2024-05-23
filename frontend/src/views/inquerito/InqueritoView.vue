<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Inquérito Canino</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Município</label>
                                    <div class="control">
                                        <CmbMunicipio :id_prop="currentUser.id" @selMun="inquerito.id_municipio = $event"
                                            :errclass="{ 'is-danger': v$.inquerito.id_municipio.$error }" />
                                        <span class="is-error" v-if="v$.inquerito.id_municipio.$error">
                                            {{ v$.inquerito.id_municipio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Área</label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="inquerito.id_area" class="input"
                                                :class="{ 'is-danger': v$.inquerito.id_area.$error }">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="reg in area" :key="reg.id_area" :value="reg.id_area">
                                                    {{ reg.codigo }}
                                                </option>
                                            </select><span class="is-error" v-if="v$.inquerito.id_area.$error">
                                                {{ v$.inquerito.id_area.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Quadra</label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="inquerito.id_quarteirao" class="input"
                                                :class="{ 'is-danger': v$.inquerito.id_quarteirao.$error }">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="reg in quarteirao" :key="reg.id_quarteirao"
                                                    :value="reg.id_quarteirao">
                                                    {{ reg.numero }}
                                                </option>
                                            </select>
                                            <span class="is-error" v-if="v$.inquerito.id_quarteirao.$error">
                                                {{ v$.inquerito.id_quarteirao.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Tipo de Inquérito</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="tipo" value="1" v-model="inquerito.id_tipo" />
                                            1 - Amostral
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="tipo" value="2" v-model="inquerito.id_tipo" />
                                            2 - Censitário
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito.id_tipo.$error">
                                        {{ v$.inquerito.id_tipo.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Atividade com encoleiramento</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="checkbox">
                                            <input type="checkbox" name="encoleiramento" value="1"
                                                v-model="inquerito.encoleiramento" />
                                            Sim
                                        </label>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Nº de Cães</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <input class="input" type="text" v-model="inquerito.num_caes"/>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Número</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Preenc. Automático"
                                            v-model="inquerito.numero" readonly disabled />
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-2 is-offset-3">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtInquerito">
                                    </div>
                                    <span class="is-error" v-if="v$.inquerito.dt_inquerito.$error">
                                        {{ v$.inquerito.dt_inquerito.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Nome "
                                            v-model="inquerito.responsavel"
                                            :class="{ 'is-danger': v$.inquerito.responsavel.$error }" />
                                        <span class="is-error" v-if="v$.inquerito.responsavel.$error">
                                            {{ v$.inquerito.responsavel.$errors[0].$message }}
                                        </span>
                                    </div>
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
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import territorioService from "@/services/territorio.service";
import inqueritoService from "@/services/inquerito.service";
import caninoService from "@/services/canino.service.js";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
    maxLength$,
    integer$,
} from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
export default {
    components: {
        Loader,
        Message,
        CmbMunicipio,
        CmbAuxiliares,
        footerCard
    },
    data() {
        return {
            area: [],
            quarteirao: [],
            codends: [],
            inquerito: {
                id_municipio: 0,
                id_area: 0,
                fant_area: '',
                id_quarteirao: 0,
                fant_quart: '',
                id_tipo: 0,
                encoleiramento: 0,
                numero: '',
                num_caes: 0,
                dt_inquerito: '',
                responsavel: '',
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
            inquerito: {
                id_municipio: {
                    minValue: combo$(1)
                },
                id_area: {
                    minValue: combo$(1)
                },
                id_quarteirao: {
                    minValue: combo$(1)
                },
                id_tipo: {
                    minValue: combo$(1)
                },
                encoleiramento: {
                    minValue: combo$(1)
                },
                dt_inquerito: { required$, },
                responsavel: {
                    required$,
                    maxLength: maxLength$(40)
                },
                num_caes: {
                    integer$
                },
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
                this.inquerito.dt_inquerito = moment(String($event)).format('YYYY-MM-DD');
            }
        },
        create() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');


                inqueritoService.create(this.inquerito)
                    .then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Inquérito inserido";
                            this.type = "success";
                            this.caption = "Inquérito";
                            this.inquerito.numero = response.data.master.numero
                            setTimeout(() => {
                                this.showMessage = false;
                                this.$router.push("/inquerito_det/" + response.data.master.id_inquerito + '/' + response.data.master.id_quarteirao);
                            }, 5000);
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Inquérito";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Inquérito";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById('login').classList.remove('is-loading');
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Inquérito";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        loadData() {
            this.isLoading = true;

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
        },
        getAreas(mun) {
            caninoService.getAreas(mun)
                .then((res) => {
                    console.log(res);
                    this.area = res.data.area;
                })
                .catch((err) => {
                    this.area = [];
                })
        },
        getQuarteirao(area) {
            caninoService.getQuadras(area)
                .then((res) => {
                    this.quarteirao = res.data.quarteirao;
                })
                .catch((err) => {
                    this.quarteirao = [];
                })
        },
    },
    mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.inquerito.id_usuario = cUser.id;
    }

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

    var calini = bulmaCalendar.attach('#dtInquerito', options);

    const element = document.querySelector('#dtInquerito');

    const input = document.querySelector('.datetimepicker-dummy-input');
    input.removeAttribute('readonly');
    input.setAttribute('value', "__/__/____");
    input.setAttribute('data-mask', "__/__/____");
    this.applyDataMask(input);

    input.addEventListener('blur', () => {
      this.inquerito.dt_inquerito = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.inquerito.dt_inquerito = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }
  },
    watch: {
        'inquerito.id_municipio'(value) {
            this.getAreas(value);
        },
        'inquerito.id_area'(value) {
            let fant_a = this.area.filter(item => item.id_area === value);
            this.inquerito.fant_area = fant_a[0].codigo;
            this.getQuarteirao(value);
        },
        'inquerito.id_quarteirao'(value) {
            let fant_q = this.quarteirao.filter(item => item.id_quarteirao === value);
            this.inquerito.fant_quart = fant_q[0].numero;
        }
    },


}
</script>

<style></style>