<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">
                            Notificação - Exames
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">3 - COLETA E EXAME
                                    LABORATORIAL
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-2 is-offset-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtEntrada">
                                    </div>
                                    <span class="is-error" v-if="v$.notifica_exame.dt_entrada.$error">
                                        {{ v$.notifica_exame.dt_entrada.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Laboratorio</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="24" @selValue="notifica_exame.id_laboratorio = $event" :sel="notifica_exame.id_laboratorio"
                                            :errclass="{
                                                'is-danger': v$.notifica_exame.id_laboratorio.$error,
                                            }" />
                                        <span class="is-error" v-if="v$.notifica_exame.id_laboratorio.$error">
                                            {{ v$.notifica_exame.id_laboratorio.$errors[0].$message }}
                                        </span>

                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Especificar</label>
                                    <div class="control">
                                        <input class="input" :disabled="notifica_exame.id_laboratorio != 1330" type="text" v-model="notifica_exame.lab_especifica"
                                            :class="{ 'is-danger': v$.notifica_exame.lab_especifica.$error }" />
                                        <span class="is-error" v-if="v$.notifica_exame.lab_especifica.$error">
                                            {{ v$.notifica_exame.lab_especifica.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-1">
                                    <label class="label">Número</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="amostra.numero"
                                            :class="{ 'is-danger': v$.amostra.numero.$error }" />
                                        <span class="is-error" v-if="v$.amostra.numero.$error">
                                            {{ v$.amostra.numero.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Tipo</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="22" @selValue="setAmTipo($event)" :sel="amostra.tipo"
                                        :errclass="{'is-danger': v$.amostra.tipo.$error,}" />
                                        <span class="is-error" v-if="v$.amostra.tipo.$error">
                                            {{ v$.amostra.tipo.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Resultado</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="16" @selValue="setAmResult($event)" :sel="amostra.resultado"
                                        :errclass="{'is-danger': v$.amostra.resultado.$error,}" />
                                        <span class="is-error" v-if="v$.amostra.resultado.$error">
                                            {{ v$.amostra.resultado.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Exame</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="25" @selValue="setAmExame($event)" :sel="amostra.exame"
                                        :errclass="{'is-danger': v$.amostra.exame.$error,}" />
                                        <span class="is-error" v-if="v$.amostra.exame.$error">
                                            {{ v$.amostra.exame.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Espécie</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="amostra.especie"
                                            :class="{ 'is-danger': v$.amostra.especie.$error }" />
                                        <span class="is-error" v-if="v$.amostra.especie.$error">
                                            {{ v$.amostra.especie.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Repetir</label>
                                    <label class="checkbox">
                                        <input type="checkbox" v-model="amostra.repetir" value="1" />
                                        Sim
                                    </label>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">&nbsp;</label>
                                    <button class="button is-primary is-outlined" @click="newAmostra">
                                        <span class="icon">
                                            <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                        </span>
                                        <span v-if="editing < 0">Inserir</span>
                                        <span v-else>Alterar</span>
                                    </button>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1">
                                    <MySimpleTable :tableData="dataTable" :columns="columns" />
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">4 - EVOLUÇÃO
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Óbito</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="obito" value="1" v-model="notifica_exame.obito" />
                                            1 - Não
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="obito" value="2" v-model="notifica_exame.obito" />
                                            2 - Sim
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica_exame.obito.$error">
                                        {{ v$.notifica_exame.obito.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtObito" :disabled="notifica_exame.obito != 2">
                                    </div>
                                    <span class="is-error" v-if="v$.notifica_exame.dt_obito.$error">
                                        {{ v$.notifica_exame.dt_obito.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Causa Óbito</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="causaobito" value="1" :disabled="notifica_exame.obito != 2"
                                                v-model="notifica_exame.id_causa_obito" />
                                            1 - Natural
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="causaobito" value="2" :disabled="notifica_exame.obito != 2"
                                                v-model="notifica_exame.id_causa_obito" />
                                            2 - Eutanásia
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="causaobito" value="3" :disabled="notifica_exame.obito != 2"
                                                v-model="notifica_exame.id_causa_obito" />
                                            3 - Outro
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica_exame.id_causa_obito.$error">
                                        {{ v$.notifica_exame.id_causa_obito.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Especificar</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica_exame.ob_especifica" :disabled="notifica_exame.id_causa_obito != 3"
                                            :class="{ 'is-danger': v$.notifica_exame.ob_especifica.$error }" />
                                        <span class="is-error" v-if="v$.notifica_exame.ob_especifica.$error">
                                            {{ v$.notifica_exame.ob_especifica.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-4 is-offset-4">
                                    <label class="label">Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica_exame.responsavel"
                                            :class="{ 'is-danger': v$.notifica_exame.responsavel.$error }" />
                                        <span class="is-error" v-if="v$.notifica_exame.responsavel.$error">
                                            {{ v$.notifica_exame.responsavel.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="null" :cFooter="cFooter" />
                    </footer>
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
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import notificaService from "@/services/notifica.service";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import { required$, combo$, requiredIf$, maxLength$, integer$, } from "../../components/forms/validators.js";
import MySimpleTable from "@/components/forms/MySimpleTable.vue";

export default {
    components: {
        Loader,
        Message,
        CmbAuxiliares,
        footerCard,
        MySimpleTable,
    },
    data() {
        return {
            id_notificacao_exame: 0,
            notifica_exame: {
                id_notificacao: 0,
                dt_entrada: '',
                id_laboratorio: 0,
                amostras: [],
                lab_especifica: '',
                obito: 0,
                dt_obito: '',
                id_causa_obito: 0,
                ob_especifica: '',
                responsavel: ''
            },
            amostra: {
                numero: '',
                tipo: 0,
                fant_tipo: '',
                resultado: 0,
                fant_result: '',
                exame: 0,
                fant_exame: '',
                especie: '',
                repetir: 0,
            },
            editing: -1,
            teste: [],
            dataTable: [],
            columns: [],
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: "Salvar",
                strCancel: "Cancelar",
                strAux: "",
                aux: false,
            },
        }
    },
    validations() {
        return {
            notifica_exame: {
                dt_entrada: { required$ },
                id_laboratorio: { minValue: combo$(1) },
                lab_especifica: {
                    requiredIf: requiredIf$(this.notifica_exame.id_laboratorio == 1330),
                    maxLength: maxLength$(40)
                },
                obito: { minValue: combo$(1) },
                dt_obito: {
                    requiredIf: requiredIf$(this.notifica_exame.obito == 2),
                },
                id_causa_obito: {
                    requiredIf: requiredIf$(this.notifica_exame.obito == 2),
                },
                ob_especifica: {
                    requiredIf: requiredIf$(this.notifica_exame.id_causa_obito == 3),
                    maxLength: maxLength$(40)
                },
                responsavel: { required$, maxLength: maxLength$(40) },
            },
            amostra: {
                numero: { required$, integer$ },
                tipo: { minValue: combo$(1) },
                resultado: { minValue: combo$(1) },
                exame: { minValue: combo$(1) },
                especie: { requiredIf: requiredIf$(this.notifica_exame.resultado == 1121), maxLength: maxLength$(40) },
            },
        };
    },
    methods: {
        editAmostra(idx) {
            let dados = this.teste[idx];
            this.amostra = dados;
            this.editing = idx;
        },
        delAmostra(idx) {
            this.teste.splice(idx, 1);
            this.dataTable = JSON.parse(JSON.stringify(this.teste));
        },
        setAmTipo(e) {
            this.amostra.tipo = e;
            const select = document.getElementById('22');
            this.amostra.fant_tipo = select.options[select.selectedIndex].text;
        },
        setAmResult(e) {
            this.amostra.resultado = e;
            const select = document.getElementById('16');
            this.amostra.fant_result = select.options[select.selectedIndex].text;
        },
        setAmExame(e) {
            this.amostra.exame = e;
            const select = document.getElementById('25');
            this.amostra.fant_exame = select.options[select.selectedIndex].text;
        },
        newAmostra() {
            if (this.editing < 0) {
                this.teste.push(JSON.parse(JSON.stringify(this.amostra)));//this.criarNovoObjeto(this.parasito));
            } else {
                this.teste[this.editing] = JSON.parse(JSON.stringify(this.amostra));
                this.editing = -1;
            }

            this.dataTable = JSON.parse(JSON.stringify(this.teste));
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
                startDate: this.notifica_exame.dt_entrada,
                color: "info",
                allowInput: true,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };


            var caldpp = bulmaCalendar.attach('#dtEntrada', options);
            options.dateStart = this.notifica_exame.dt_entrada;
            var calcolex = bulmaCalendar.attach('#dtObito', options);

            const element1 = document.querySelector('#dtEntrada');
            const element2 = document.querySelector('#dtObito');




            const input = document.querySelectorAll('.datetimepicker-dummy-input');
            for (let i = 0; i < input.length; i++) {
                input[i].removeAttribute('readonly');
                input[i].setAttribute('value', "__/__/____");
                input[i].setAttribute('data-mask', "__/__/____");
                this.applyDataMask(input[i]);

                input[i].addEventListener('blur', (e) => {
                    switch (i) {
                        case 0:
                            this.notifica_exame.dt_entrada = moment(e.value).format('YYYY-MM-DD');
                            break;
                        case 1:
                            this.notifica_exame.dt_obito = moment(e.value).format('YYYY-MM-DD');
                            break;
                    }

                })

            }


            if (element1) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element1.bulmaCalendar.on('select', datepicker => {
                    this.notifica_exame.dt_entrada = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
            if (element2) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element2.bulmaCalendar.on('select', datepicker => {
                    this.notifica_exame.dt_obito = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        },
        loadData() {
            this.isLoading = true;

            notificaService.getNotificaDet(this.notifica_exame.id_notificacao).then(
                async (response) => {
                    let data = response.data;
                    if (data != ''){
                        this.id_notificacao_exame = data.id_notificacao_exame;
                        this.notifica_exame.id_laboratorio = data.id_laboratorio;
                        this.notifica_exame.lab_especifica = data.lab_especifica;
                        this.notifica_exame.obito = data.obito;
                        this.notifica_exame.dt_obito = data.dt_obito;
                        //this.edt_date = moment(String(data.dt_entrada)).format('DD/MM/YYYY');
                        this.notifica_exame.dt_entrada = data.dt_entrada;
                        this.notifica_exame.id_causa_obito = data.id_causa_obito;
                        this.notifica_exame.ob_especifica = data.ob_especifica;
                        this.teste = data.amostras;
                        this.dataTable = [...this.teste];
                        this.notifica_exame.responsavel = data.responsavel;                  
                    }
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
                    this.caption = "CodEnd";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );


            this.isLoading = false;
        },
        create() {
            this.v$.$validate(); // checks all inputs

            if (!this.v$.$error) {
                document.getElementById("login").classList.add("is-loading");

                this.notifica_exame.amostras = this.teste;

                if (this.id_notificacao_exame > 0){
                    this.update();
                } else {
                    this.insert();
                }

            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Exames";
                setTimeout(() => (this.showMessage = false), 3000);
            }   
        },
        insert(){
            notificaService
                    .createDet(this.notifica_exame)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Exames registrados com sucesso!";
                        this.type = "success";
                        this.caption = "Exames";
                        setTimeout(() => {
                            (this.showMessage = false);
                            location.reload();
                        }, 2000);
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Exames";
                            setTimeout(() => (this.showMessage = false), 3000);
                        };
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Exames";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById("login").classList.remove("is-loading");
                    });
            
        },
        update(){
            this.notifica_exame.id_notificacao_exame = this.id_notificacao_exame;
            notificaService
                    .editDet(this.notifica_exame)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Exames alterados com sucesso!";
                        this.type = "success";
                        this.caption = "Exames";
                        setTimeout(() => {
                            (this.showMessage = false);
                            location.reload();
                        }, 2000);
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Exames";
                            setTimeout(() => (this.showMessage = false), 3000);
                        };
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Exames";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById("login").classList.remove("is-loading");
                    });
        },
    },
    mounted() {
        this.myspan = document.getElementsByName("coisa")[0];
        this.myspan2 = document.getElementsByName("coisa2")[0];
        this.loadData();
        

        this.columns = [
            { title: "Número", field: "numero", type: "string", widthGrow: 1 },
            { title: "Tipo", field: "fant_tipo", type: "string", widthGrow: 3 },
            { title: "Exame", field: "fant_exame", type: "string", widthGrow: 2 },
            { title: "Resultado", field: "fant_result", type: "string", widthGrow: 2 },
            { title: "Espécie", field: "especie", type: "string", widthGrow: 2 },
            { title: "Repetir", field: "repetir", formatter: "tickCross", hozAlign: "center", widthGrow: 1 },
            { title: "Ações", widthGrow: 2,
                formatter: (cell, formatterParams) => {
                    const row = cell.getRow().getData();
                    const idx = cell.getRow().getPosition();

                    const btEdit = document.createElement("button");
                    btEdit.type = "button";
                    btEdit.title = "Editar";
                    btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btEdit.classList.add("button", "is-primary", "is-outlined");
                    btEdit.innerHTML = this.myspan.innerHTML;
                    btEdit.addEventListener("click", () => {
                        this.editAmostra(idx - 1);
                    });

                    const btDel = document.createElement("button");
                    btDel.type = "button";
                    btDel.title = "Excluir";
                    btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btDel.classList.add("button", "is-danger", "is-outlined");
                    btDel.innerHTML = this.myspan2.innerHTML;
                    btDel.addEventListener("click", async () => {
                        this.delAn = mostra(idx - 1);
                    });

                    const buttonHolder = document.createElement("span");
                    buttonHolder.appendChild(btEdit);
                    buttonHolder.appendChild(btDel);

                    return buttonHolder;
                },
            }
        ]
    },
    created() {
        this.notifica_exame.id_notificacao = this.$route.params.master;
    },
}
</script>

<style></style>