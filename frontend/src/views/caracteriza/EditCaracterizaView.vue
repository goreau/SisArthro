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
                                        <input type="number" min="1" class="input" name="" id="" v-model="caracteriza.ciclo">
                                        <span class="is-error" v-if="v$.caracteriza.ciclo.$error">
                                            {{ v$.caracteriza.ciclo.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
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
                                        <input class="checkmark is-large is-info" id="vegetacao" type="checkbox" name="vegetacao" true-value="1" v-model="caracteriza.vegetacao">
                                        <label for="vegetacao"></label>
                                    </div>                           
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Mat. Orgânica</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="mat_organica" type="checkbox" name="mat_organica" true-value="1" v-model="caracteriza.mat_organica">
                                        <label for="mat_organica"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-1 is-offset-1">
                                    <label class="label">Galinha</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="galinha" type="checkbox" name="galinha" true-value="1" v-model="caracteriza.galinha">
                                        <label for="galinha"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cão</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="cao" type="checkbox" name="cao" true-value="1" v-model="caracteriza.cao">
                                        <label for="cao"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Porco</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="porco" type="checkbox" name="porco" true-value="1" v-model="caracteriza.porco">
                                        <label for="porco"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cavalo</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="cavalo" type="checkbox" name="cavalo" true-value="1" v-model="caracteriza.cavalo">
                                        <label for="cavalo"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Coelho</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="coelho" type="checkbox" name="coelho" true-value="1" v-model="caracteriza.coelho">
                                        <label for="coelho"></label>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Outros</label>
                                    <div class="field checkbox">                                       
                                        <input class="checkmark is-large is-info" id="outros" type="checkbox" name="outros" true-value="1" v-model="caracteriza.outros">
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
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.num_cao_pos">
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Ano Detecção</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="ano_identifica" id="ano_identifica"
                                            v-model="caracteriza.ano_identifica">
                                    </div>

                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3 is-offset-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtCaract">
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
                        <footerCard @submit="update" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                </div>

            </div>
        </div>
    
        <div style="display: none">
            <span class="icon is-small is-left" name="coisa">
                <font-awesome-icon icon="fa-solid fa-edit" />
            </span>
            <span class="icon is-small is-left" name="coisa2">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </span>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import caracterizaService from "@/services/caracteriza.service";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
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

export default {
    data() {
        return {
            dataTable: [],
            caracteriza: {
                ciclo: 1,
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
            },
            myspan: null,
            myspan2: null,
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
                ciclo: { required$, minValue: 1, integer$},
                ano_identifica: {
                    requiredIf: requiredIf$(this.caracteriza.num_cao_pos > 0),
                }
            },
        };
       /* if (this.caracteriza.num_cao_pos > 0){
            valid['ano_identifica']={
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
    },
    methods: {
        setDate($event) {
            if ($event) {
                this.caracteriza.dt_caracterizacao = moment(String($event)).format('YYYY-MM-DD');
            }
        },
        startCalendar(){
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

            var calini = bulmaCalendar.attach('#dtCaract', options);

            const element = document.querySelector('#dtCaract');

            const input = document.querySelector('.datetimepicker-dummy-input');
            input.removeAttribute('readonly');
            input.setAttribute('value', "__/__/____");
            input.setAttribute('data-mask', "__/__/____");
            this.applyDataMask(input);

            input.addEventListener('blur', () => {
                this.caracteriza.dt_caracterizacao = moment(input.value).format('YYYY-MM-DD');
            })

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.caracteriza.dt_caracterizacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
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
        loadData() {
            this.isLoading = true;

            caracterizaService.getCaracteriza(this.caracteriza.id_caracterizacao).then(
                async (response) => {
                    let data = response.data[0];
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
                    this.caption = "Caracterização";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;

        },
        update() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');

                caracterizaService.update(this.caracteriza).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Informações alteradas.";
                        this.type = "success";
                        this.caption = "Caracterização";
                        setTimeout(() => {
                            this.showMessage = false;
                            this.$router.go(-1);
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
        }
    },
    created() {
        this.caracteriza.id_caracterizacao = this.$route.params.id;
        this.loadData();
    },
};
</script>

<style scoped>
.checkmark {
    width: 2rem;
    height: 2rem;
    -webkit-appearance: none; /* Remove o estilo padrão */
    appearance: none; /* Remove o estilo padrão */
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
