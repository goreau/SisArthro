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
                                            :errclass="{ 'is-danger': v$.caracteriza.tipo_imovel.$error }"/>
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
                                    <span class="is-error" v-if="v$.caracteriza.ano_identifica.$error">
                                        {{ v$.caracteriza.ano_identifica.$errors[0].$message }}
                                    </span>
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
                        <footerCard @submit="create" @cancel="null" @aux="back" :cFooter="cFooter" />
                    </footer>
                    <hr>
                    <div class="card-content">

                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :exports="false" :tableName="tableName" />
                    </div>
                </div>

            </div>
        </div>
        <confirm-dialog ref="confirmDialog"></confirm-dialog>
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
            caracteriza: {
                ciclo: '1',
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
        ConfirmDialog,
        MyTable,
    },
    methods: {
       /* restart(){
            this.caracteriza.ciclo = '1';
            this.caracteriza.id_caracterizacao = 0;
            this.caracteriza.id_codend = 0;
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
        },*/
        back(){
            this.$router.push(`/codends/${this.caracteriza.id_codend}`);
        },
        setDate($event) {
            if ($event) {
                this.caracteriza.dt_caracterizacao = moment(String($event)).format('YYYY-MM-DD');
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
        create() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                let preserv = {resp: this.caracteriza.responsavel, date: this.caracteriza.dt_caracterizacao };
                localStorage.setItem('preserv', JSON.stringify(preserv));

                document.getElementById('login').classList.add('is-loading');

                  caracterizaService.create(this.caracteriza).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Informações cadastradas.";
                        this.type = "success";
                        this.caption = "Caracterização";
                        setTimeout(() => (this.showMessage = false), 3000);
                       // this.restart();
                        location.reload();
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

        var obj = localStorage.getItem('preserv');
        if (obj) {
            let preserv = JSON.parse(obj);

            this.caracteriza.dt_caracterizacao = preserv.date == '' ? '' : moment(String(preserv.date)).format('DD/MM/YYYY');
            this.caracteriza.responsavel = preserv.resp;
        }

        this.myspan = document.getElementsByName("coisa")[0];
        this.myspan2 = document.getElementsByName("coisa2")[0];

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

        this.columns = [
            { title: "CodEnd", field: "codigo", type: "string", minWidth: 250, responsive: 1, },
            { title: "Ciclo", field: "ciclo", type: "string", minWidth: 200, responsive:3, },
            {
                title: "Data", field: "dt_caracterizacao", type: "string", sorter: "date", sorterParams: {
                    format: "dd/MM/yyyy",
                    alignEmptyValues: "top",
                }, minWidth: 200, responsive: 2,
            },
            { title: "Situação", field: "situacao", type: "string", minWidth: 200, responsive:1, },
            { title: "Tipo Imóvel", field: "tipo_imovel", type: "string", minWidth: 200, responsive:3, },
            { title: "Soma", field: "soma", type: "string", minWidth: 200, responsive:1, },
            {
                title: "Ações", minWidth: 200, responsive:0,
                formatter: (cell, formatterParams) => {
                    const row = cell.getRow().getData();

                    const btEdit = document.createElement("button");
                    btEdit.type = "button";
                    btEdit.title = "Editar" + this.id_user;
                    btEdit.disabled = this.id_user != row.id_usuario;
                    btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btEdit.classList.add("button", "is-primary", "is-outlined");
                    btEdit.innerHTML = this.myspan.innerHTML;
                    btEdit.addEventListener("click", () => {
                        this.$router.push(`/editCaracteriza/${row.id_caracterizacao}`);
                    });

                    const btDel = document.createElement("button");
                    btDel.type = "button";
                    btDel.title = "Excluir";
                    btDel.disabled = this.id_user != row.id_usuario;
                    btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btDel.classList.add("button", "is-danger", "is-outlined");
                    btDel.innerHTML = this.myspan2.innerHTML;
                    btDel.addEventListener("click", async () => {
                        const ok = await this.$refs.confirmDialog.show({
                            title: 'Excluir',
                            message: 'Deseja mesmo excluir essa caracterização?',
                            okButton: 'Confirmar',
                        })
                        if (ok) {
                            caracterizaService.delete(row.id_caracterizacao)
                            .then(
                                (response)=>{
                                    location.reload();
                                },
                                (error)=>{
                                    this.message = error;
                                        this.showMessage = true;
                                        this.type = "alert";
                                        this.caption = "Unidade";
                                        setTimeout(() => (this.showMessage = false), 3000);
                                }
                            )
                        }
                    });



                    const buttonHolder = document.createElement("span");
                    buttonHolder.appendChild(btEdit);
                    buttonHolder.appendChild(btDel);

                    return buttonHolder;
                },
            },
        ];

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
        });

        if (element) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            element.bulmaCalendar.on('select', datepicker => {
                this.caracteriza.dt_caracterizacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
            });
        }
    },
    created() {
        this.caracteriza.id_codend = this.$route.params.master;
        this.caracteriza.id_caracteriza = this.$route.params.id;
    },
    watch: {
        mytpimovel(value){

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
        
    }
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
